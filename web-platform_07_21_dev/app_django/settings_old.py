"""
Django settings for django_settings project.

Generated by 'django-admin startproject' using Django 3.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-j#x=z^##)btyj(d^6u+%*-e2*mrxa218k@ppk4fgztfpe_5g4-'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
HEROKU = False

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [

    # 'grappelli',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 'ckeditor',
    # 'ckeditor_uploader',
    #
    # 'corsheaders',

    'django_app.apps.DjangoAppConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'django_settings.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_settings.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

if not HEROKU:
    # Включить для DEVELOPMENT, отключить для PRODUCTION
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    # Включить для PRODUCTION, отключить для DEVELOPMENT
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'deinthsv9addbq',
            'HOST': 'ec2-52-50-171-4.eu-west-1.compute.amazonaws.com',
            'PORT': 5432,
            'USER': 'mayhqhjnyukmmh',
            'PASSWORD': '4e085cdc07df03952edd34624245b1a69894875064ca6795a977d8b0964bfdec'
        }
    }
    db_from_env = dj_database_url.config()

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Etc/GMT-6'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# django-corsheaders
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "http://192.168.0.109:8000",
    "http://localhost:8080",
    "http://127.0.0.1:8000",
]
# CORS_ALLOWED_ORIGIN_REGEXES = [
#     r"^https://\w+\.example\.com$",
# ]
CORS_URLS_REGEX = r'^.*$'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

if not HEROKU:
    # Включить для DEVELOPMENT, отключить для PRODUCTION
    STATIC_DIR = Path(BASE_DIR, 'static')
    STATICFILES_DIRS = [Path(BASE_DIR, 'static')]
else:
    # Включить для PRODUCTION, отключить для DEVELOPMENT
    STATIC_ROOT = Path(BASE_DIR, 'static/')
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = Path(BASE_DIR, 'static/media')

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
FROM_EMAIL = 'bogdandrienko@gmail.com'
EMAIL_ADMIN = 'bogdandrienko@gmail.com'
# send_mail('subject', 'message', settings.EMAIL_HOST_USER, ['andrienko.1997@list.ru'], fail_silently=False)


# yandex
EMAIL_HOST = 'smtp.yandex.ru'
EMAIL_HOST_USER = 'eevee.cycle'
EMAIL_HOST_PASSWORD = '31284bogdan'
EMAIL_PORT = 465
EMAIL_USE_TLS = False
EMAIL_USE_SSL = True

host: EMAIL_HOST
port: EMAIL_PORT
username: EMAIL_HOST_USER
password: EMAIL_HOST_PASSWORD
use_tls: EMAIL_USE_TLS
use_ssl: EMAIL_USE_SSL

CRISPY_TEMPLATE_PACK = 'bootstrap4'

CKEDITOR_UPLOAD_PATH = "uploads/ckeditor/"

CKEDITOR_CONFIGS = {
    'default': {

        # 'skin': 'kama',
        # 'skin': 'moono',
        # 'skin': 'moono-lisa',
        'skin': 'moonocolor',

        'toolbar_Basic': [
            ['Source', '-', 'Bold', 'Italic']
        ],
        'toolbar_YourCustomToolbarConfig': [
            {'name': 'document', 'items': ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates']},
            {'name': 'clipboard', 'items': ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
            {'name': 'editing', 'items': ['Find', 'Replace', '-', 'SelectAll']},
            {'name': 'forms',
             'items': ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                       'HiddenField']},
            '/',
            {'name': 'basicstyles',
             'items': ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
            {'name': 'paragraph',
             'items': ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-',
                       'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl',
                       'Language']},
            {'name': 'links', 'items': ['Link', 'Unlink', 'Anchor']},
            {'name': 'insert',
             'items': ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']},
            '/',
            {'name': 'styles', 'items': ['Styles', 'Format', 'Font', 'FontSize']},
            {'name': 'colors', 'items': ['TextColor', 'BGColor']},
            {'name': 'tools', 'items': ['Maximize', 'ShowBlocks']},
            {'name': 'about', 'items': ['About']},
            '/',
            {'name': 'yourcustomtools', 'items': [
                'Preview',
                'Maximize',
                'Youtube',
            ]},
        ],

        # 'toolbar': 'YourCustomToolbarConfig',
        'toolbar': 'full',

        # 'toolbarGroups': [{ 'name': 'document', 'groups': [ 'mode', 'document', 'doctools' ] }],
        # 'toolbarGroups': [
        # { 'name': 'document', 'groups': [ 'mode', 'document', 'doctools' ] },
        # { 'name': 'clipboard', 'groups': [ 'clipboard', 'undo' ] },
        # { 'name': 'editing', 'groups': [ 'find', 'selection', 'spellchecker', 'editing' ] },
        # { 'name': 'forms', 'groups': [ 'forms' ] },
        # '/',
        # { 'name': 'basicstyles', 'groups': [ 'basicstyles', 'cleanup' ] },
        # { 'name': 'paragraph', 'groups': [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        # { 'name': 'links', 'groups': [ 'links' ] },
        # { 'name': 'insert', 'groups': [ 'insert' ] },
        # '/',
        # { 'name': 'styles', 'groups': [ 'styles' ] },
        # { 'name': 'colors', 'groups': [ 'colors' ] },
        # { 'name': 'tools', 'groups': [ 'tools' ] },
        # { 'name': 'others', 'groups': [ 'others' ] },
        # { 'name': 'about', 'groups': [ 'about' ] }
        # ],

        'height': '75',
        'width': '100%',

        'toolbarCanCollapse': True,
        'tabSpaces': 4,

        'extraPlugins': ','.join([
            'uploadimage',
            'div',
            'autolink',
            'autoembed',
            'embedsemantic',
            'autogrow',
            # 'devtools',
            'widget',
            'lineutils',
            'clipboard',
            'dialog',
            'dialogui',
            'elementspath',
            'youtube',
        ]),
    }
}
