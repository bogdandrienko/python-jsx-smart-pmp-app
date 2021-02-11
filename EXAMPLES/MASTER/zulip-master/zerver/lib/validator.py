'''
This module sets up a scheme for validating that arbitrary Python
objects are correctly typed.  It is totally decoupled from Django,
composable, easily wrapped, and easily extended.

A validator takes two parameters--var_name and val--and raises an
error if val is not the correct type.  The var_name parameter is used
to format error messages.  Validators return the validated value when
there are no errors.

Example primitive validators are check_string, check_int, and check_bool.

Compound validators are created by check_list and check_dict.  Note that
those functions aren't directly called for validation; instead, those
functions are called to return other functions that adhere to the validator
contract.  This is similar to how Python decorators are often parameterized.

The contract for check_list and check_dict is that they get passed in other
validators to apply to their items.  This allows you to build up validators
for arbitrarily complex validators.  See ValidatorTestCase for example usage.

A simple example of composition is this:

   check_list(check_string)('my_list', ['a', 'b', 'c'])

To extend this concept, it's simply a matter of writing your own validator
for any particular type of object.

'''
import re
from datetime import datetime
from typing import Any, Callable, Dict, Iterable, List, Optional, Set, Tuple, Union, cast, overload

import orjson
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator, validate_email
from django.utils.translation import ugettext as _

from zerver.lib.request import JsonableError, ResultT
from zerver.lib.types import ProfileFieldData, Validator


def check_string(var_name: str, val: object) -> str:
    if not isinstance(val, str):
        raise ValidationError(_('{var_name} is not a string').format(var_name=var_name))
    return val

def check_required_string(var_name: str, val: object) -> str:
    s = check_string(var_name, val)
    if not s.strip():
        raise ValidationError(_("{item} cannot be blank.").format(item=var_name))
    return s

def check_string_in(possible_values: Union[Set[str], List[str]]) -> Validator[str]:
    def validator(var_name: str, val: object) -> str:
        s = check_string(var_name, val)
        if s not in possible_values:
            raise ValidationError(_("Invalid {var_name}").format(var_name=var_name))
        return s

    return validator

def check_short_string(var_name: str, val: object) -> str:
    return check_capped_string(50)(var_name, val)

def check_capped_string(max_length: int) -> Validator[str]:
    def validator(var_name: str, val: object) -> str:
        s = check_string(var_name, val)
        if len(s) > max_length:
            raise ValidationError(_("{var_name} is too long (limit: {max_length} characters)").format(
                var_name=var_name, max_length=max_length,
            ))
        return s

    return validator

def check_string_fixed_length(length: int) -> Validator[str]:
    def validator(var_name: str, val: object) -> str:
        s = check_string(var_name, val)
        if len(s) != length:
            raise ValidationError(_("{var_name} has incorrect length {length}; should be {target_length}").format(
                var_name=var_name, target_length=length, length=len(s),
            ))
        return s

    return validator

def check_long_string(var_name: str, val: object) -> str:
    return check_capped_string(500)(var_name, val)

def check_date(var_name: str, val: object) -> str:
    if not isinstance(val, str):
        raise ValidationError(_('{var_name} is not a string').format(var_name=var_name))
    try:
        if datetime.strptime(val, '%Y-%m-%d').strftime('%Y-%m-%d') != val:
            raise ValidationError(_('{var_name} is not a date').format(var_name=var_name))
    except ValueError:
        raise ValidationError(_('{var_name} is not a date').format(var_name=var_name))
    return val

def check_int(var_name: str, val: object) -> int:
    if not isinstance(val, int):
        raise ValidationError(_('{var_name} is not an integer').format(var_name=var_name))
    return val

def check_int_in(possible_values: List[int]) -> Validator[int]:
    def validator(var_name: str, val: object) -> int:
        n = check_int(var_name, val)
        if n not in possible_values:
            raise ValidationError(_("Invalid {var_name}").format(var_name=var_name))
        return n

    return validator

def check_float(var_name: str, val: object) -> float:
    if not isinstance(val, float):
        raise ValidationError(_('{var_name} is not a float').format(var_name=var_name))
    return val

def check_bool(var_name: str, val: object) -> bool:
    if not isinstance(val, bool):
        raise ValidationError(_('{var_name} is not a boolean').format(var_name=var_name))
    return val

def check_color(var_name: str, val: object) -> str:
    s = check_string(var_name, val)
    valid_color_pattern = re.compile(r'^#([a-fA-F0-9]{3,6})$')
    matched_results = valid_color_pattern.match(s)
    if not matched_results:
        raise ValidationError(_('{var_name} is not a valid hex color code').format(var_name=var_name))
    return s

