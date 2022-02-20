from enum import Enum
from typing import Any, Dict, List, NoReturn, Optional, Type, TypeVar

from django.utils.translation import ugettext as _

T = TypeVar("T", bound="AbstractEnum")

class AbstractEnum(Enum):
    '''An enumeration whose members are used strictly for their names.'''

    def __new__(cls: Type[T]) -> T:
        obj = object.__new__(cls)
        obj._value_ = len(cls.__members__) + 1
        return obj

    # Override all the `Enum` methods that use `_value_`.

    def __repr__(self) -> str:
        return str(self)  # nocoverage

    def value(self) -> None:
        raise AssertionError("Not implemented")

    def __reduce_ex__(self, proto: object) -> NoReturn:
        raise AssertionError("Not implemented")

class ErrorCode(AbstractEnum):
    BAD_REQUEST = ()  # Generic name, from the name of HTTP 400.
    REQUEST_VARIABLE_MISSING = ()
    REQUEST_VARIABLE_INVALID = ()
    INVALID_JSON = ()
    BAD_IMAGE = ()
    REALM_UPLOAD_QUOTA = ()
    BAD_NARROW = ()
    CANNOT_DEACTIVATE_LAST_USER = ()
    MISSING_HTTP_EVENT_HEADER = ()
    STREAM_DOES_NOT_EXIST = ()
    UNAUTHORIZED_PRINCIPAL = ()
    UNSUPPORTED_WEBHOOK_EVENT_TYPE = ()
    BAD_EVENT_QUEUE_ID = ()
    CSRF_FAILED = ()
    INVITATION_FAILED = ()
    INVALID_ZULIP_SERVER = ()
    INVALID_MARKDOWN_INCLUDE_STATEMENT = ()
    REQUEST_CONFUSING_VAR = ()
    INVALID_API_KEY = ()
    INVALID_ZOOM_TOKEN = ()
    UNAUTHENTICATED_USER = ()
    NONEXISTENT_SUBDOMAIN = ()
    RATE_LIMIT_HIT = ()

class JsonableError(Exception):
    '''A standardized error format we can turn into a nice JSON HTTP response.

    This class can be invoked in a couple ways.

     * Easiest, but completely machine-unreadable:

         raise JsonableError(_("No such widget: {}").format(widget_name))

       The message may be passed through to clients and shown to a user,
       so translation is required.  Because the text will vary depending
       on the user's language, it's not possible for code to distinguish
       this error from others in a non-buggy way.

     * Fully machine-readable, with an error code and structured data:

         class NoSuchWidgetError(JsonableError):
             code = ErrorCode.NO_SUCH_WIDGET
             data_fields = ['widget_name']

             def __init__(self, widget_name: str) -> None:
                 self.widget_name: str = widget_name

             @staticmethod
             def msg_format() -> str:
                 return _("No such widget: {widget_name}")

         raise NoSuchWidgetError(widget_name)

       Now both server and client code see a `widget_name` attribute
       and an error code.

    Subclasses may also override `http_status_code`.
    '''

    # Override this in subclasses, as needed.
    code: ErrorCode = ErrorCode.BAD_REQUEST

    # Override this in subclasses if providing structured data.
    data_fields: List[str] = []

    # Optionally override this in subclasses to return a different HTTP status,
    # like 403 or 404.
    http_status_code: int = 400

    def __init__(self, msg: str) -> None:
        # `_msg` is an implementation detail of `JsonableError` itself.
        self._msg: str = msg

    @staticmethod
    def msg_format() -> str:
        '''Override in subclasses.  Gets the items in `data_fields` as format args.

        This should return (a translation of) a string literal.
        The reason it's not simply a class attribute is to allow
        translation to work.
        '''
        # Secretly this gets one more format arg not in `data_fields`: `_msg`.
        # That's for the sake of the `JsonableError` base logic itself, for
        # the simplest form of use where we just get a plain message string
        # at construction time.
        return '{_msg}'

    @property
    def extra_headers(self) -> Dict[str, Any]:
        return {}

    #
    # Infrastructure -- not intended to be overridden in subclasses.
    #

    @property
    def msg(self) -> str:
        format_data = dict(((f, getattr(self, f)) for f in self.data_fields),
                           _msg=getattr(self, '_msg', None))
        return self.msg_format().format(**format_data)

    @property
    def data(self) -> Dict[str, Any]:
        return dict(((f, getattr(self, f)) for f in self.data_fields),
                    code=self.code.name)

    def to_json(self) -> Dict[str, Any]:
        d = {'result': 'error', 'msg': self.msg}
        d.update(self.data)
        return d

    def __str__(self) -> str:
        return self.msg

class StreamDoesNotExistError(JsonableError):
    code = ErrorCode.STREAM_DOES_NOT_EXIST
    data_fields = ['stream']

    def __init__(self, stream: str) -> None:
        self.stream = stream

    @staticmethod
    def msg_format() -> str:
        return _("Stream '{stream}' does not exist")

