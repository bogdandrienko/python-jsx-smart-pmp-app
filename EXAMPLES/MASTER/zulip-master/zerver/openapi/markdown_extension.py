# Zulip's OpenAPI-based API documentation system is documented at
#   https://zulip.readthedocs.io/en/latest/documentation/api.html
#
# This file defines the special Markdown extension that is used to
# render the code examples, example responses, etc. that appear in
# Zulip's public API documentation.

import inspect
import json
import re
import shlex
from textwrap import dedent
from typing import Any, Dict, List, Mapping, Optional, Pattern, Tuple

import markdown
from django.conf import settings
from markdown.extensions import Extension
from markdown.preprocessors import Preprocessor

import zerver.openapi.python_examples
from zerver.openapi.openapi import get_openapi_description, get_openapi_fixture, openapi_spec

MACRO_REGEXP = re.compile(
    r'\{generate_code_example(\(\s*(.+?)\s*\))*\|\s*(.+?)\s*\|\s*(.+?)\s*(\(\s*(.+)\s*\))?\}')
PYTHON_EXAMPLE_REGEX = re.compile(r'\# \{code_example\|\s*(.+?)\s*\}')
JS_EXAMPLE_REGEX = re.compile(r'\/\/ \{code_example\|\s*(.+?)\s*\}')
MACRO_REGEXP_DESC = re.compile(r'\{generate_api_description(\(\s*(.+?)\s*\))}')

PYTHON_CLIENT_CONFIG = """
#!/usr/bin/env python3

import zulip

# Pass the path to your zuliprc file here.
client = zulip.Client(config_file="~/zuliprc")

"""

PYTHON_CLIENT_ADMIN_CONFIG = """
#!/usr/bin/env python

import zulip

# The user for this zuliprc file must be an organization administrator
client = zulip.Client(config_file="~/zuliprc-admin")

"""

JS_CLIENT_CONFIG = """
const zulipInit = require("zulip-js");

// Pass the path to your zuliprc file here.
const config = { zuliprc: "zuliprc" };

"""

JS_CLIENT_ADMIN_CONFIG = """
const zulipInit = require("zulip-js");

// The user for this zuliprc file must be an organization administrator.
const config = { zuliprc: "zuliprc-admin" };

"""

DEFAULT_AUTH_EMAIL = "BOT_EMAIL_ADDRESS"
DEFAULT_AUTH_API_KEY = "BOT_API_KEY"
DEFAULT_EXAMPLE = {
    "integer": 1,
    "string": "demo",
    "boolean": False,
}

def parse_language_and_options(input_str: Optional[str]) -> Tuple[str, Dict[str, Any]]:
    if not input_str:
        return ("", {})
    language_and_options = re.match(r"(?P<language>\w+)(,\s*(?P<options>[\"\'\w\d\[\],= ]+))?", input_str)
    assert(language_and_options is not None)
    kwargs_pattern = re.compile(r"(?P<key>\w+)\s*=\s*(?P<value>[\'\"\w\d]+|\[[\'\",\w\d ]+\])")
    language = language_and_options.group("language")
    assert(language is not None)
    if language_and_options.group("options"):
        _options = kwargs_pattern.finditer(language_and_options.group("options"))
        options = {}
        for m in _options:
            options[m.group("key")] = json.loads(m.group("value").replace("'", '"'))
        return (language, options)
    return (language, {})

def extract_code_example(source: List[str], snippet: List[Any],
                         example_regex: Pattern[str]) -> List[Any]:
    start = -1
    end = -1
    for line in source:
        match = example_regex.search(line)
        if match:
            if match.group(1) == 'start':
                start = source.index(line)
            elif match.group(1) == 'end':
                end = source.index(line)
                break

    if (start == -1 and end == -1):
        return snippet

    snippet.append(source[start + 1: end])
    source = source[end + 1:]
    return extract_code_example(source, snippet, example_regex)

