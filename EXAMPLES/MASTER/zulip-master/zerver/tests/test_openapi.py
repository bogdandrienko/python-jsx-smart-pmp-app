import inspect
import os
import re
import sys
from collections import abc
from typing import (
    Any,
    Callable,
    Dict,
    Iterable,
    List,
    Mapping,
    Optional,
    Sequence,
    Set,
    Tuple,
    Union,
)
from unittest.mock import MagicMock, patch

import yaml
from django.http import HttpResponse
from jsonschema.exceptions import ValidationError

from zerver.lib.request import _REQ, arguments_map
from zerver.lib.rest import rest_dispatch
from zerver.lib.test_classes import ZulipTestCase
from zerver.openapi.markdown_extension import (
    generate_curl_example,
    parse_language_and_options,
    render_curl_example,
)
from zerver.openapi.openapi import (
    OPENAPI_SPEC_PATH,
    OpenAPISpec,
    SchemaError,
    find_openapi_endpoint,
    get_openapi_fixture,
    get_openapi_parameters,
    get_openapi_paths,
    openapi_spec,
    to_python_type,
    validate_against_openapi_schema,
    validate_request,
    validate_schema,
)
from zerver.tornado.views import get_events, get_events_backend

TEST_ENDPOINT = '/messages/{message_id}'
TEST_METHOD = 'patch'
TEST_RESPONSE_BAD_REQ = '400'
TEST_RESPONSE_SUCCESS = '200'

VARMAP = {
    'integer': int,
    'string': str,
    'boolean': bool,
    'object': dict,
    'NoneType': type(None),
}

def schema_type(schema: Dict[str, Any]) -> Union[type, Tuple[type, object]]:
    if 'oneOf' in schema:
        # Hack: Just use the type of the first value
        # Ideally, we'd turn this into a Union type.
        return schema_type(schema['oneOf'][0])
    elif schema["type"] == "array":
        return (list, schema_type(schema["items"]))
    else:
        return VARMAP[schema["type"]]

class OpenAPIToolsTest(ZulipTestCase):
    """Make sure that the tools we use to handle our OpenAPI specification
    (located in zerver/openapi/openapi.py) work as expected.

    These tools are mostly dedicated to fetching parts of the -already parsed-
    specification, and comparing them to objects returned by our REST API.
    """

    def test_get_openapi_fixture(self) -> None:
        actual = get_openapi_fixture(TEST_ENDPOINT, TEST_METHOD,
                                     TEST_RESPONSE_BAD_REQ)
        expected = {
            'code': 'BAD_REQUEST',
            'msg': 'You don\'t have permission to edit this message',
            'result': 'error',
        }
        self.assertEqual(actual, expected)

    def test_get_openapi_parameters(self) -> None:
        actual = get_openapi_parameters(TEST_ENDPOINT, TEST_METHOD)
        expected_item = {
            'name': 'message_id',
            'in': 'path',
            'description':
                'The target message\'s ID.\n',
            'example': 42,
            'required': True,
            'schema': {'type': 'integer'},
        }
        assert(expected_item in actual)

    def test_validate_against_openapi_schema(self) -> None:
        with self.assertRaises(ValidationError,
                               msg=("Additional properties are not" +
                                    " allowed ('foo' was unexpected)")):
            bad_content: Dict[str, object] = {
                'msg': '',
                'result': 'success',
                'foo': 'bar',
            }
            validate_against_openapi_schema(bad_content,
                                            TEST_ENDPOINT,
                                            TEST_METHOD,
                                            TEST_RESPONSE_SUCCESS)

        with self.assertRaises(ValidationError,
                               msg=("42 is not of type string")):
            bad_content = {
                'msg': 42,
                'result': 'success',
            }
            validate_against_openapi_schema(bad_content,
                                            TEST_ENDPOINT,
                                            TEST_METHOD,
                                            TEST_RESPONSE_SUCCESS)

        with self.assertRaises(ValidationError,
                               msg='Expected to find the "msg" required key'):
            bad_content = {
                'result': 'success',
            }
            validate_against_openapi_schema(bad_content,
                                            TEST_ENDPOINT,
                                            TEST_METHOD,
                                            TEST_RESPONSE_SUCCESS)

        # No exceptions should be raised here.
        good_content = {
            'msg': '',
            'result': 'success',
        }
        validate_against_openapi_schema(good_content,
                                        TEST_ENDPOINT,
                                        TEST_METHOD,
                                        TEST_RESPONSE_SUCCESS)

        # Overwrite the exception list with a mocked one
        test_dict: Dict[str, Any] = {}

        # Check that validate_against_openapi_schema correctly
        # descends into 'deep' objects and arrays.  Test 1 should
        # pass, Test 2 has a 'deep' extraneous key and Test 3 has a
        # 'deep' opaque object. Also the parameters are a heterogeneous
        # mix of arrays and objects to verify that our descent logic
        # correctly gets to the the deeply nested objects.
        with open(os.path.join(os.path.dirname(OPENAPI_SPEC_PATH),
                  "testing.yaml")) as test_file:
            test_dict = yaml.safe_load(test_file)
        openapi_spec.openapi()['paths']['testing'] = test_dict
        try:
            validate_against_openapi_schema((test_dict['test1']['responses']['200']['content']
                                            ['application/json']['example']),
                                            'testing', 'test1', '200')
            with self.assertRaises(ValidationError, msg = 'Extraneous key "str4" in response\'s content'):
                validate_against_openapi_schema((test_dict['test2']['responses']['200']
                                                ['content']['application/json']['example']),
                                                'testing', 'test2', '200')
            with self.assertRaises(SchemaError, msg = 'Opaque object "obj"'):
                # Checks for opaque objects
                validate_schema((test_dict['test3']['responses']['200']
                                ['content']['application/json']['schema']))
        finally:
            openapi_spec.openapi()['paths'].pop('testing', None)

    def test_to_python_type(self) -> None:
        TYPES = {
            'string': str,
            'number': float,
            'integer': int,
            'boolean': bool,
            'array': list,
            'object': dict,
        }

        for oa_type, py_type in TYPES.items():
            self.assertEqual(to_python_type(oa_type), py_type)

    def test_live_reload(self) -> None:
        # Force the reload by making the last update date < the file's last
        # modified date
        openapi_spec.mtime = 0
        get_openapi_fixture(TEST_ENDPOINT, TEST_METHOD)

        # Check that the file has been reloaded by verifying that the last
        # update date isn't zero anymore
        self.assertNotEqual(openapi_spec.mtime, 0)

        # Now verify calling it again doesn't call reload
        old_openapi = openapi_spec.openapi()
        get_openapi_fixture(TEST_ENDPOINT, TEST_METHOD)
        new_openapi = openapi_spec.openapi()
        self.assertIs(old_openapi, new_openapi)

