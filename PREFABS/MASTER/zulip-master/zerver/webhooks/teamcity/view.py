# Webhooks for teamcity integration
import logging
from typing import Any, Dict, List, Optional

from django.db.models import Q
from django.http import HttpRequest, HttpResponse

from zerver.decorator import webhook_view
from zerver.lib.actions import (
    check_send_private_message,
    send_rate_limited_pm_notification_to_bot_owner,
)
from zerver.lib.request import REQ, has_request_variables
from zerver.lib.response import json_success
from zerver.lib.send_email import FromAddress
from zerver.lib.webhooks.common import check_send_webhook_message
from zerver.models import Realm, UserProfile

MISCONFIGURED_PAYLOAD_TYPE_ERROR_MESSAGE = """
Hi there! Your bot {bot_name} just received a TeamCity payload in a
format that Zulip doesn't recognize. This usually indicates a
configuration issue in your TeamCity webhook settings. Please make sure
that you set the **Payload Format** option to **Legacy Webhook (JSON)**
in your TeamCity webhook configuration. Contact {support_email} if you
need further help!
"""

def guess_zulip_user_from_teamcity(teamcity_username: str, realm: Realm) -> Optional[UserProfile]:
    try:
        # Try to find a matching user in Zulip
        # We search a user's full name, short name,
        # and beginning of email address
        user = UserProfile.objects.filter(
            Q(full_name__iexact=teamcity_username) |
            Q(email__istartswith=teamcity_username),
            is_active=True,
            realm=realm).order_by("id")[0]
        return user
    except IndexError:
        return None

def get_teamcity_property_value(property_list: List[Dict[str, str]], name: str) -> Optional[str]:
    for property in property_list:
        if property['name'] == name:
            return property['value']
    return None

@webhook_view('Teamcity')
@has_request_variables
def api_teamcity_webhook(request: HttpRequest, user_profile: UserProfile,
                         payload: Dict[str, Any]=REQ(argument_type='body')) -> HttpResponse:
    message = payload.get('build')
    if message is None:
        # Ignore third-party specific (e.g. Slack) payload formats
        # and notify the bot owner
        message = MISCONFIGURED_PAYLOAD_TYPE_ERROR_MESSAGE.format(
            bot_name=user_profile.full_name,
            support_email=FromAddress.SUPPORT,
        ).strip()
        send_rate_limited_pm_notification_to_bot_owner(
            user_profile, user_profile.realm, message)

        return json_success()

    build_name = message['buildFullName']
    build_url = message['buildStatusUrl']
    changes_url = build_url + '&tab=buildChangesDiv'
    build_number = message['buildNumber']
    build_result = message['buildResult']
    build_result_delta = message['buildResultDelta']
    build_status = message['buildStatus']

    if build_result == 'success':
        if build_result_delta == 'fixed':
            status = 'has been fixed! :thumbs_up:'
        else:
            status = 'was successful! :thumbs_up:'
    elif build_result == 'failure':
        if build_result_delta == 'broken':
            status = f'is broken with status {build_status}! :thumbs_down:'
        else:
            status = f'is still broken with status {build_status}! :thumbs_down:'
    elif build_result == 'running':
        status = 'has started.'

    template = """
{build_name} build {build_id} {status} See [changes]\
({changes_url}) and [build log]({log_url}).
""".strip()

    body = template.format(
        build_name=build_name,
        build_id=build_number,
        status=status,
        changes_url=changes_url,
        log_url=build_url,
    )

    if 'branchDisplayName' in message:
        topic = '{} ({})'.format(build_name, message['branchDisplayName'])
    else:
        topic = build_name

    # Check if this is a personal build, and if so try to private message the user who triggered it.
    if get_teamcity_property_value(message['teamcityProperties'], 'env.BUILD_IS_PERSONAL') == 'true':
        # The triggeredBy field gives us the teamcity user full name, and the
        # "teamcity.build.triggeredBy.username" property gives us the teamcity username.
        # Let's try finding the user email from both.
        teamcity_fullname = message['triggeredBy'].split(';')[0]
        teamcity_user = guess_zulip_user_from_teamcity(teamcity_fullname, user_profile.realm)

        if teamcity_user is None:
            teamcity_shortname = get_teamcity_property_value(message['teamcityProperties'],
                                                             'teamcity.build.triggeredBy.username')
            if teamcity_shortname is not None:
                teamcity_user = guess_zulip_user_from_teamcity(teamcity_shortname, user_profile.realm)

        if teamcity_user is None:
            # We can't figure out who started this build - there's nothing we can do here.
            logging.info("Teamcity webhook couldn't find a matching Zulip user for "
                         "Teamcity user '%s' or '%s'", teamcity_fullname, teamcity_shortname)
            return json_success()

        body = f"Your personal build for {body}"
        check_send_private_message(user_profile, request.client, teamcity_user, body)

        return json_success()

    check_send_webhook_message(request, user_profile, topic, body)
    return json_success()