class StreamWithIDDoesNotExistError(JsonableError):
    code = ErrorCode.STREAM_DOES_NOT_EXIST
    data_fields = ['stream_id']

    def __init__(self, stream_id: int) -> None:
        self.stream_id = stream_id

    @staticmethod
    def msg_format() -> str:
        return _("Stream with ID '{stream_id}' does not exist")

class CannotDeactivateLastUserError(JsonableError):
    code = ErrorCode.CANNOT_DEACTIVATE_LAST_USER
    data_fields = ['is_last_owner', 'entity']

    def __init__(self, is_last_owner: bool) -> None:
        self.is_last_owner = is_last_owner
        self.entity = _("organization owner") if is_last_owner else _("user")

    @staticmethod
    def msg_format() -> str:
        return _("Cannot deactivate the only {entity}.")

class InvalidMarkdownIncludeStatement(JsonableError):
    code = ErrorCode.INVALID_MARKDOWN_INCLUDE_STATEMENT
    data_fields = ['include_statement']

    def __init__(self, include_statement: str) -> None:
        self.include_statement = include_statement

    @staticmethod
    def msg_format() -> str:
        return _("Invalid Markdown include statement: {include_statement}")

class RateLimited(JsonableError):
    code = ErrorCode.RATE_LIMIT_HIT
    http_status_code = 429

    def __init__(self, secs_to_freedom: Optional[float]=None) -> None:
        self.secs_to_freedom = secs_to_freedom

    @staticmethod
    def msg_format() -> str:
        return _("API usage exceeded rate limit")

    @property
    def extra_headers(self) -> Dict[str, Any]:
        extra_headers_dict = super().extra_headers
        if self.secs_to_freedom is not None:
            extra_headers_dict["Retry-After"] = self.secs_to_freedom

        return extra_headers_dict

    @property
    def data(self) -> Dict[str, Any]:
        data_dict = super().data
        data_dict['retry-after'] = self.secs_to_freedom

        return data_dict

class InvalidJSONError(JsonableError):
    code = ErrorCode.INVALID_JSON

    @staticmethod
    def msg_format() -> str:
        return _("Malformed JSON")

class OrganizationMemberRequired(JsonableError):
    code: ErrorCode = ErrorCode.UNAUTHORIZED_PRINCIPAL

    def __init__(self) -> None:
        pass

    @staticmethod
    def msg_format() -> str:
        return _("Must be an organization member")

class OrganizationAdministratorRequired(JsonableError):
    code: ErrorCode = ErrorCode.UNAUTHORIZED_PRINCIPAL

    def __init__(self) -> None:
        pass

    @staticmethod
    def msg_format() -> str:
        return _("Must be an organization administrator")

class OrganizationOwnerRequired(JsonableError):
    code: ErrorCode = ErrorCode.UNAUTHORIZED_PRINCIPAL

    def __init__(self) -> None:
        pass

    @staticmethod
    def msg_format() -> str:
        return _("Must be an organization owner")

class StreamAdministratorRequired(JsonableError):
    code: ErrorCode = ErrorCode.UNAUTHORIZED_PRINCIPAL

    def __init__(self) -> None:
        pass

    @staticmethod
    def msg_format() -> str:
        return _("Must be an organization or stream administrator")

class MarkdownRenderingException(Exception):
    pass

class InvalidAPIKeyError(JsonableError):
    code = ErrorCode.INVALID_API_KEY
    http_status_code = 401

    def __init__(self) -> None:
        pass

    @staticmethod
    def msg_format() -> str:
        return _("Invalid API key")

class InvalidAPIKeyFormatError(InvalidAPIKeyError):
    @staticmethod
    def msg_format() -> str:
        return _("Malformed API key")

class UnsupportedWebhookEventType(JsonableError):
    code = ErrorCode.UNSUPPORTED_WEBHOOK_EVENT_TYPE
    data_fields = ['webhook_name', 'event_type']

    def __init__(self, event_type: Optional[str]) -> None:
        self.webhook_name = "(unknown)"
        self.event_type = event_type

    @staticmethod
    def msg_format() -> str:
        return _("The '{event_type}' event isn't currently supported by the {webhook_name} webhook")

class MissingAuthenticationError(JsonableError):
    code = ErrorCode.UNAUTHENTICATED_USER
    http_status_code = 401

    def __init__(self) -> None:
        pass

    # No msg_format is defined since this exception is caught and
    # converted into json_unauthorized in Zulip's middleware.

class InvalidSubdomainError(JsonableError):
    code = ErrorCode.NONEXISTENT_SUBDOMAIN
    http_status_code = 404

    def __init__(self) -> None:
        pass

    @staticmethod
    def msg_format() -> str:
        return _("Invalid subdomain")

class ZephyrMessageAlreadySentException(Exception):
    def __init__(self, message_id: int) -> None:
        self.message_id = message_id