def render_python_code_example(function: str, admin_config: bool=False,
                               **kwargs: Any) -> List[str]:
    method = zerver.openapi.python_examples.TEST_FUNCTIONS[function]
    function_source_lines = inspect.getsourcelines(method)[0]

    if admin_config:
        config = PYTHON_CLIENT_ADMIN_CONFIG.splitlines()
    else:
        config = PYTHON_CLIENT_CONFIG.splitlines()

    snippets = extract_code_example(function_source_lines, [], PYTHON_EXAMPLE_REGEX)

    code_example = []
    code_example.append('```python')
    code_example.extend(config)

    for snippet in snippets:
        for line in snippet:
            # Remove one level of indentation and strip newlines
            code_example.append(line[4:].rstrip())

    code_example.append('print(result)')
    code_example.append('\n')
    code_example.append('```')

    return code_example

def render_javascript_code_example(function: str, admin_config: bool=False,
                                   **kwargs: Any) -> List[str]:
    pattern = fr'^add_example\(\s*"[^"]*",\s*{re.escape(json.dumps(function))},\s*\d+,\s*async \(client, console\) => \{{\n(.*?)^(?:\}}| *\}},\n)\);$'
    with open('zerver/openapi/javascript_examples.js') as f:
        m = re.search(pattern, f.read(), re.M | re.S)
    assert m is not None
    function_source_lines = dedent(m.group(1)).splitlines()

    snippets = extract_code_example(function_source_lines, [], JS_EXAMPLE_REGEX)

    if admin_config:
        config = JS_CLIENT_ADMIN_CONFIG.splitlines()
    else:
        config = JS_CLIENT_CONFIG.splitlines()

    code_example = []
    code_example.append('```js')
    code_example.extend(config)
    code_example.append("(async () => {")
    code_example.append("    const client = await zulipInit(config);")
    for snippet in snippets:
        code_example.append("")
        for line in snippet:
            # Strip newlines
            code_example.append("    " + line.rstrip())
    code_example.append("})();")

    code_example.append('```')

    return code_example

def curl_method_arguments(endpoint: str, method: str,
                          api_url: str) -> List[str]:
    # We also include the -sS verbosity arguments here.
    method = method.upper()
    url = f"{api_url}/v1{endpoint}"
    valid_methods = ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"]
    if method == "GET":
        # Then we need to make sure that each -d option translates to becoming
        # a GET parameter (in the URL) and not a POST parameter (in the body).
        # TODO: remove the -X part by updating the linting rule. It's redundant.
        return ["-sSX", "GET", "-G", url]
    elif method in valid_methods:
        return ["-sSX", method, url]
    else:
        msg = f"The request method {method} is not one of {valid_methods}"
        raise ValueError(msg)

def get_openapi_param_example_value_as_string(endpoint: str, method: str, param: Dict[str, Any],
                                              curl_argument: bool=False) -> str:
    jsonify = False
    param_name = param["name"]
    if "content" in param:
        param = param["content"]["application/json"]
        jsonify = True
    if "type" in param["schema"]:
        param_type = param["schema"]["type"]
    else:
        # Hack: Ideally, we'd extract a common function for handling
        # oneOf values in types and do something with the resulting
        # union type.  But for this logic's purpose, it's good enough
        # to just check the first parameter.
        param_type = param["schema"]["oneOf"][0]["type"]
    if param_type in ["object", "array"]:
        example_value = param.get("example", None)
        if not example_value:
            msg = f"""All array and object type request parameters must have
concrete examples. The openAPI documentation for {endpoint}/{method} is missing an example
value for the {param_name} parameter. Without this we cannot automatically generate a
cURL example."""
            raise ValueError(msg)
        ordered_ex_val_str = json.dumps(example_value, sort_keys=True)
        # We currently don't have any non-JSON encoded arrays.
        assert(jsonify)
        if curl_argument:
            return "    --data-urlencode " + shlex.quote(f"{param_name}={ordered_ex_val_str}")
        return ordered_ex_val_str  # nocoverage
    else:
        example_value = param.get("example", DEFAULT_EXAMPLE[param_type])
        if isinstance(example_value, bool):
            example_value = str(example_value).lower()
        if jsonify:
            example_value = json.dumps(example_value)
        if curl_argument:
            return "    --data-urlencode " + shlex.quote(f"{param_name}={example_value}")
        return example_value

