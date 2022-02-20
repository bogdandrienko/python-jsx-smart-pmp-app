from typing import Iterable, Optional, Sequence, Union, cast

import pytz
from dateutil.parser import parse as dateparser
from django.core import validators
from django.core.exceptions import ValidationError
from django.http import HttpRequest, HttpResponse
from django.utils.timezone import now as timezone_now
from django.utils.translation import ugettext as _

from zerver.decorator import REQ, has_request_variables
from zerver.lib.actions import (
    check_schedule_message,
    check_send_message,
    compute_irc_user_fullname,
    compute_jabber_user_fullname,
    create_mirror_user_if_needed,
    extract_private_recipients,
    extract_stream_indicator,
)
from zerver.lib.message import render_markdown
from zerver.lib.response import json_error, json_success
from zerver.lib.timestamp import convert_to_UTC
from zerver.lib.topic import REQ_topic
from zerver.lib.zcommand import process_zcommands
from zerver.lib.zephyr import compute_mit_user_fullname
from zerver.models import (
    Client,
    Message,
    Realm,
    RealmDomain,
    UserProfile,
    email_to_domain,
    get_realm,
    get_user_including_cross_realm,
)


class InvalidMirrorInput(Exception):
    pass

def create_mirrored_message_users(request: HttpRequest, user_profile: UserProfile,
                                  recipients: Iterable[str]) -> UserProfile:
    if "sender" not in request.POST:
        raise InvalidMirrorInput("No sender")

    sender_email = request.POST["sender"].strip().lower()
    referenced_users = {sender_email}
    if request.POST['type'] == 'private':
        for email in recipients:
            referenced_users.add(email.lower())

    if request.client.name == "zephyr_mirror":
        user_check = same_realm_zephyr_user
        fullname_function = compute_mit_user_fullname
    elif request.client.name == "irc_mirror":
        user_check = same_realm_irc_user
        fullname_function = compute_irc_user_fullname
    elif request.client.name in ("jabber_mirror", "JabberMirror"):
        user_check = same_realm_jabber_user
        fullname_function = compute_jabber_user_fullname
    else:
        raise InvalidMirrorInput("Unrecognized mirroring client")

    for email in referenced_users:
        # Check that all referenced users are in our realm:
        if not user_check(user_profile, email):
            raise InvalidMirrorInput("At least one user cannot be mirrored")

    # Create users for the referenced users, if needed.
    for email in referenced_users:
        create_mirror_user_if_needed(user_profile.realm, email, fullname_function)

    sender = get_user_including_cross_realm(sender_email, user_profile.realm)
    return sender

def same_realm_zephyr_user(user_profile: UserProfile, email: str) -> bool:
    #
    # Are the sender and recipient both addresses in the same Zephyr
    # mirroring realm?  We have to handle this specially, inferring
    # the domain from the e-mail address, because the recipient may
    # not existing in Zulip and we may need to make a stub Zephyr
    # mirroring user on the fly.
    try:
        validators.validate_email(email)
    except ValidationError:
        return False

    domain = email_to_domain(email)

    # Assumes allow_subdomains=False for all RealmDomain's corresponding to
    # these realms.
    return user_profile.realm.is_zephyr_mirror_realm and \
        RealmDomain.objects.filter(realm=user_profile.realm, domain=domain).exists()

def same_realm_irc_user(user_profile: UserProfile, email: str) -> bool:
    # Check whether the target email address is an IRC user in the
    # same realm as user_profile, i.e. if the domain were example.com,
    # the IRC user would need to be username@irc.example.com
    try:
        validators.validate_email(email)
    except ValidationError:
        return False

    domain = email_to_domain(email).replace("irc.", "")

    # Assumes allow_subdomains=False for all RealmDomain's corresponding to
    # these realms.
    return RealmDomain.objects.filter(realm=user_profile.realm, domain=domain).exists()

def same_realm_jabber_user(user_profile: UserProfile, email: str) -> bool:
    try:
        validators.validate_email(email)
    except ValidationError:
        return False

    # If your Jabber users have a different email domain than the
    # Zulip users, this is where you would do any translation.
    domain = email_to_domain(email)

    # Assumes allow_subdomains=False for all RealmDomain's corresponding to
    # these realms.
    return RealmDomain.objects.filter(realm=user_profile.realm, domain=domain).exists()

def handle_deferred_message(sender: UserProfile, client: Client,
                            message_type_name: str,
                            message_to: Union[Sequence[str], Sequence[int]],
                            topic_name: Optional[str],
                            message_content: str, delivery_type: str,
                            defer_until: str, tz_guess: Optional[str],
                            forwarder_user_profile: UserProfile,
                            realm: Optional[Realm]) -> HttpResponse:
    deliver_at = None
    local_tz = 'UTC'
    if tz_guess:
        local_tz = tz_guess
    elif sender.timezone:
        local_tz = sender.timezone
    try:
        deliver_at = dateparser(defer_until)
    except ValueError:
        return json_error(_("Invalid time format"))

    deliver_at_usertz = deliver_at
    if deliver_at_usertz.tzinfo is None:
        user_tz = pytz.timezone(local_tz)
        deliver_at_usertz = user_tz.normalize(user_tz.localize(deliver_at))
    deliver_at = convert_to_UTC(deliver_at_usertz)

    if deliver_at <= timezone_now():
        return json_error(_("Time must be in the future."))

    check_schedule_message(sender, client, message_type_name, message_to,
                           topic_name, message_content, delivery_type,
                           deliver_at, realm=realm,
                           forwarder_user_profile=forwarder_user_profile)
    return json_success({"deliver_at": str(deliver_at_usertz)})