class OpenAPIArgumentsTest(ZulipTestCase):
    # This will be filled during test_openapi_arguments:
    checked_endpoints: Set[str] = set()
    pending_endpoints = {
        #### TODO: These endpoints are a priority to document:
        '/realm/presence',
        '/streams/{stream_id}/members',
        '/streams/{stream_id}/delete_topic',
        '/users/me/presence',
        '/users/me/alert_words',
        '/users/me/status',

        #### These realm administration settings are valuable to document:
        # Delete a file uploaded by current user.
        '/attachments/{attachment_id}',
        # List data exports for organization (GET) or request one (POST)
        '/export/realm',
        # Delete a data export.
        '/export/realm/{export_id}',
        # Manage default streams and default stream groups
        '/default_streams',
        '/default_stream_groups/create',
        '/default_stream_groups/{group_id}',
        '/default_stream_groups/{group_id}/streams',
        # Administer invitations
        '/invites',
        '/invites/multiuse',
        '/invites/{prereg_id}',
        '/invites/{prereg_id}/resend',
        '/invites/multiuse/{invite_id}',
        # Single-stream settings alternative to the bulk endpoint
        # users/me/subscriptions/properties; probably should just be a
        # section of the same page.
        '/users/me/subscriptions/{stream_id}',

        # Real-time-events endpoint
        '/real-time',

        # Rest error handling endpoint
        '/rest-error-handling',

        # Zulip outgoing webhook payload
        '/zulip-outgoing-webhook',

        #### Mobile-app only endpoints; important for mobile developers.
        # Mobile interface for fetching API keys
        '/fetch_api_key',
        # Already documented; need to fix tracking bug
        '/dev_fetch_api_key',
        # Mobile interface for development environment login
        '/dev_list_users',
        # Registration for iOS/Android mobile push notifications.
        '/users/me/android_gcm_reg_id',
        '/users/me/apns_device_token',

        #### These personal settings endpoints have modest value to document:
        '/settings',
        '/users/me/avatar',
        '/users/me/api_key/regenerate',
        # Not very useful outside the UI
        '/settings/display',
        # Much more valuable would be an org admin bulk-upload feature.
        '/users/me/profile_data',

        #### Should be documented as part of interactive bots documentation
        '/bot_storage',
        '/submessage',
        '/zcommand',

        #### These "organization settings" endpoint have modest value to document:
        '/realm',
        '/realm/domains',
        '/realm/domains/{domain}',
        '/bots',
        '/bots/{bot_id}',
        '/bots/{bot_id}/api_key/regenerate',
        #### These "organization settings" endpoints have low value to document:
        '/realm/profile_fields/{field_id}',
        '/realm/icon',
        '/realm/logo',
        '/realm/deactivate',
        '/realm/subdomain/{subdomain}',

        #### Other low value endpoints
        # Used for dead desktop app to test connectivity.  To delete.
        '/generate_204',
        # Used for failed approach with dead Android app.
        '/fetch_google_client_id',
        # API for video calls we're planning to remove/replace.
        '/calls/zoom/create',
    }

    # Endpoints where the documentation is currently failing our
    # consistency tests.  We aim to keep this list empty.
    buggy_documentation_endpoints: Set[str] = set([
    ])

    def convert_regex_to_url_pattern(self, regex_pattern: str) -> str:
        """ Convert regular expressions style URL patterns to their
            corresponding OpenAPI style formats. All patterns are
            expected to start with ^ and end with $.
            Examples:
                1. /messages/{message_id} <-> r'^messages/(?P<message_id>[0-9]+)$'
                2. /events <-> r'^events$'
                3. '/realm/domains' <-> r'/realm\\/domains$'
        """

        # Handle the presence-email code which has a non-slashes syntax.
        regex_pattern = regex_pattern.replace('[^/]*', '.*').replace('[^/]+', '.*')

        self.assertTrue(regex_pattern.startswith("^"))
        self.assertTrue(regex_pattern.endswith("$"))
        url_pattern = '/' + regex_pattern[1:][:-1]
        url_pattern = re.sub(r"\(\?P<(\w+)>[^/]+\)", r"{\1}", url_pattern)
        url_pattern = url_pattern.replace('\\', '')
        return url_pattern

    def ensure_no_documentation_if_intentionally_undocumented(self, url_pattern: str,
                                                              method: str,
                                                              msg: Optional[str]=None) -> None:
        try:
            get_openapi_parameters(url_pattern, method)
            if not msg:  # nocoverage
                msg = f"""
We found some OpenAPI documentation for {method} {url_pattern},
so maybe we shouldn't mark it as intentionally undocumented in the URLs.
"""
            raise AssertionError(msg)  # nocoverage
        except KeyError:
            return

    def check_for_non_existant_openapi_endpoints(self) -> None:
        """ Here, we check to see if every endpoint documented in the OpenAPI
        documentation actually exists in urls.py and thus in actual code.
        Note: We define this as a helper called at the end of
        test_openapi_arguments instead of as a separate test to ensure that
        this test is only executed after test_openapi_arguments so that it's
        results can be used here in the set operations. """
        openapi_paths = set(get_openapi_paths())
        undocumented_paths = openapi_paths - self.checked_endpoints
        undocumented_paths -= self.buggy_documentation_endpoints
        undocumented_paths -= self.pending_endpoints
        try:
            self.assertEqual(len(undocumented_paths), 0)
        except AssertionError:  # nocoverage
            msg = "The following endpoints have been documented but can't be found in urls.py:"
            for undocumented_path in undocumented_paths:
                msg += f"\n + {undocumented_path}"
            raise AssertionError(msg)

    def get_type_by_priority(self, types: Sequence[Union[type, Tuple[type, object]]]) -> Union[type, Tuple[type, object]]:
        priority = {list: 1, dict: 2, str: 3, int: 4, bool: 5}
        tyiroirp = {1: list, 2: dict, 3: str, 4: int, 5: bool}
        val = 6
        for t in types:
            if isinstance(t, tuple):
                return t  # e.g. (list, dict) or (list ,str)
            v = priority.get(t, 6)
            if v < val:
                val = v
        return tyiroirp.get(val, types[0])

    def get_standardized_argument_type(self, t: Any) -> Union[type, Tuple[type, object]]:
        """ Given a type from the typing module such as List[str] or Union[str, int],
        convert it into a corresponding Python type. Unions are mapped to a canonical
        choice among the options.
        E.g. typing.Union[typing.List[typing.Dict[str, typing.Any]], NoneType]
        needs to be mapped to list."""

        origin = getattr(t, "__origin__", None)
        if sys.version_info < (3, 7):  # nocoverage
            if origin == List:
                origin = list
            elif origin == Dict:
                origin = dict
            elif origin == Iterable:
                origin = abc.Iterable
            elif origin == Mapping:
                origin = abc.Mapping
            elif origin == Sequence:
                origin = abc.Sequence

        if not origin:
            # Then it's most likely one of the fundamental data types
            # I.E. Not one of the data types from the "typing" module.
            return t
        elif origin == Union:
            subtypes = [self.get_standardized_argument_type(st) for st in t.__args__]
            return self.get_type_by_priority(subtypes)
        elif origin in [list, abc.Iterable, abc.Sequence]:
            [st] = t.__args__
            return (list, self.get_standardized_argument_type(st))
        elif origin in [dict, abc.Mapping]:
            return dict
        raise AssertionError(f"Unknown origin {origin}")

    def render_openapi_type_exception(self, function:  Callable[..., HttpResponse],
                                      openapi_params: Set[Tuple[str, Union[type, Tuple[type, object]]]],
                                      function_params: Set[Tuple[str, Union[type, Tuple[type, object]]]],
                                      diff: Set[Tuple[str, Union[type, Tuple[type, object]]]]) -> None:  # nocoverage
        """ Print a *VERY* clear and verbose error message for when the types
        (between the OpenAPI documentation and the function declaration) don't match. """

        msg = f"""
The types for the request parameters in zerver/openapi/zulip.yaml
do not match the types declared in the implementation of {function.__name__}.\n"""
        msg += '='*65 + '\n'
        msg += "{:<10s}{:^30s}{:>10s}\n".format("Parameter", "OpenAPI Type",
                                                "Function Declaration Type")
        msg += '='*65 + '\n'
        opvtype = None
        fdvtype = None
        for element in diff:
            vname = element[0]
            for element in openapi_params:
                if element[0] == vname:
                    opvtype = element[1]
                    break
            for element in function_params:
                if element[0] == vname:
                    fdvtype = element[1]
                    break
        msg += f"{vname:<10s}{str(opvtype):^30s}{str(fdvtype):>10s}\n"
        raise AssertionError(msg)

    def check_argument_types(self, function: Callable[..., HttpResponse],
                             openapi_parameters: List[Dict[str, Any]]) -> None:
        """ We construct for both the OpenAPI data and the function's definition a set of
        tuples of the form (var_name, type) and then compare those sets to see if the
        OpenAPI data defines a different type than that actually accepted by the function.
        Otherwise, we print out the exact differences for convenient debugging and raise an
        AssertionError. """
        openapi_params: Set[Tuple[str, Union[type, Tuple[type, object]]]] = set()
        json_params: Dict[str, Union[type, Tuple[type, object]]] = {}
        for element in openapi_parameters:
            name: str = element["name"]
            schema = {}
            if "content" in element:
                # The only content-type we use in our API is application/json.
                assert "schema" in element["content"]["application/json"]
                # If content_type is application/json, then the
                # parameter needs to be handled specially, as REQ can
                # either return the application/json as a string or it
                # can either decode it and return the required
                # elements. For example `to` array in /messages: POST
                # is processed by REQ as a string and then its type is
                # checked in the view code.
                #
                # Meanwhile `profile_data` in /users/{user_id}: GET is
                # taken as array of objects. So treat them separately.
                schema = element["content"]["application/json"]["schema"]
                json_params[name] = schema_type(schema)
                continue
            else:
                schema = element["schema"]
            openapi_params.add((name, schema_type(schema)))

        function_params: Set[Tuple[str, Union[type, Tuple[type, object]]]] = set()

        # Iterate through the decorators to find the original
        # function, wrapped by has_request_variables, so we can parse
        # its arguments.
        while getattr(function, "__wrapped__", None):
            function = getattr(function, "__wrapped__", None)
            # Tell mypy this is never None.
            assert function is not None

        # Now, we do inference mapping each REQ parameter's
        # declaration details to the Python/mypy types for the
        # arguments passed to it.
        #
        # Because the mypy types are the types used inside the inner
        # function (after the original data is processed by any
        # validators, converters, etc.), they will not always match
        # the API-level argument types.  The main case where this
        # happens is when a `converter` is used that changes the types
        # of its parameters.
        for pname, defval in inspect.signature(function).parameters.items():
            defval = defval.default
            if isinstance(defval, _REQ):
                # TODO: The below inference logic in cases where
                # there's a converter function declared is incorrect.
                # Theoretically, we could restructure the converter
                # function model so that we can check what type it
                # excepts to be passed to make validation here
                # possible.

                vtype = self.get_standardized_argument_type(function.__annotations__[pname])
                vname = defval.post_var_name
                assert vname is not None
                if vname in json_params:
                    # Here we have two cases.  If the the REQ type is
                    # string then there is no point in comparing as
                    # JSON can always be returned as string.  Ideally,
                    # we wouldn't use REQ for a JSON object without a
                    # validator in these cases, but it does happen.
                    #
                    # If the REQ type is not string then, insert the
                    # REQ and OpenAPI data types of the variable in
                    # the respective sets so that they can be dealt
                    # with later.  In either case remove the variable
                    # from `json_params`.
                    if vtype == str:
                        json_params.pop(vname, None)
                        continue
                    else:
                        openapi_params.add((vname, json_params[vname]))
                        json_params.pop(vname, None)
                function_params.add((vname, vtype))

        # After the above operations `json_params` should be empty.
        assert(len(json_params) == 0)
        diff = openapi_params - function_params
        if diff:  # nocoverage
            self.render_openapi_type_exception(function, openapi_params, function_params, diff)

    def test_openapi_arguments(self) -> None:
        """This end-to-end API documentation test compares the arguments
        defined in the actual code using @has_request_variables and
        REQ(), with the arguments declared in our API documentation
        for every API endpoint in Zulip.

        First, we import the fancy-Django version of zproject/urls.py
        by doing this, each has_request_variables wrapper around each
        imported view function gets called to generate the wrapped
        view function and thus filling the global arguments_map variable.
        Basically, we're exploiting code execution during import.

            Then we need to import some view modules not already imported in
        urls.py. We use this different syntax because of the linters complaining
        of an unused import (which is correct, but we do this for triggering the
        has_request_variables decorator).

            At the end, we perform a reverse mapping test that verifies that
        every URL pattern defined in the OpenAPI documentation actually exists
        in code.
        """

        from zproject import urls as urlconf

        # We loop through all the API patterns, looking in particular
        # for those using the rest_dispatch decorator; we then parse
        # its mapping of (HTTP_METHOD -> FUNCTION).
        for p in urlconf.v1_api_and_json_patterns + urlconf.v1_api_mobile_patterns:
            if p.callback is not rest_dispatch:
                # Endpoints not using rest_dispatch don't have extra data.
                methods_endpoints = dict(
                    GET=p.callback,
                )
            else:
                methods_endpoints = p.default_args

            # since the module was already imported and is now residing in
            # memory, we won't actually face any performance penalties here.
            for method, value in methods_endpoints.items():
                if callable(value):
                    function: Callable[..., HttpResponse] = value
                    tags: Set[str] = set()
                else:
                    function, tags = value

                if function is get_events:
                    # Work around the fact that the registered
                    # get_events view function isn't where we do
                    # @has_request_variables.
                    #
                    # TODO: Make this configurable via an optional argument
                    # to has_request_variables, e.g.
                    # @has_request_variables(view_func_name="zerver.tornado.views.get_events")
                    function = get_events_backend

                function_name = f"{function.__module__}.{function.__name__}"

                # Our accounting logic in the `has_request_variables()`
                # code means we have the list of all arguments
                # accepted by every view function in arguments_map.
                accepted_arguments = set(arguments_map[function_name])

                regex_pattern = p.pattern.regex.pattern
                url_pattern = self.convert_regex_to_url_pattern(regex_pattern)

                if "intentionally_undocumented" in tags:
                    self.ensure_no_documentation_if_intentionally_undocumented(url_pattern, method)
                    continue

                if url_pattern in self.pending_endpoints:
                    # HACK: After all pending_endpoints have been resolved, we should remove
                    # this segment and the "msg" part of the `ensure_no_...` method.
                    msg = f"""
We found some OpenAPI documentation for {method} {url_pattern},
so maybe we shouldn't include it in pending_endpoints.
"""
                    self.ensure_no_documentation_if_intentionally_undocumented(url_pattern,
                                                                               method, msg)
                    continue

                try:
                    # Don't include OpenAPI parameters that live in
                    # the path; these are not extracted by REQ.
                    openapi_parameters = get_openapi_parameters(url_pattern, method,
                                                                include_url_parameters=False)
                except Exception:  # nocoverage
                    raise AssertionError(f"Could not find OpenAPI docs for {method} {url_pattern}")

                # We now have everything we need to understand the
                # function as defined in our urls.py:
                #
                # * method is the HTTP method, e.g. GET, POST, or PATCH
                #
                # * p.pattern.regex.pattern is the URL pattern; might require
                #   some processing to match with OpenAPI rules
                #
                # * accepted_arguments is the full set of arguments
                #   this method accepts (from the REQ declarations in
                #   code).
                #
                # * The documented parameters for the endpoint as recorded in our
                #   OpenAPI data in zerver/openapi/zulip.yaml.
                #
                # We now compare these to confirm that the documented
                # argument list matches what actually appears in the
                # codebase.

                openapi_parameter_names = {
                    parameter['name'] for parameter in openapi_parameters
                }

                if len(accepted_arguments - openapi_parameter_names) > 0:  # nocoverage
                    print("Undocumented parameters for",
                          url_pattern, method, function_name)
                    print(" +", openapi_parameter_names)
                    print(" -", accepted_arguments)
                    assert(url_pattern in self.buggy_documentation_endpoints)
                elif len(openapi_parameter_names - accepted_arguments) > 0:  # nocoverage
                    print("Documented invalid parameters for",
                          url_pattern, method, function_name)
                    print(" -", openapi_parameter_names)
                    print(" +", accepted_arguments)
                    assert(url_pattern in self.buggy_documentation_endpoints)
                else:
                    self.assertEqual(openapi_parameter_names, accepted_arguments)
                    self.check_argument_types(function, openapi_parameters)
                    self.checked_endpoints.add(url_pattern)

        self.check_for_non_existant_openapi_endpoints()


