from functools import partial
from html.parser import HTMLParser
from typing import Any, Callable, Dict, List, Tuple

from django.http import HttpRequest, HttpResponse

from zerver.decorator import webhook_view
from zerver.lib.exceptions import UnsupportedWebhookEventType
from zerver.lib.request import REQ, has_request_variables
from zerver.lib.response import json_success
from zerver.lib.webhooks.common import check_send_webhook_message
from zerver.models import UserProfile

COMPANY_CREATED = """
New company **{name}** created:
* **User count**: {user_count}
* **Monthly spending**: {monthly_spend}
""".strip()

CONTACT_EMAIL_ADDED = "New email {email} added to contact."

CONTACT_CREATED = """
New contact created:
* **Name (or pseudonym)**: {name}
* **Email**: {email}
* **Location**: {location_info}
""".strip()

CONTACT_SIGNED_UP = """
Contact signed up:
* **Email**: {email}
* **Location**: {location_info}
""".strip()

CONTACT_TAG_CREATED = "Contact tagged with the `{name}` tag."

CONTACT_TAG_DELETED = "The tag `{name}` was removed from the contact."

CONVERSATION_ADMIN_ASSIGNED = "{name} assigned to conversation."

CONVERSATION_ADMIN_TEMPLATE = "{admin_name} {action} the conversation."

CONVERSATION_ADMIN_REPLY_TEMPLATE = """
{admin_name} {action} the conversation:

``` quote
{content}
```
""".strip()

CONVERSATION_ADMIN_INITIATED_CONVERSATION = """
{admin_name} initiated a conversation:

``` quote
{content}
```
""".strip()

EVENT_CREATED = "New event **{event_name}** created."

USER_CREATED = """
New user created:
* **Name**: {name}
* **Email**: {email}
""".strip()

class MLStripper(HTMLParser):
    def __init__(self) -> None:
        self.reset()
        self.strict = False
        self.convert_charrefs = True
        self.fed: List[str] = []

    def handle_data(self, d: str) -> None:
        self.fed.append(d)

    def get_data(self) -> str:
        return ''.join(self.fed)

def strip_tags(html: str) -> str:
    s = MLStripper()
    s.feed(html)
    return s.get_data()

def get_topic_for_contacts(user: Dict[str, Any]) -> str:
    topic = "{type}: {name}".format(
        type=user['type'].capitalize(),
        name=user.get('name') or user.get('pseudonym') or user.get('email'),
    )

    return topic

def get_company_created_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    body = COMPANY_CREATED.format(**payload['data']['item'])
    return ('Companies', body)

def get_contact_added_email_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    user = payload['data']['item']
    body = CONTACT_EMAIL_ADDED.format(email=user['email'])
    topic = get_topic_for_contacts(user)
    return (topic, body)

def get_contact_created_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    contact = payload['data']['item']
    body = CONTACT_CREATED.format(
        name=contact.get('name') or contact.get('pseudonym'),
        email=contact['email'],
        location_info="{city_name}, {region_name}, {country_name}".format(
            **contact['location_data'],
        ),
    )
    topic = get_topic_for_contacts(contact)
    return (topic, body)

def get_contact_signed_up_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    contact = payload['data']['item']
    body = CONTACT_SIGNED_UP.format(
        email=contact['email'],
        location_info="{city_name}, {region_name}, {country_name}".format(
            **contact['location_data'],
        ),
    )
    topic = get_topic_for_contacts(contact)
    return (topic, body)

def get_contact_tag_created_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    body = CONTACT_TAG_CREATED.format(**payload['data']['item']['tag'])
    contact = payload['data']['item']['contact']
    topic = get_topic_for_contacts(contact)
    return (topic, body)

def get_contact_tag_deleted_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    body = CONTACT_TAG_DELETED.format(**payload['data']['item']['tag'])
    contact = payload['data']['item']['contact']
    topic = get_topic_for_contacts(contact)
    return (topic, body)

def get_conversation_admin_assigned_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    body = CONVERSATION_ADMIN_ASSIGNED.format(**payload['data']['item']['assignee'])
    user = payload['data']['item']['user']
    topic = get_topic_for_contacts(user)
    return (topic, body)

def get_conversation_admin_message(
        payload: Dict[str, Any],
        action: str,
) -> Tuple[str, str]:
    assignee = payload['data']['item']['assignee']
    user = payload['data']['item']['user']
    body = CONVERSATION_ADMIN_TEMPLATE.format(
        admin_name=assignee.get('name'),
        action=action,
    )
    topic = get_topic_for_contacts(user)
    return (topic, body)

def get_conversation_admin_reply_message(
        payload: Dict[str, Any],
        action: str,
) -> Tuple[str, str]:
    assignee = payload['data']['item']['assignee']
    user = payload['data']['item']['user']
    note = payload['data']['item']['conversation_parts']['conversation_parts'][0]
    content = strip_tags(note['body'])
    body = CONVERSATION_ADMIN_REPLY_TEMPLATE.format(
        admin_name=assignee.get('name'),
        action=action,
        content=content,
    )
    topic = get_topic_for_contacts(user)
    return (topic, body)

