# Webhooks for external integrations.
from typing import Any, Dict

from django.http import HttpRequest, HttpResponse

from zerver.decorator import webhook_view
from zerver.lib.request import REQ, has_request_variables
from zerver.lib.response import json_success
from zerver.lib.webhooks.common import check_send_webhook_message
from zerver.models import UserProfile

AIRBRAKE_TOPIC_TEMPLATE = '{project_name}'
AIRBRAKE_MESSAGE_TEMPLATE = '[{error_class}]({error_url}): "{error_message}" occurred.'

@webhook_view('Airbrake')
@has_request_variables
def api_airbrake_webhook(request: HttpRequest, user_profile: UserProfile,
                         payload: Dict[str, Any]=REQ(argument_type='body')) -> HttpResponse:
    subject = get_subject(payload)
    body = get_body(payload)
    check_send_webhook_message(request, user_profile, subject, body)
    return json_success()

def get_subject(payload: Dict[str, Any]) -> str:
    return AIRBRAKE_TOPIC_TEMPLATE.format(project_name=payload['error']['project']['name'])

def get_body(payload: Dict[str, Any]) -> str:
    data = {
        'error_url': payload['airbrake_error_url'],
        'error_class': payload['error']['error_class'],
        'error_message': payload['error']['error_message'],
    }
    return AIRBRAKE_MESSAGE_TEMPLATE.format(**data)