class ModifyExampleGenerationTestCase(ZulipTestCase):

    def test_no_mod_argument(self) -> None:
        res = parse_language_and_options("python")
        self.assertEqual(res, ("python", {}))

    def test_single_simple_mod_argument(self) -> None:
        res = parse_language_and_options("curl, mod=1")
        self.assertEqual(res, ("curl", {"mod": 1}))

        res = parse_language_and_options("curl, mod='somevalue'")
        self.assertEqual(res, ("curl", {"mod": "somevalue"}))

        res = parse_language_and_options("curl, mod=\"somevalue\"")
        self.assertEqual(res, ("curl", {"mod": "somevalue"}))

    def test_multiple_simple_mod_argument(self) -> None:
        res = parse_language_and_options("curl, mod1=1, mod2='a'")
        self.assertEqual(res, ("curl", {"mod1": 1, "mod2": "a"}))

        res = parse_language_and_options("curl, mod1=\"asdf\", mod2='thing', mod3=3")
        self.assertEqual(res, ("curl", {"mod1": "asdf", "mod2": "thing", "mod3": 3}))

    def test_single_list_mod_argument(self) -> None:
        res = parse_language_and_options("curl, exclude=['param1', 'param2']")
        self.assertEqual(res, ("curl", {"exclude": ["param1", "param2"]}))

        res = parse_language_and_options("curl, exclude=[\"param1\", \"param2\"]")
        self.assertEqual(res, ("curl", {"exclude": ["param1", "param2"]}))

        res = parse_language_and_options("curl, exclude=['param1', \"param2\"]")
        self.assertEqual(res, ("curl", {"exclude": ["param1", "param2"]}))

    def test_multiple_list_mod_argument(self) -> None:
        res = parse_language_and_options("curl, exclude=['param1', \"param2\"], special=['param3']")
        self.assertEqual(res, ("curl", {"exclude": ["param1", "param2"], "special": ["param3"]}))

    def test_multiple_mixed_mod_arguments(self) -> None:
        res = parse_language_and_options("curl, exclude=[\"asdf\", 'sdfg'], other_key='asdf', more_things=\"asdf\", another_list=[1, \"2\"]")
        self.assertEqual(res, ("curl", {"exclude": ["asdf", "sdfg"], "other_key": "asdf", "more_things": "asdf", "another_list": [1, "2"]}))


