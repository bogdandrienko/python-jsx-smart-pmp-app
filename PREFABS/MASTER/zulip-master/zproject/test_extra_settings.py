import os
from typing import Dict, List, Tuple

import ldap
from django_auth_ldap.config import LDAPSearch

from zerver.lib.db import TimeTrackingConnection

from .config import DEPLOY_ROOT, get_from_file_if_exists
from .settings import (
    AUTHENTICATION_BACKENDS,
    CACHES,
    DATABASES,
    EXTERNAL_HOST,
    LOCAL_DATABASE_PASSWORD,
    LOGGING,
    WEBPACK_LOADER,
)

FULL_STACK_ZULIP_TEST = "FULL_STACK_ZULIP_TEST" in os.environ
PUPPETEER_TESTS = "PUPPETEER_TESTS" in os.environ


FAKE_EMAIL_DOMAIN = "zulip.testserver"

# Clear out the REALM_HOSTS set in dev_settings.py
REALM_HOSTS: Dict[str, str] = {}

# Used to clone DBs in backend tests.
BACKEND_DATABASE_TEMPLATE = 'zulip_test_template'

DATABASES["default"] = {
    "NAME": os.getenv("ZULIP_DB_NAME", "zulip_test"),
    "USER": "zulip_test",
    "PASSWORD": LOCAL_DATABASE_PASSWORD,
    "HOST": "localhost",
    "SCHEMA": "zulip",
    "ENGINE": "django.db.backends.postgresql",
    "TEST_NAME": "django_zulip_tests",
    "OPTIONS": {"connection_factory": TimeTrackingConnection},
}


if FULL_STACK_ZULIP_TEST:
    TORNADO_PORTS = [9983]
else:
    # Backend tests don't use tornado
    USING_TORNADO = False
    CAMO_URI = 'https://external-content.zulipcdn.net/external_content/'
    CAMO_KEY = 'dummy'

if PUPPETEER_TESTS:
    # Disable search pills prototype for production use
    SEARCH_PILLS_ENABLED = False

if "RUNNING_OPENAPI_CURL_TEST" in os.environ:
    RUNNING_OPENAPI_CURL_TEST = True

if "GENERATE_STRIPE_FIXTURES" in os.environ:
    GENERATE_STRIPE_FIXTURES = True

if "BAN_CONSOLE_OUTPUT" in os.environ:
    BAN_CONSOLE_OUTPUT = True

# Decrease the get_updates timeout to 1 second.
# This allows frontend tests to proceed quickly to the next test step.
POLL_TIMEOUT = 1000

# Stores the messages in `django.core.mail.outbox` rather than sending them.
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

# The test suite uses EmailAuthBackend
AUTHENTICATION_BACKENDS += ('zproject.backends.EmailAuthBackend',)

# Configure Google OAuth2
GOOGLE_OAUTH2_CLIENT_ID = "test_client_id"

# Makes testing LDAP backend require less mocking
AUTH_LDAP_ALWAYS_UPDATE_USER = False
AUTH_LDAP_USER_SEARCH = LDAPSearch("ou=users,dc=zulip,dc=com",
                                   ldap.SCOPE_ONELEVEL, "(uid=%(user)s)")
AUTH_LDAP_USERNAME_ATTR = "uid"
AUTH_LDAP_REVERSE_EMAIL_SEARCH = LDAPSearch("ou=users,dc=zulip,dc=com",
                                            ldap.SCOPE_ONELEVEL,
                                            "(mail=%(email)s)")

TEST_SUITE = True
RATE_LIMITING = False
RATE_LIMITING_AUTHENTICATE = False
# Don't use RabbitMQ from the test suite -- the user_profile_ids for
# any generated queue elements won't match those being used by the
# real app.
USING_RABBITMQ = False

# Disable the tutorial because it confuses the client tests.
TUTORIAL_ENABLED = False

# Disable use of memcached for caching
CACHES['database'] = {
    'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    'LOCATION': 'zulip-database-test-cache',
    'TIMEOUT': 3600,
    'CONN_MAX_AGE': 600,
    'OPTIONS': {
        'MAX_ENTRIES': 100000,
    },
}

# Disable caching on sessions to make query counts consistent
SESSION_ENGINE = "django.contrib.sessions.backends.db"

# Use production config from Webpack in tests
if PUPPETEER_TESTS:
    WEBPACK_FILE = 'webpack-stats-production.json'
else:
    WEBPACK_FILE = os.path.join('var', 'webpack-stats-test.json')
WEBPACK_LOADER['DEFAULT']['BUNDLE_DIR_NAME'] = 'webpack-bundles/'
WEBPACK_LOADER['DEFAULT']['STATS_FILE'] = os.path.join(DEPLOY_ROOT, WEBPACK_FILE)

# Don't auto-restart Tornado server during automated tests
AUTORELOAD = False

if not PUPPETEER_TESTS:
    # Use local memory cache for backend tests.
    CACHES['default'] = {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }

    # This logger is used only for automated tests validating the
    # error-handling behavior of the zulip_admins handler.
    LOGGING['loggers']['zulip.test_zulip_admins_handler'] = {
        'handlers': ['zulip_admins'],
        'propagate': False,
    }

    # Here we set various loggers to be less noisy for unit tests.
    def set_loglevel(logger_name: str, level: str) -> None:
        LOGGING['loggers'].setdefault(logger_name, {})['level'] = level
    set_loglevel('zulip.requests', 'CRITICAL')
    set_loglevel('zulip.management', 'CRITICAL')
    set_loglevel('django.request', 'ERROR')
    set_loglevel('django_auth_ldap', 'WARNING')
    set_loglevel('fakeldap', 'ERROR')
    set_loglevel('zulip.send_email', 'ERROR')
    set_loglevel('zerver.lib.push_notifications', 'WARNING')
    set_loglevel('zerver.lib.digest', 'ERROR')
    set_loglevel('zerver.lib.email_mirror', 'ERROR')
    set_loglevel('zerver.worker.queue_processors', 'WARNING')
    set_loglevel('stripe', 'WARNING')

