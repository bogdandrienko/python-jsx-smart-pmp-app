import os
import pwd
from typing import Optional, Set, Tuple

from scripts.lib.zulip_tools import deport

ZULIP_ADMINISTRATOR = "desdemona+admin@zulip.com"

# We want LOCAL_UPLOADS_DIR to be an absolute path so that code can
# chdir without having problems accessing it.  Unfortunately, this
# means we need a duplicate definition of DEPLOY_ROOT with the one in
# settings.py.
DEPLOY_ROOT = os.path.realpath(os.path.dirname(os.path.dirname(__file__)))
LOCAL_UPLOADS_DIR = os.path.join(DEPLOY_ROOT, 'var/uploads')

# We assume dev droplets are the only places where
# users use zulipdev as the user.
IS_DEV_DROPLET = pwd.getpwuid(os.getuid()).pw_name == 'zulipdev'

FORWARD_ADDRESS_CONFIG_FILE = "var/forward_address.ini"
# Check if test_settings.py set EXTERNAL_HOST.
external_host_env = os.getenv('EXTERNAL_HOST')
if external_host_env is None:
    if IS_DEV_DROPLET:
        # For our droplets, we use the hostname (eg github_username.zulipdev.org) by default.
        EXTERNAL_HOST = os.uname()[1].lower() + ":9991"
    else:
        # For local development environments, we use localhost by
        # default, via the "zulipdev.com" hostname.
        EXTERNAL_HOST = 'zulipdev.com:9991'
        # Serve the main dev realm at the literal name "localhost",
        # so it works out of the box even when not on the Internet.
        REALM_HOSTS = {
            'zulip': 'localhost:9991',
        }
else:
    EXTERNAL_HOST = external_host_env
    REALM_HOSTS = {
        'zulip': EXTERNAL_HOST,
    }

EXTERNAL_HOST_WITHOUT_PORT = deport(EXTERNAL_HOST)

FAKE_EMAIL_DOMAIN = "zulipdev.com"

ALLOWED_HOSTS = ['*']

# Uncomment extra backends if you want to test with them.  Note that
# for Google and GitHub auth you'll need to do some pre-setup.
AUTHENTICATION_BACKENDS: Tuple[str, ...] = (
    'zproject.backends.DevAuthBackend',
    'zproject.backends.EmailAuthBackend',
    'zproject.backends.GitHubAuthBackend',
    'zproject.backends.GoogleAuthBackend',
    'zproject.backends.SAMLAuthBackend',
    # 'zproject.backends.AzureADAuthBackend',
    'zproject.backends.GitLabAuthBackend',
    'zproject.backends.AppleAuthBackend',
)

EXTERNAL_URI_SCHEME = "http://"
EMAIL_GATEWAY_PATTERN = "%s@" + EXTERNAL_HOST_WITHOUT_PORT
NOTIFICATION_BOT = "notification-bot@zulip.com"
ERROR_BOT = "error-bot@zulip.com"
EMAIL_GATEWAY_BOT = "emailgateway@zulip.com"
PHYSICAL_ADDRESS = "Zulip Headquarters, 123 Octo Stream, South Pacific Ocean"
STAFF_SUBDOMAIN = "zulip"
EXTRA_INSTALLED_APPS = ["zilencer", "analytics", "corporate"]
# Disable Camo in development
CAMO_URI = ''

TORNADO_PORTS = [9993]

OPEN_REALM_CREATION = True
INVITES_MIN_USER_AGE_DAYS = 0

EMBEDDED_BOTS_ENABLED = True

SAVE_FRONTEND_STACKTRACES = True
STAGING_ERROR_NOTIFICATIONS = True

SYSTEM_ONLY_REALMS: Set[str] = set()
USING_PGROONGA = True
# Flush cache after migration.
POST_MIGRATION_CACHE_FLUSHING = True

# Don't require anything about password strength in development
PASSWORD_MIN_LENGTH = 0
PASSWORD_MIN_GUESSES = 0

# Two factor authentication: Use the fake backend for development.
TWO_FACTOR_CALL_GATEWAY = 'two_factor.gateways.fake.Fake'
TWO_FACTOR_SMS_GATEWAY = 'two_factor.gateways.fake.Fake'