def generate_curl_example(endpoint: str, method: str,
                          api_url: str,
                          auth_email: str=DEFAULT_AUTH_EMAIL,
                          auth_api_key: str=DEFAULT_AUTH_API_KEY,
                          exclude: Optional[List[str]]=None,
                          include: Optional[List[str]]=None) -> List[str]:
    if exclude is not None and include is not None:
        raise AssertionError("exclude and include cannot be set at the same time.")

    lines = ["```curl"]
    operation = endpoint + ":" + method.lower()
    operation_entry = openapi_spec.openapi()['paths'][endpoint][method.lower()]
    global_security = openapi_spec.openapi()['security']

    operation_params = operation_entry.get("parameters", [])
    operation_request_body = operation_entry.get("requestBody", None)
    operation_security = operation_entry.get("security", None)

    if settings.RUNNING_OPENAPI_CURL_TEST:  # nocoverage
        from zerver.openapi.curl_param_value_generators import patch_openapi_example_values
        operation_params, operation_request_body = patch_openapi_example_values(operation, operation_params,
                                                                                operation_request_body)

    format_dict = {}
    for param in operation_params:
        if param["in"] != "path":
            continue
        example_value = get_openapi_param_example_value_as_string(endpoint, method, param)
        format_dict[param["name"]] = example_value
    example_endpoint = endpoint.format_map(format_dict)

    curl_first_line_parts = ["curl", *curl_method_arguments(example_endpoint, method,
                                                            api_url)]
    lines.append(" ".join(map(shlex.quote, curl_first_line_parts)))

    insecure_operations = ['/dev_fetch_api_key:post', '/fetch_api_key:post']
    if operation_security is None:
        if global_security == [{'basicAuth': []}]:
            authentication_required = True
        else:
            raise AssertionError("Unhandled global securityScheme."
                                 + " Please update the code to handle this scheme.")
    elif operation_security == []:
        if operation in insecure_operations:
            authentication_required = False
        else:
            raise AssertionError("Unknown operation without a securityScheme. "
                                 + "Please update insecure_operations.")
    else:
        raise AssertionError("Unhandled securityScheme. Please update the code to handle this scheme.")

    if authentication_required:
        lines.append("    -u " + shlex.quote(f"{auth_email}:{auth_api_key}"))

    for param in operation_params:
        if param["in"] == "path":
            continue
        param_name = param["name"]

        if include is not None and param_name not in include:
            continue

        if exclude is not None and param_name in exclude:
            continue

        example_value = get_openapi_param_example_value_as_string(endpoint, method, param,
                                                                  curl_argument=True)
        lines.append(example_value)

    if "requestBody" in operation_entry:
        properties = operation_entry["requestBody"]["content"]["multipart/form-data"]["schema"]["properties"]
        for key, property in properties.items():
            lines.append('    -F ' + shlex.quote('{}=@{}'.format(key, property["example"])))

    for i in range(1, len(lines)-1):
        lines[i] = lines[i] + " \\"

    lines.append("```")

    return lines

def render_curl_example(function: str, api_url: str,
                        exclude: Optional[List[str]]=None,
                        include: Optional[List[str]]=None) -> List[str]:
    """ A simple wrapper around generate_curl_example. """
    parts = function.split(":")
    endpoint = parts[0]
    method = parts[1]
    kwargs: Dict[str, Any] = {}
    if len(parts) > 2:
        kwargs["auth_email"] = parts[2]
    if len(parts) > 3:
        kwargs["auth_api_key"] = parts[3]
    kwargs["api_url"] = api_url
    kwargs["exclude"] = exclude
    kwargs["include"] = include
    return generate_curl_example(endpoint, method, **kwargs)

SUPPORTED_LANGUAGES: Dict[str, Any] = {
    'python': {
        'client_config': PYTHON_CLIENT_CONFIG,
        'admin_config': PYTHON_CLIENT_ADMIN_CONFIG,
        'render': render_python_code_example,
    },
    'curl': {
        'render': render_curl_example,
    },
    'javascript': {
        'client_config': JS_CLIENT_CONFIG,
        'admin_config': JS_CLIENT_ADMIN_CONFIG,
        'render': render_javascript_code_example,
    },
}