def check_none_or(sub_validator: Validator[ResultT]) -> Validator[Optional[ResultT]]:
    def f(var_name: str, val: object) -> Optional[ResultT]:
        if val is None:
            return val
        else:
            return sub_validator(var_name, val)
    return f

def check_list(sub_validator: Validator[ResultT], length: Optional[int]=None) -> Validator[List[ResultT]]:
    def f(var_name: str, val: object) -> List[ResultT]:
        if not isinstance(val, list):
            raise ValidationError(_('{var_name} is not a list').format(var_name=var_name))

        if length is not None and length != len(val):
            raise ValidationError(_('{container} should have exactly {length} items').format(
                container=var_name, length=length,
            ))

        for i, item in enumerate(val):
            vname = f'{var_name}[{i}]'
            valid_item = sub_validator(vname, item)
            assert item is valid_item  # To justify the unchecked cast below

        return cast(List[ResultT], val)
    return f

def check_tuple(sub_validators: List[Validator[ResultT]]) -> Validator[Tuple[Any, ...]]:
    def f(var_name: str, val: object) -> Tuple[Any, ...]:
        if not isinstance(val, tuple):
            raise ValidationError(_('{var_name} is not a tuple').format(var_name=var_name))

        desired_len = len(sub_validators)
        if desired_len != len(val):
            raise ValidationError(_('{var_name} should have exactly {desired_len} items').format(
                var_name=var_name, desired_len=desired_len,
            ))

        for i, sub_validator in enumerate(sub_validators):
            vname = f'{var_name}[{i}]'
            sub_validator(vname, val[i])

        return val
    return f

# https://zulip.readthedocs.io/en/latest/testing/mypy.html#using-overload-to-accurately-describe-variations
@overload
def check_dict(required_keys: Iterable[Tuple[str, Validator[object]]]=[],
               optional_keys: Iterable[Tuple[str, Validator[object]]]=[],
               *,
               _allow_only_listed_keys: bool=False) -> Validator[Dict[str, object]]:
    ...
@overload
def check_dict(required_keys: Iterable[Tuple[str, Validator[ResultT]]]=[],
               optional_keys: Iterable[Tuple[str, Validator[ResultT]]]=[],
               *,
               value_validator: Validator[ResultT],
               _allow_only_listed_keys: bool=False) -> Validator[Dict[str, ResultT]]:
    ...
def check_dict(required_keys: Iterable[Tuple[str, Validator[ResultT]]]=[],
               optional_keys: Iterable[Tuple[str, Validator[ResultT]]]=[],
               *,
               value_validator: Optional[Validator[ResultT]]=None,
               _allow_only_listed_keys: bool=False) -> Validator[Dict[str, ResultT]]:
    def f(var_name: str, val: object) -> Dict[str, ResultT]:
        if not isinstance(val, dict):
            raise ValidationError(_('{var_name} is not a dict').format(var_name=var_name))

        for k in val:
            check_string(f'{var_name} key', k)

        for k, sub_validator in required_keys:
            if k not in val:
                raise ValidationError(_('{key_name} key is missing from {var_name}').format(
                    key_name=k, var_name=var_name,
                ))
            vname = f'{var_name}["{k}"]'
            sub_validator(vname, val[k])

        for k, sub_validator in optional_keys:
            if k in val:
                vname = f'{var_name}["{k}"]'
                sub_validator(vname, val[k])

        if value_validator:
            for key in val:
                vname = f'{var_name} contains a value that'
                valid_value = value_validator(vname, val[key])
                assert val[key] is valid_value  # To justify the unchecked cast below

        if _allow_only_listed_keys:
            required_keys_set = {x[0] for x in required_keys}
            optional_keys_set = {x[0] for x in optional_keys}
            delta_keys = set(val.keys()) - required_keys_set - optional_keys_set
            if len(delta_keys) != 0:
                raise ValidationError(_("Unexpected arguments: {}").format(", ".join(list(delta_keys))))

        return cast(Dict[str, ResultT], val)

    return f

def check_dict_only(required_keys: Iterable[Tuple[str, Validator[ResultT]]],
                    optional_keys: Iterable[Tuple[str, Validator[ResultT]]]=[]) -> Validator[Dict[str, ResultT]]:
    return cast(
        Validator[Dict[str, ResultT]],
        check_dict(required_keys, optional_keys, _allow_only_listed_keys=True),
    )

def check_union(allowed_type_funcs: Iterable[Validator[ResultT]]) -> Validator[ResultT]:
    """
    Use this validator if an argument is of a variable type (e.g. processing
    properties that might be strings or booleans).

    `allowed_type_funcs`: the check_* validator functions for the possible data
    types for this variable.
    """

    def enumerated_type_check(var_name: str, val: object) -> ResultT:
        for func in allowed_type_funcs:
            try:
                return func(var_name, val)
            except ValidationError:
                pass
        raise ValidationError(_('{var_name} is not an allowed_type').format(var_name=var_name))
    return enumerated_type_check

