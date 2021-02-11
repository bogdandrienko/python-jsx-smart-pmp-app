from typing import Callable

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from confirmation.models import Confirmation, ConfirmationKeyException, get_object_from_key
from zerver.context_processors import common_context
from zerver.lib.actions import do_change_notification_settings
from zerver.lib.send_email import clear_scheduled_emails
from zerver.models import ScheduledEmail, UserProfile


def process_unsubscribe(request: HttpRequest, confirmation_key: str, subscription_type: str,
                        unsubscribe_function: Callable[[UserProfile], None]) -> HttpResponse:
    try:
        user_profile = get_object_from_key(confirmation_key, Confirmation.UNSUBSCRIBE)
    except ConfirmationKeyException:
        return render(request, 'zerver/unsubscribe_link_error.html')

    unsubscribe_function(user_profile)
    context = common_context(user_profile)
    context.update(subscription_type=subscription_type)
    return render(request, 'zerver/unsubscribe_success.html', context=context)

# Email unsubscribe functions. All have the function signature
# processor(user_profile).

def do_missedmessage_unsubscribe(user_profile: UserProfile) -> None:
    do_change_notification_settings(user_profile, 'enable_offline_email_notifications', False, acting_user=user_profile)

def do_welcome_unsubscribe(user_profile: UserProfile) -> None:
    clear_scheduled_emails([user_profile.id], ScheduledEmail.WELCOME)

def do_digest_unsubscribe(user_profile: UserProfile) -> None:
    do_change_notification_settings(user_profile, 'enable_digest_emails', False, acting_user=user_profile)

def do_login_unsubscribe(user_profile: UserProfile) -> None:
    do_change_notification_settings(user_profile, 'enable_login_emails', False, acting_user=user_profile)

# The keys are part of the URL for the unsubscribe link and must be valid
# without encoding.
# The values are a tuple of (display name, unsubscribe function), where the
# display name is what we call this class of email in user-visible text.
email_unsubscribers = {
    "missed_messages": ("missed messages", do_missedmessage_unsubscribe),
    "welcome": ("welcome", do_welcome_unsubscribe),
    "digest": ("digest", do_digest_unsubscribe),
    "login": ("login", do_login_unsubscribe),
}

# Login NOT required. These are for one-click unsubscribes.
def email_unsubscribe(request: HttpRequest, email_type: str,
                      confirmation_key: str) -> HttpResponse:
    if email_type in email_unsubscribers:
        display_name, unsubscribe_function = email_unsubscribers[email_type]
        return process_unsubscribe(request, confirmation_key, display_name, unsubscribe_function)

    return render(request, 'zerver/unsubscribe_link_error.html')