class TestCurlExampleGeneration(ZulipTestCase):

    spec_mock_without_examples = {
        "security": [{"basicAuth": []}],
        "paths": {
            "/mark_stream_as_read": {
                "post": {
                    "description": "Mark all the unread messages in a stream as read.",
                    "parameters": [
                        {
                            "name": "stream_id",
                            "in": "query",
                            "description": "The ID of the stream whose messages should be marked as read.",
                            "schema": {
                                "type": "integer",
                            },
                            "required": True,
                        },
                        {
                            "name": "bool_param",
                            "in": "query",
                            "description": "Just a boolean parameter.",
                            "schema": {
                                "type": "boolean",
                            },
                            "required": True,
                        },
                    ],
                },
            },
        },
    }

    spec_mock_with_invalid_method: Dict[str, object] = {
        "security": [{"basicAuth": []}],
        "paths": {
            "/endpoint": {
                "brew": {},  # the data is irrelevant as is should be rejected.
            },
        },
    }

    spec_mock_using_object = {
        "security": [{"basicAuth": []}],
        "paths": {
            "/endpoint": {
                "get": {
                    "description": "Get some info.",
                    "parameters": [
                        {
                            "name": "param1",
                            "in": "query",
                            "description": "An object",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object"
                                    },
                                    "example": {
                                        "key": "value",
                                    }
                                }
                            },
                            "required": True,
                        },
                    ],
                },
            },
        },
    }

    spec_mock_using_param_in_path = {
        "security": [{"basicAuth": []}],
        "paths": {
            "/endpoint/{param1}": {
                "get": {
                    "description": "Get some info.",
                    "parameters": [
                        {
                            "name": "param1",
                            "in": "path",
                            "description": "Param in path",
                            "schema": {
                                "type": "integer",
                            },
                            "example": 35,
                            "required": True,
                        },
                        {
                            "name": "param2",
                            "in": "query",
                            "description": "An object",
                            "required": True,
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object"
                                    },
                                    "example": {
                                        "key": "value",
                                    }
                                }
                            },
                        },
                    ],
                },
            },
        },
    }

    spec_mock_using_object_without_example = {
        "security": [{"basicAuth": []}],
        "paths": {
            "/endpoint": {
                "get": {
                    "description": "Get some info.",
                    "parameters": [
                        {
                            "name": "param1",
                            "in": "query",
                            "description": "An object",
                            "schema": {
                                "type": "object",
                            },
                            "required": True,
                        },
                    ],
                },
            },
        },
    }

    spec_mock_using_array_without_example = {
        "security": [{"basicAuth": []}],
        "paths": {
            "/endpoint": {
                "get": {
                    "description": "Get some info.",
                    "parameters": [
                        {
                            "name": "param1",
                            "in": "query",
                            "description": "An array",
                            "schema": {
                                "type": "array",
                            },
                            "required": True,
                        },
                    ],
                },
            },
        },
    }

    def curl_example(self, endpoint: str, method: str, *args: Any, **kwargs: Any) -> List[str]:
        return generate_curl_example(endpoint, method,
                                     "http://localhost:9991/api", *args, **kwargs)

    def test_generate_and_render_curl_example(self) -> None:
        generated_curl_example = self.curl_example("/get_stream_id", "GET")
        expected_curl_example = [
            "```curl",
            "curl -sSX GET -G http://localhost:9991/api/v1/get_stream_id \\",
            "    -u BOT_EMAIL_ADDRESS:BOT_API_KEY \\",
            "    --data-urlencode stream=Denmark",
            "```",
        ]
        self.assertEqual(generated_curl_example, expected_curl_example)

    def test_generate_and_render_curl_example_with_nonexistant_endpoints(self) -> None:
        with self.assertRaises(KeyError):
            self.curl_example("/mark_this_stream_as_read", "POST")
        with self.assertRaises(KeyError):
            self.curl_example("/mark_stream_as_read", "GET")

    def test_generate_and_render_curl_without_auth(self) -> None:
        generated_curl_example = self.curl_example("/dev_fetch_api_key", "POST")
        expected_curl_example = [
            "```curl",
            "curl -sSX POST http://localhost:9991/api/v1/dev_fetch_api_key \\",
            "    --data-urlencode username=iago@zulip.com",
            "```",
        ]
        self.assertEqual(generated_curl_example, expected_curl_example)

    @patch("zerver.openapi.openapi.OpenAPISpec.openapi")
    def test_generate_and_render_curl_with_default_examples(self, spec_mock: MagicMock) -> None:
        spec_mock.return_value = self.spec_mock_without_examples
        generated_curl_example = self.curl_example("/mark_stream_as_read", "POST")
        expected_curl_example = [
            "```curl",
            "curl -sSX POST http://localhost:9991/api/v1/mark_stream_as_read \\",
            "    -u BOT_EMAIL_ADDRESS:BOT_API_KEY \\",
            "    --data-urlencode stream_id=1 \\",
            "    --data-urlencode bool_param=false",
            "```",
        ]
        self.assertEqual(generated_curl_example, expected_curl_example)

    @patch("zerver.openapi.openapi.OpenAPISpec.openapi")
    def test_generate_and_render_curl_with_invalid_method(self, spec_mock: MagicMock) -> None:
        spec_mock.return_value = self.spec_mock_with_invalid_method
        with self.assertRaises(ValueError):
            self.curl_example("/endpoint", "BREW")  # see: HTCPCP

    def test_generate_and_render_curl_with_array_example(self) -> None:
        generated_curl_example = self.curl_example("/messages", "GET")
        expected_curl_example = [
            '```curl',
            'curl -sSX GET -G http://localhost:9991/api/v1/messages \\',
            '    -u BOT_EMAIL_ADDRESS:BOT_API_KEY \\',
            "    --data-urlencode anchor=42 \\",
            "    --data-urlencode num_before=4 \\",
            "    --data-urlencode num_after=8 \\",
            '    --data-urlencode \'narrow=[{"operand": "Denmark", "operator": "stream"}]\' \\',
            "    --data-urlencode client_gravatar=true \\",
            "    --data-urlencode apply_markdown=false \\",
            "    --data-urlencode use_first_unread_anchor=true",
            '```',
        ]
        self.assertEqual(generated_curl_example, expected_curl_example)

    @patch("zerver.openapi.openapi.OpenAPISpec.openapi")
    def test_generate_and_render_curl_with_object(self, spec_mock: MagicMock) -> None:
        spec_mock.return_value = self.spec_mock_using_object
        generated_curl_example = self.curl_example("/endpoint", "GET")
        expected_curl_example = [
            '```curl',
            'curl -sSX GET -G http://localhost:9991/api/v1/endpoint \\',
            '    -u BOT_EMAIL_ADDRESS:BOT_API_KEY \\',
            '    --data-urlencode \'param1={"key": "value"}\'',
            '```',
        ]
        self.assertEqual(generated_curl_example, expected_curl_example)

    @patch("zerver.openapi.openapi.OpenAPISpec.openapi")
    def test_generate_and_render_curl_with_object_without_example(self, spec_mock: MagicMock) -> None:
        spec_mock.return_value = self.spec_mock_using_object_without_example
        with self.assertRaises(ValueError):
            self.curl_example("/endpoint", "GET")

    @patch("zerver.openapi.openapi.OpenAPISpec.openapi")
    def test_generate_and_render_curl_with_array_without_example(self, spec_mock: MagicMock) -> None:
        spec_mock.return_value = self.spec_mock_using_array_without_example
        with self.assertRaises(ValueError):
            self.curl_example("/endpoint", "GET")

    @patch("zerver.openapi.openapi.OpenAPISpec.openapi")
    def test_generate_and_render_curl_with_param_in_path(self, spec_mock: MagicMock) -> None:
        spec_mock.return_value = self.spec_mock_using_param_in_path
        generated_curl_example = self.curl_example("/endpoint/{param1}", "GET")
        expected_curl_example = [
            '```curl',
            'curl -sSX GET -G http://localhost:9991/api/v1/endpoint/35 \\',
            '    -u BOT_EMAIL_ADDRESS:BOT_API_KEY \\',
            '    --data-urlencode \'param2={"key": "value"}\'',
            '```',
        ]
        self.assertEqual(generated_curl_example, expected_curl_example)

    def test_generate_and_render_curl_wrapper(self) -> None:
        generated_curl_example = render_curl_example("/get_stream_id:GET:email:key",
                                                     api_url="https://zulip.example.com/api")
        expected_curl_example = [
            "```curl",
            "curl -sSX GET -G https://zulip.example.com/api/v1/get_stream_id \\",
            "    -u email:key \\",
            "    --data-urlencode stream=Denmark",
            "```",
        ]
        self.assertEqual(generated_curl_example, expected_curl_example)

    def test_generate_and_render_curl_example_with_excludes(self) -> None:
        generated_curl_example = self.curl_example("/messages", "GET",
                                                   exclude=["client_gravatar", "apply_markdown"])
        expected_curl_example = [
            '```curl',
            'curl -sSX GET -G http://localhost:9991/api/v1/messages \\',
            '    -u BOT_EMAIL_ADDRESS:BOT_API_KEY \\',
            "    --data-urlencode anchor=42 \\",
            "    --data-urlencode num_before=4 \\",
            "    --data-urlencode num_after=8 \\",
            '    --data-urlencode \'narrow=[{"operand": "Denmark", "operator": "stream"}]\' \\',
            "    --data-urlencode use_first_unread_anchor=true",
            '```',
        ]
        self.assertEqual(generated_curl_example, expected_curl_example)