def equals(expected_val: ResultT) -> Validator[ResultT]:
    def f(var_name: str, val: object) -> ResultT:
        if val != expected_val:
            raise ValidationError(_('{variable} != {expected_value} ({value} is wrong)').format(
                variable=var_name, expected_value=expected_val, value=val,
            ))
        return cast(ResultT, val)
    return f

def validate_login_email(email: str) -> None:
    try:
        validate_email(email)
    except ValidationError as err:
        raise JsonableError(str(err.message))

def check_url(var_name: str, val: object) -> str:
    # First, ensure val is a string
    s = check_string(var_name, val)
    # Now, validate as URL
    validate = URLValidator()
    try:
        validate(s)
        return s
    except ValidationError:
        raise ValidationError(_('{var_name} is not a URL').format(var_name=var_name))

def check_external_account_url_pattern(var_name: str, val: object) -> str:
    s = check_string(var_name, val)

    if s.count('%(username)s') != 1:
        raise ValidationError(_('Malformed URL pattern.'))
    url_val = s.replace('%(username)s', 'username')

    check_url(var_name, url_val)
    return s

def validate_choice_field_data(field_data: ProfileFieldData) -> Dict[str, Dict[str, str]]:
    """
    This function is used to validate the data sent to the server while
    creating/editing choices of the choice field in Organization settings.
    """
    validator = check_dict_only([
        ('text', check_required_string),
        ('order', check_required_string),
    ])

    for key, value in field_data.items():
        if not key.strip():
            raise ValidationError(_("'{item}' cannot be blank.").format(item='value'))

        valid_value = validator('field_data', value)
        assert value is valid_value  # To justify the unchecked cast below

    return cast(Dict[str, Dict[str, str]], field_data)

def validate_choice_field(var_name: str, field_data: str, value: object) -> str:
    """
    This function is used to validate the value selected by the user against a
    choice field. This is not used to validate admin data.
    """
    s = check_string(var_name, value)
    field_data_dict = orjson.loads(field_data)
    if s not in field_data_dict:
        msg = _("'{value}' is not a valid choice for '{field_name}'.")
        raise ValidationError(msg.format(value=value, field_name=var_name))
    return s

def check_widget_content(widget_content: object) -> Dict[str, Any]:
    if not isinstance(widget_content, dict):
        raise ValidationError('widget_content is not a dict')

    if 'widget_type' not in widget_content:
        raise ValidationError('widget_type is not in widget_content')

    if 'extra_data' not in widget_content:
        raise ValidationError('extra_data is not in widget_content')

    widget_type = widget_content['widget_type']
    extra_data = widget_content['extra_data']

    if not isinstance(extra_data, dict):
        raise ValidationError('extra_data is not a dict')

    if widget_type == 'zform':

        if 'type' not in extra_data:
            raise ValidationError('zform is missing type field')

        if extra_data['type'] == 'choices':
            check_choices = check_list(
                check_dict([
                    ('short_name', check_string),
                    ('long_name', check_string),
                    ('reply', check_string),
                ]),
            )

            # We re-check "type" here just to avoid it looking
            # like we have extraneous keys.
            checker = check_dict([
                ('type', equals('choices')),
                ('heading', check_string),
                ('choices', check_choices),
            ])

            checker('extra_data', extra_data)

            return widget_content

        raise ValidationError('unknown zform type: ' + extra_data['type'])

    raise ValidationError('unknown widget type: ' + widget_type)


# Converter functions for use with has_request_variables
def to_non_negative_int(s: str, max_int_size: int=2**32-1) -> int:
    x = int(s)
    if x < 0:
        raise ValueError("argument is negative")
    if x > max_int_size:
        raise ValueError(f'{x} is too large (max {max_int_size})')
    return x

def to_positive_or_allowed_int(allowed_integer: int) -> Callable[[str], int]:
    def converter(s: str) -> int:
        x = int(s)
        if x == allowed_integer:
            return x
        if x == 0:
            raise ValueError("argument is 0")
        return to_non_negative_int(s)
    return converter

def check_string_or_int_list(var_name: str, val: object) -> Union[str, List[int]]:
    if isinstance(val, str):
        return val

    if not isinstance(val, list):
        raise ValidationError(_('{var_name} is not a string or an integer list').format(var_name=var_name))

    return check_list(check_int)(var_name, val)

def check_string_or_int(var_name: str, val: object) -> Union[str, int]:
    if isinstance(val, (str, int)):
        return val

    raise ValidationError(_('{var_name} is not a string or integer').format(var_name=var_name))