@has_request_variables
def send_message_backend(request: HttpRequest, user_profile: UserProfile,
                         message_type_name: str=REQ('type'),
                         req_to: Optional[str]=REQ('to', default=None),
                         forged_str: Optional[str]=REQ("forged",
                                                       default=None,
                                                       documentation_pending=True),
                         topic_name: Optional[str]=REQ_topic(),
                         message_content: str=REQ('content'),
                         widget_content: Optional[str]=REQ(default=None,
                                                           documentation_pending=True),
                         realm_str: Optional[str]=REQ('realm_str', default=None,
                                                      documentation_pending=True),
                         local_id: Optional[str]=REQ(default=None),
                         queue_id: Optional[str]=REQ(default=None),
                         delivery_type: str=REQ('delivery_type', default='send_now',
                                                documentation_pending=True),
                         defer_until: Optional[str]=REQ('deliver_at', default=None,
                                                        documentation_pending=True),
                         tz_guess: Optional[str]=REQ('tz_guess', default=None,
                                                     documentation_pending=True),
                         ) -> HttpResponse:

    # If req_to is None, then we default to an
    # empty list of recipients.
    message_to: Union[Sequence[int], Sequence[str]] = []

    if req_to is not None:
        if message_type_name == 'stream':
            stream_indicator = extract_stream_indicator(req_to)

            # For legacy reasons check_send_message expects
            # a list of streams, instead of a single stream.
            #
            # Also, mypy can't detect that a single-item
            # list populated from a Union[int, str] is actually
            # a Union[Sequence[int], Sequence[str]].
            if isinstance(stream_indicator, int):
                message_to = [stream_indicator]
            else:
                message_to = [stream_indicator]
        else:
            message_to = extract_private_recipients(req_to)

    # Temporary hack: We're transitioning `forged` from accepting
    # `yes` to accepting `true` like all of our normal booleans.
    forged = forged_str is not None and forged_str in ["yes", "true"]

    client = request.client
    can_forge_sender = request.user.can_forge_sender
    if forged and not can_forge_sender:
        return json_error(_("User not authorized for this query"))

    realm = None
    if realm_str and realm_str != user_profile.realm.string_id:
        if not can_forge_sender:
            # The email gateway bot needs to be able to send messages in
            # any realm.
            return json_error(_("User not authorized for this query"))
        try:
            realm = get_realm(realm_str)
        except Realm.DoesNotExist:
            return json_error(_("Unknown organization '{}'").format(realm_str))

    if client.name in ["zephyr_mirror", "irc_mirror", "jabber_mirror", "JabberMirror"]:
        # Here's how security works for mirroring:
        #
        # For private messages, the message must be (1) both sent and
        # received exclusively by users in your realm, and (2)
        # received by the forwarding user.
        #
        # For stream messages, the message must be (1) being forwarded
        # by an API superuser for your realm and (2) being sent to a
        # mirrored stream.
        #
        # The most important security checks are in
        # `create_mirrored_message_users` below, which checks the
        # same-realm constraint.
        if "sender" not in request.POST:
            return json_error(_("Missing sender"))
        if message_type_name != "private" and not can_forge_sender:
            return json_error(_("User not authorized for this query"))

        # For now, mirroring only works with recipient emails, not for
        # recipient user IDs.
        if not all(isinstance(to_item, str) for to_item in message_to):
            return json_error(_("Mirroring not allowed with recipient user IDs"))

        # We need this manual cast so that mypy doesn't complain about
        # create_mirrored_message_users not being able to accept a Sequence[int]
        # type parameter.
        message_to = cast(Sequence[str], message_to)

        try:
            mirror_sender = create_mirrored_message_users(request, user_profile, message_to)
        except InvalidMirrorInput:
            return json_error(_("Invalid mirrored message"))

        if client.name == "zephyr_mirror" and not user_profile.realm.is_zephyr_mirror_realm:
            return json_error(_("Zephyr mirroring is not allowed in this organization"))
        sender = mirror_sender
    else:
        if "sender" in request.POST:
            return json_error(_("Invalid mirrored message"))
        sender = user_profile

    if (delivery_type == 'send_later' or delivery_type == 'remind') and defer_until is None:
        return json_error(_("Missing deliver_at in a request for delayed message delivery"))

    if (delivery_type == 'send_later' or delivery_type == 'remind') and defer_until is not None:
        return handle_deferred_message(sender, client, message_type_name,
                                       message_to, topic_name, message_content,
                                       delivery_type, defer_until, tz_guess,
                                       forwarder_user_profile=user_profile,
                                       realm=realm)

    ret = check_send_message(sender, client, message_type_name, message_to,
                             topic_name, message_content, forged=forged,
                             forged_timestamp = request.POST.get('time'),
                             forwarder_user_profile=user_profile, realm=realm,
                             local_id=local_id, sender_queue_id=queue_id,
                             widget_content=widget_content)
    return json_success({"id": ret})

@has_request_variables
def zcommand_backend(request: HttpRequest, user_profile: UserProfile,
                     command: str=REQ('command')) -> HttpResponse:
    return json_success(process_zcommands(command, user_profile))

@has_request_variables
def render_message_backend(request: HttpRequest, user_profile: UserProfile,
                           content: str=REQ()) -> HttpResponse:
    message = Message()
    message.sender = user_profile
    message.content = content
    message.sending_client = request.client

    rendered_content = render_markdown(message, content, realm=user_profile.realm)
    return json_success({"rendered": rendered_content})