def get_conversation_admin_single_created_message(
        payload: Dict[str, Any]) -> Tuple[str, str]:
    assignee = payload['data']['item']['assignee']
    user = payload['data']['item']['user']
    conversation_body = payload['data']['item']['conversation_message']['body']
    content = strip_tags(conversation_body)
    body = CONVERSATION_ADMIN_INITIATED_CONVERSATION.format(
        admin_name=assignee.get('name'),
        content=content,
    )
    topic = get_topic_for_contacts(user)
    return (topic, body)

def get_conversation_user_created_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    user = payload['data']['item']['user']
    conversation_body = payload['data']['item']['conversation_message']['body']
    content = strip_tags(conversation_body)
    body = CONVERSATION_ADMIN_INITIATED_CONVERSATION.format(
        admin_name=user.get('name'),
        content=content,
    )
    topic = get_topic_for_contacts(user)
    return (topic, body)

def get_conversation_user_replied_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    user = payload['data']['item']['user']
    note = payload['data']['item']['conversation_parts']['conversation_parts'][0]
    content = strip_tags(note['body'])
    body = CONVERSATION_ADMIN_REPLY_TEMPLATE.format(
        admin_name=user.get('name'),
        action='replied to',
        content=content,
    )
    topic = get_topic_for_contacts(user)
    return (topic, body)

def get_event_created_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    event = payload['data']['item']
    body = EVENT_CREATED.format(**event)
    return ('Events', body)

def get_user_created_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    user = payload['data']['item']
    body = USER_CREATED.format(**user)
    topic = get_topic_for_contacts(user)
    return (topic, body)

def get_user_deleted_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    user = payload['data']['item']
    topic = get_topic_for_contacts(user)
    return (topic, 'User deleted.')

def get_user_email_updated_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    user = payload['data']['item']
    body = 'User\'s email was updated to {}.'.format(user['email'])
    topic = get_topic_for_contacts(user)
    return (topic, body)

def get_user_tagged_message(
        payload: Dict[str, Any],
        action: str,
) -> Tuple[str, str]:
    user = payload['data']['item']['user']
    tag = payload['data']['item']['tag']
    topic = get_topic_for_contacts(user)
    body = 'The tag `{tag_name}` was {action} the user.'.format(
        tag_name=tag['name'],
        action=action,
    )
    return (topic, body)

def get_user_unsubscribed_message(payload: Dict[str, Any]) -> Tuple[str, str]:
    user = payload['data']['item']
    body = 'User unsubscribed from emails.'
    topic = get_topic_for_contacts(user)
    return (topic, body)

EVENT_TO_FUNCTION_MAPPER = {
    'company.created': get_company_created_message,
    'contact.added_email': get_contact_added_email_message,
    'contact.created': get_contact_created_message,
    'contact.signed_up': get_contact_signed_up_message,
    'contact.tag.created': get_contact_tag_created_message,
    'contact.tag.deleted': get_contact_tag_deleted_message,
    'conversation.admin.assigned': get_conversation_admin_assigned_message,
    'conversation.admin.closed': partial(get_conversation_admin_message, action='closed'),
    'conversation.admin.opened': partial(get_conversation_admin_message, action='opened'),
    'conversation.admin.snoozed': partial(get_conversation_admin_message, action='snoozed'),
    'conversation.admin.unsnoozed': partial(get_conversation_admin_message, action='unsnoozed'),
    'conversation.admin.replied': partial(get_conversation_admin_reply_message, action='replied to'),
    'conversation.admin.noted': partial(get_conversation_admin_reply_message, action='added a note to'),
    'conversation.admin.single.created': get_conversation_admin_single_created_message,
    'conversation.user.created': get_conversation_user_created_message,
    'conversation.user.replied': get_conversation_user_replied_message,
    'event.created': get_event_created_message,
    'user.created': get_user_created_message,
    'user.deleted': get_user_deleted_message,
    'user.email.updated': get_user_email_updated_message,
    'user.tag.created': partial(get_user_tagged_message, action='added to'),
    'user.tag.deleted': partial(get_user_tagged_message, action='removed from'),
    'user.unsubscribed': get_user_unsubscribed_message,
    # Note that we do not have a payload for visitor.signed_up
    # but it should be identical to contact.signed_up
    'visitor.signed_up': get_contact_signed_up_message,
}

def get_event_handler(event_type: str) -> Callable[..., Tuple[str, str]]:
    handler: Any = EVENT_TO_FUNCTION_MAPPER.get(event_type)
    if handler is None:
        raise UnsupportedWebhookEventType(event_type)
    return handler

@webhook_view('Intercom')
@has_request_variables
def api_intercom_webhook(request: HttpRequest, user_profile: UserProfile,
                         payload: Dict[str, Any]=REQ(argument_type='body')) -> HttpResponse:
    event_type = payload['topic']
    if event_type == 'ping':
        return json_success()

    topic, body = get_event_handler(event_type)(payload)

    check_send_webhook_message(request, user_profile, topic, body)
    return json_success()