class OpenAPIAttributesTest(ZulipTestCase):
    def test_attributes(self) -> None:
        """
        Checks:
        * All endpoints have `operationId` and `tag` attributes.
        * All example responses match their schema.
        * That no opaque object exists.
        """
        EXCLUDE = ["/real-time", "/register", "/events"]
        VALID_TAGS = ["users", "server_and_organizations", "authentication",
                      "real_time_events", "streams", "messages", "users",
                      "webhooks"]
        paths = OpenAPISpec(OPENAPI_SPEC_PATH).openapi()["paths"]
        for path, path_item in paths.items():
            if path in EXCLUDE:
                continue
            for method, operation in path_item.items():
                # Check if every file has an operationId
                assert("operationId" in operation)
                assert("tags" in operation)
                tag = operation["tags"][0]
                assert(tag in VALID_TAGS)
                for status_code, response in operation['responses'].items():
                    schema = response['content']['application/json']['schema']
                    if 'oneOf' in schema:
                        for subschema_index, subschema in enumerate(schema['oneOf']):
                            validate_schema(subschema)
                            assert(validate_against_openapi_schema(subschema['example'], path,
                                                                   method, status_code + '_' + str(subschema_index)))
                        continue
                    validate_schema(schema)
                    assert(validate_against_openapi_schema(schema['example'], path,
                                                           method, status_code))