class APIMarkdownExtension(Extension):
    def __init__(self, api_url: Optional[str]) -> None:
        self.config = {
            'api_url': [
                api_url,
                'API URL to use when rendering curl examples',
            ],
        }

    def extendMarkdown(self, md: markdown.Markdown) -> None:
        md.preprocessors.register(
            APICodeExamplesPreprocessor(md, self.getConfigs()), 'generate_code_example', 525
        )
        md.preprocessors.register(
            APIDescriptionPreprocessor(md, self.getConfigs()), 'generate_api_description', 530
        )

class APICodeExamplesPreprocessor(Preprocessor):
    def __init__(self, md: markdown.Markdown, config: Mapping[str, Any]) -> None:
        super().__init__(md)
        self.api_url = config['api_url']

    def run(self, lines: List[str]) -> List[str]:
        done = False
        while not done:
            for line in lines:
                loc = lines.index(line)
                match = MACRO_REGEXP.search(line)

                if match:
                    language, options = parse_language_and_options(match.group(2))
                    function = match.group(3)
                    key = match.group(4)
                    argument = match.group(6)
                    if self.api_url is None:
                        raise AssertionError("Cannot render curl API examples without API URL set.")
                    options['api_url'] = self.api_url

                    if key == 'fixture':
                        if argument:
                            text = self.render_fixture(function, name=argument)
                    elif key == 'example':
                        if argument == 'admin_config=True':
                            text = SUPPORTED_LANGUAGES[language]['render'](function, admin_config=True)
                        else:
                            text = SUPPORTED_LANGUAGES[language]['render'](function, **options)

                    # The line that contains the directive to include the macro
                    # may be preceded or followed by text or tags, in that case
                    # we need to make sure that any preceding or following text
                    # stays the same.
                    line_split = MACRO_REGEXP.split(line, maxsplit=0)
                    preceding = line_split[0]
                    following = line_split[-1]
                    text = [preceding, *text, following]
                    lines = lines[:loc] + text + lines[loc+1:]
                    break
            else:
                done = True
        return lines

    def render_fixture(self, function: str, name: Optional[str]=None) -> List[str]:
        fixture = []

        path, method = function.rsplit(':', 1)
        fixture_dict = get_openapi_fixture(path, method, name)
        fixture_json = json.dumps(fixture_dict, indent=4, sort_keys=True,
                                  separators=(',', ': '))

        fixture.append('``` json')
        fixture.extend(fixture_json.splitlines())
        fixture.append('```')

        return fixture

class APIDescriptionPreprocessor(Preprocessor):
    def __init__(self, md: markdown.Markdown, config: Mapping[str, Any]) -> None:
        super().__init__(md)
        self.api_url = config['api_url']

    def run(self, lines: List[str]) -> List[str]:
        done = False
        while not done:
            for line in lines:
                loc = lines.index(line)
                match = MACRO_REGEXP_DESC.search(line)

                if match:
                    function = match.group(2)
                    text = self.render_description(function)
                    # The line that contains the directive to include the macro
                    # may be preceded or followed by text or tags, in that case
                    # we need to make sure that any preceding or following text
                    # stays the same.
                    line_split = MACRO_REGEXP_DESC.split(line, maxsplit=0)
                    preceding = line_split[0]
                    following = line_split[-1]
                    text = [preceding, *text, following]
                    lines = lines[:loc] + text + lines[loc+1:]
                    break
            else:
                done = True
        return lines

    def render_description(self, function: str) -> List[str]:
        description: List[str] = []
        path, method = function.rsplit(':', 1)
        description_dict = get_openapi_description(path, method)
        description_dict = description_dict.replace('{{api_url}}', self.api_url)
        description.extend(description_dict.splitlines())
        return description

def makeExtension(*args: Any, **kwargs: str) -> APIMarkdownExtension:
    return APIMarkdownExtension(*args, **kwargs)
