# Webhooks for external integrations.
from typing import Any, Dict, Optional

from django.http import HttpRequest, HttpResponse

from zerver.decorator import webhook_view
from zerver.lib.request import REQ, has_request_variables
from zerver.lib.response import json_success
from zerver.lib.webhooks.common import check_send_webhook_message
from zerver.models import UserProfile


@webhook_view('Canarytoken')
@has_request_variables
def api_canarytoken_webhook(
        request: HttpRequest, user_profile: UserProfile,
        message: Dict[str, Any] = REQ(argument_type='body'),
        user_specified_topic: Optional[str] = REQ('topic', default=None)
) -> HttpResponse:
    """
    Construct a response to a webhook event from a Thinkst canarytoken from
    canarytokens.org. Canarytokens from Thinkst's paid product have a different
    schema and should use the "thinkst" integration. See linked documentation
    below for a schema:

    https://help.canary.tools/hc/en-gb/articles/360002426577-How-do-I-configure-notifications-for-a-Generic-Webhook-
    """
    topic = 'canarytoken alert'
    body = (f"**:alert: Canarytoken has been triggered on {message['time']}!**\n\n"
            f"{message['memo']} \n\n"
            f"[Manage this canarytoken]({message['manage_url']})")

    if user_specified_topic:
        topic = user_specified_topic

    check_send_webhook_message(request, user_profile, topic, body)
    return json_success()
