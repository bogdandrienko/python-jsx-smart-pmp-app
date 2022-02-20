import os
import re
from typing import Optional, Tuple

import orjson
from django.utils.translation import ugettext as _

from zerver.lib.exceptions import OrganizationAdministratorRequired
from zerver.lib.request import JsonableError
from zerver.lib.storage import static_path
from zerver.lib.upload import upload_backend
from zerver.models import Reaction, Realm, RealmEmoji, UserProfile

emoji_codes_path = static_path("generated/emoji/emoji_codes.json")
if not os.path.exists(emoji_codes_path):  # nocoverage
    # During the collectstatic step of build-release-tarball,
    # prod-static/serve/generated/emoji won't exist yet.
    emoji_codes_path = os.path.join(
        os.path.dirname(__file__),
        "../../static/generated/emoji/emoji_codes.json",
    )

with open(emoji_codes_path, "rb") as fp:
    emoji_codes = orjson.loads(fp.read())

name_to_codepoint = emoji_codes["name_to_codepoint"]
codepoint_to_name = emoji_codes["codepoint_to_name"]
EMOTICON_CONVERSIONS = emoji_codes["emoticon_conversions"]

possible_emoticons = EMOTICON_CONVERSIONS.keys()
possible_emoticon_regexes = (re.escape(emoticon) for emoticon in possible_emoticons)
terminal_symbols = ',.;?!()\\[\\] "\'\\n\\t'  # from composebox_typeahead.js
emoticon_regex = (f'(?<![^{terminal_symbols}])(?P<emoticon>('
                  + ')|('.join(possible_emoticon_regexes)
                  + f'))(?![^{terminal_symbols}])')

# Translates emoticons to their colon syntax, e.g. `:smiley:`.
def translate_emoticons(text: str) -> str:
    translated = text

    for emoticon in EMOTICON_CONVERSIONS:
        translated = re.sub(re.escape(emoticon), EMOTICON_CONVERSIONS[emoticon], translated)

    return translated

def emoji_name_to_emoji_code(realm: Realm, emoji_name: str) -> Tuple[str, str]:
    realm_emojis = realm.get_active_emoji()
    realm_emoji = realm_emojis.get(emoji_name)
    if realm_emoji is not None:
        return str(realm_emojis[emoji_name]['id']), Reaction.REALM_EMOJI
    if emoji_name == 'zulip':
        return emoji_name, Reaction.ZULIP_EXTRA_EMOJI
    if emoji_name in name_to_codepoint:
        return name_to_codepoint[emoji_name], Reaction.UNICODE_EMOJI
    raise JsonableError(_("Emoji '{}' does not exist").format(emoji_name))

def check_emoji_request(realm: Realm, emoji_name: str, emoji_code: str,
                        emoji_type: str) -> None:
    # For a given realm and emoji type, checks whether an emoji
    # code is valid for new reactions, or not.
    if emoji_type == "realm_emoji":
        realm_emojis = realm.get_emoji()
        realm_emoji = realm_emojis.get(emoji_code)
        if realm_emoji is None:
            raise JsonableError(_("Invalid custom emoji."))
        if realm_emoji["name"] != emoji_name:
            raise JsonableError(_("Invalid custom emoji name."))
        if realm_emoji["deactivated"]:
            raise JsonableError(_("This custom emoji has been deactivated."))
    elif emoji_type == "zulip_extra_emoji":
        if emoji_code not in ["zulip"]:
            raise JsonableError(_("Invalid emoji code."))
        if emoji_name != emoji_code:
            raise JsonableError(_("Invalid emoji name."))
    elif emoji_type == "unicode_emoji":
        if emoji_code not in codepoint_to_name:
            raise JsonableError(_("Invalid emoji code."))
        if name_to_codepoint.get(emoji_name) != emoji_code:
            raise JsonableError(_("Invalid emoji name."))
    else:
        # The above are the only valid emoji types
        raise JsonableError(_("Invalid emoji type."))

def check_emoji_admin(user_profile: UserProfile, emoji_name: Optional[str]=None) -> None:
    """Raises an exception if the user cannot administer the target realm
    emoji name in their organization."""

    # Realm administrators can always administer emoji
    if user_profile.is_realm_admin:
        return
    if user_profile.realm.add_emoji_by_admins_only:
        raise OrganizationAdministratorRequired()

    # Otherwise, normal users can add emoji
    if emoji_name is None:
        return

    # Additionally, normal users can remove emoji they themselves added
    emoji = RealmEmoji.objects.filter(realm=user_profile.realm,
                                      name=emoji_name,
                                      deactivated=False).first()
    current_user_is_author = (emoji is not None and
                              emoji.author is not None and
                              emoji.author.id == user_profile.id)
    if not user_profile.is_realm_admin and not current_user_is_author:
        raise JsonableError(_("Must be an organization administrator or emoji author"))

def check_valid_emoji_name(emoji_name: str) -> None:
    if emoji_name:
        if re.match(r'^[0-9a-z.\-_]+(?<![.\-_])$', emoji_name):
            return
        raise JsonableError(_("Invalid characters in emoji name"))
    raise JsonableError(_("Emoji name is missing"))

def get_emoji_url(emoji_file_name: str, realm_id: int) -> str:
    return upload_backend.get_emoji_url(emoji_file_name, realm_id)


def get_emoji_file_name(emoji_file_name: str, emoji_id: int) -> str:
    _, image_ext = os.path.splitext(emoji_file_name)
    return ''.join((str(emoji_id), image_ext))