# Make sendfile use django to serve files in development
SENDFILE_BACKEND = 'django_sendfile.backends.development'

# Set this True to send all hotspots in development
ALWAYS_SEND_ALL_HOTSPOTS = False

# FAKE_LDAP_MODE supports using a fake LDAP database in the
# development environment, without needing an LDAP server!
#
# Three modes are allowed, and each will setup Zulip and the fake LDAP
# database in a way appropriate for the corresponding mode described
# in https://zulip.readthedocs.io/en/latest/production/authentication-methods.html#ldap-including-active-directory
#   (A) If users' email addresses are in LDAP and used as username.
#   (B) If LDAP only has usernames but email addresses are of the form
#       username@example.com
#   (C) If LDAP usernames are completely unrelated to email addresses.
#
# Fake LDAP data has e.g. ("ldapuser1", "ldapuser1@zulip.com") for username/email.
FAKE_LDAP_MODE: Optional[str] = None
# FAKE_LDAP_NUM_USERS = 8

if FAKE_LDAP_MODE:
    import ldap
    from django_auth_ldap.config import LDAPSearch

    # To understand these parameters, read the docs in
    # prod_settings_template.py and on ReadTheDocs.
    LDAP_APPEND_DOMAIN = None
    AUTH_LDAP_USER_SEARCH = LDAPSearch("ou=users,dc=zulip,dc=com",
                                       ldap.SCOPE_ONELEVEL, "(uid=%(user)s)")
    AUTH_LDAP_REVERSE_EMAIL_SEARCH = LDAPSearch("ou=users,dc=zulip,dc=com",
                                                ldap.SCOPE_ONELEVEL, "(email=%(email)s)")

    if FAKE_LDAP_MODE == 'a':
        AUTH_LDAP_REVERSE_EMAIL_SEARCH = LDAPSearch("ou=users,dc=zulip,dc=com",
                                                    ldap.SCOPE_ONELEVEL, "(uid=%(email)s)")
        AUTH_LDAP_USERNAME_ATTR = "uid"
        AUTH_LDAP_USER_ATTR_MAP = {
            "full_name": "cn",
            "avatar": "thumbnailPhoto",
            # This won't do much unless one changes the fact that
            # all users have LDAP_USER_ACCOUNT_CONTROL_NORMAL in
            # zerver/lib/dev_ldap_directory.py
            "userAccountControl": "userAccountControl",
        }
    elif FAKE_LDAP_MODE == 'b':
        LDAP_APPEND_DOMAIN = 'zulip.com'
        AUTH_LDAP_USER_ATTR_MAP = {
            "full_name": "cn",
            "avatar": "jpegPhoto",
            "custom_profile_field__birthday": "birthDate",
            "custom_profile_field__phone_number": "phoneNumber",
        }
    elif FAKE_LDAP_MODE == 'c':
        AUTH_LDAP_USERNAME_ATTR = "uid"
        LDAP_EMAIL_ATTR = 'email'
        AUTH_LDAP_USER_ATTR_MAP = {
            "full_name": "cn",
        }
    AUTHENTICATION_BACKENDS += ('zproject.backends.ZulipLDAPAuthBackend',)

THUMBOR_URL = 'http://127.0.0.1:9995'
THUMBNAIL_IMAGES = True

SEARCH_PILLS_ENABLED = bool(os.getenv('SEARCH_PILLS_ENABLED', False))

BILLING_ENABLED = True
LANDING_PAGE_NAVBAR_MESSAGE = None

# Test custom TOS template rendering
TERMS_OF_SERVICE = 'corporate/terms.md'

# Our run-dev.py proxy uses X-Forwarded-Port to communicate to Django
# that the request is actually on port 9991, not port 9992 (the Django
# server's own port); this setting tells Django to read that HTTP
# header.  Important for SAML authentication in the development
# environment.
USE_X_FORWARDED_PORT = True

# Override the default SAML entity ID
SOCIAL_AUTH_SAML_SP_ENTITY_ID = "http://localhost:9991"

MEMCACHED_USERNAME = None