# Enable file:/// hyperlink support by default in tests
ENABLE_FILE_LINKS = True

# These settings are set dynamically in `zerver/lib/test_runner.py`:
TEST_WORKER_DIR = ''
# Allow setting LOCAL_UPLOADS_DIR in the environment so that the
# frontend/API tests in test_server.py can control this.
if "LOCAL_UPLOADS_DIR" in os.environ:
    LOCAL_UPLOADS_DIR = os.getenv("LOCAL_UPLOADS_DIR")
# Otherwise, we use the default value from dev_settings.py

S3_KEY = 'test-key'
S3_SECRET_KEY = 'test-secret-key'
S3_AUTH_UPLOADS_BUCKET = 'test-authed-bucket'
S3_AVATAR_BUCKET = 'test-avatar-bucket'

INLINE_URL_EMBED_PREVIEW = False

HOME_NOT_LOGGED_IN = '/login/'
LOGIN_URL = '/accounts/login/'

# By default will not send emails when login occurs.
# Explicitly set this to True within tests that must have this on.
SEND_LOGIN_EMAILS = False

GOOGLE_OAUTH2_CLIENT_ID = "id"
GOOGLE_OAUTH2_CLIENT_SECRET = "secret"

SOCIAL_AUTH_GITHUB_KEY = "key"
SOCIAL_AUTH_GITHUB_SECRET = "secret"
SOCIAL_AUTH_GITLAB_KEY = "key"
SOCIAL_AUTH_GITLAB_SECRET = "secret"
SOCIAL_AUTH_GOOGLE_KEY = "key"
SOCIAL_AUTH_GOOGLE_SECRET = "secret"
SOCIAL_AUTH_SUBDOMAIN = 'auth'
SOCIAL_AUTH_APPLE_SERVICES_ID = 'com.zulip.chat'
SOCIAL_AUTH_APPLE_APP_ID = 'com.zulip.bundle.id'
SOCIAL_AUTH_APPLE_CLIENT = 'com.zulip.chat'
SOCIAL_AUTH_APPLE_AUDIENCE = [SOCIAL_AUTH_APPLE_APP_ID, SOCIAL_AUTH_APPLE_SERVICES_ID]
SOCIAL_AUTH_APPLE_KEY = 'KEYISKEY'
SOCIAL_AUTH_APPLE_TEAM = 'TEAMSTRING'
SOCIAL_AUTH_APPLE_SECRET = get_from_file_if_exists("zerver/tests/fixtures/apple/private_key.pem")

APPLE_JWK = get_from_file_if_exists("zerver/tests/fixtures/apple/jwk")
APPLE_ID_TOKEN_GENERATION_KEY = get_from_file_if_exists("zerver/tests/fixtures/apple/token_gen_private_key")

VIDEO_ZOOM_CLIENT_ID = "client_id"
VIDEO_ZOOM_CLIENT_SECRET = "client_secret"

BIG_BLUE_BUTTON_SECRET = "123"
BIG_BLUE_BUTTON_URL = "https://bbb.example.com/bigbluebutton/"

# By default two factor authentication is disabled in tests.
# Explicitly set this to True within tests that must have this on.
TWO_FACTOR_AUTHENTICATION_ENABLED = False
PUSH_NOTIFICATION_BOUNCER_URL = None

THUMBOR_URL = 'http://127.0.0.1:9995'
THUMBNAIL_IMAGES = True
THUMBOR_SERVES_CAMO = True

# Logging the emails while running the tests adds them
# to /emails page.
DEVELOPMENT_LOG_EMAILS = False

SOCIAL_AUTH_SAML_SP_ENTITY_ID = 'http://' + EXTERNAL_HOST
SOCIAL_AUTH_SAML_SP_PUBLIC_CERT  = get_from_file_if_exists("zerver/tests/fixtures/saml/zulip.crt")
SOCIAL_AUTH_SAML_SP_PRIVATE_KEY = get_from_file_if_exists("zerver/tests/fixtures/saml/zulip.key")

SOCIAL_AUTH_SAML_ORG_INFO = {
    "en-US": {
        "name": "example",
        "displayname": "Example Inc.",
        "url": "{}{}".format('http://', EXTERNAL_HOST),
    },
}

SOCIAL_AUTH_SAML_TECHNICAL_CONTACT = {
    "givenName": "Tech Gal",
    "emailAddress": "technical@example.com",
}

SOCIAL_AUTH_SAML_SUPPORT_CONTACT = {
    "givenName": "Support Guy",
    "emailAddress": "support@example.com",
}

SOCIAL_AUTH_SAML_ENABLED_IDPS = {
    "test_idp": {
        "entity_id": "https://idp.testshib.org/idp/shibboleth",
        "url": "https://idp.testshib.org/idp/profile/SAML2/Redirect/SSO",
        "x509cert": get_from_file_if_exists("zerver/tests/fixtures/saml/idp.crt"),
        "attr_user_permanent_id": "email",
        "attr_first_name": "first_name",
        "attr_last_name": "last_name",
        "attr_username": "email",
        "attr_email": "email",
        "display_name": "Test IdP",
    },
}

RATE_LIMITING_RULES: Dict[str, List[Tuple[int, int]]] = {
    'api_by_user': [],
    'authenticate_by_username': [],
    'password_reset_form_by_email': [],
}

FREE_TRIAL_DAYS = None