class OpenAPIRegexTest(ZulipTestCase):
    def test_regex(self) -> None:
        """
        Calls a few documented  and undocumented endpoints and checks whether they
        find a match or not.
        """
        # Some of the undocumentd endpoints which are very similar to
        # some of the documented endpoints.
        assert(find_openapi_endpoint('/users/me/presence') is None)
        assert(find_openapi_endpoint('/users/me/subscriptions/23') is None)
        assert(find_openapi_endpoint('/users/iago/subscriptions/23') is None)
        assert(find_openapi_endpoint('/messages/matches_narrow') is None)
        # Making sure documented endpoints are matched correctly.
        assert(find_openapi_endpoint('/users/23/subscriptions/21') ==
               '/users/{user_id}/subscriptions/{stream_id}')
        assert(find_openapi_endpoint('/users/iago@zulip.com/presence') ==
               '/users/{email}/presence')
        assert(find_openapi_endpoint('/messages/23') ==
               '/messages/{message_id}')
        assert(find_openapi_endpoint('/realm/emoji/realm_emoji_1') ==
               '/realm/emoji/{emoji_name}')

class OpenAPIRequestValidatorTest(ZulipTestCase):
    def test_validator(self) -> None:
        """
        Test to make sure the request validator works properly
        The tests cover both cases such as catching valid requests marked
        as invalid and making sure invalid requests are markded properly
        """
        # `/users/me/subscriptions` doesn't require any parameters
        validate_request('/users/me/subscriptions', 'get', {}, {}, False,
                         '200')
        with self.assertRaises(SchemaError):
            # `/messages` POST does not work on an empty response
            validate_request('/messages', 'post', {}, {},
                             False, '200')
        # 400 responses are allowed to fail validation.
        validate_request('/messages', 'post', {}, {},
                         False, '400')
        # `intentionally_undocumented` allows validation errors on
        # 200 responses.
        validate_request('/dev_fetch_api_key', 'post', {}, {},
                         False, '200', intentionally_undocumented=True)
