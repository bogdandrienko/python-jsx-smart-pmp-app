from typing import Any, Dict

from django.http import HttpRequest, HttpResponse

from zerver.decorator import webhook_view
from zerver.lib.request import REQ, has_request_variables
from zerver.lib.response import json_success
from zerver.lib.webhooks.common import check_send_webhook_message
from zerver.models import UserProfile


@webhook_view('OpsGenie')
@has_request_variables
def api_opsgenie_webhook(request: HttpRequest, user_profile: UserProfile,
                         payload: Dict[str, Any]=REQ(argument_type='body')) -> HttpResponse:

    # construct the body of the message
    info = {
        "additional_info": '',
        "alert_type": payload['action'],
        "alert_id": payload['alert']['alertId'],
        "integration_name": payload['integrationName'],
        "tags": ', '.join('`' + tag + '`' for tag in payload['alert'].get('tags', [])),
    }

    topic = info['integration_name']
    bullet_template = "* **{key}**: {value}\n"

    if 'note' in payload['alert']:
        info['additional_info'] += bullet_template.format(
            key='Note',
            value=payload['alert']['note'],
        )
    if 'recipient' in payload['alert']:
        info['additional_info'] += bullet_template.format(
            key='Recipient',
            value=payload['alert']['recipient'],
        )
    if 'addedTags' in payload['alert']:
        info['additional_info'] += bullet_template.format(
            key='Tags added',
            value=payload['alert']['addedTags'],
        )
    if 'team' in payload['alert']:
        info['additional_info'] += bullet_template.format(
            key='Team added',
            value=payload['alert']['team'],
        )
    if 'owner' in payload['alert']:
        info['additional_info'] += bullet_template.format(
            key='Assigned owner',
            value=payload['alert']['owner'],
        )
    if 'escalationName' in payload:
        info['additional_info'] += bullet_template.format(
            key='Escalation',
            value=payload['escalationName'],
        )
    if 'removedTags' in payload['alert']:
        info['additional_info'] += bullet_template.format(
            key='Tags removed',
            value=payload['alert']['removedTags'],
        )
    if 'message' in payload['alert']:
        info['additional_info'] += bullet_template.format(
            key='Message',
            value=payload['alert']['message'],
        )
    if info['tags']:
        info['additional_info'] += bullet_template.format(
            key='Tags',
            value=info['tags'],
        )

    body_template = """
[OpsGenie alert for {integration_name}](https://app.opsgenie.com/alert/V2#/show/{alert_id}):
* **Type**: {alert_type}
{additional_info}
""".strip()

    body = body_template.format(**info)
    check_send_webhook_message(request, user_profile, topic, body)

    return json_success()
