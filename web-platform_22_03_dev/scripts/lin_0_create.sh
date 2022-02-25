# ubuntu (20.04.04)
########################################################################################################################

Install full and clean ubuntu (Virtual Machine or desktop)

Install updates for system: 'sudo apt-get update -y', 'sudo apt upgrade -y'

if system on VirtualBox == install 'insert guest additions', and 'sudo adduser bogdan vboxsf', and reboot system

sudo apt -y install build-essential python3-dev python3-pip python3-venv libpq-dev gunicorn nginx unixodbc-dev htop

# DJANGO PROJECT
########################################################################################################################

cd ~

mkdir web

cd web

python3 -m venv env

source env/bin/activate

pip install --upgrade pip

pip install Django gunicorn wheel psycopg2 pyodbc django-cors-headers

pip install -r requirements.txt

django-admin startproject backend .

# DJANGO SETTINGS
########################################################################################################################

nano backend/settings.py

<file>
DEBUG = False

ALLOWED_HOSTS = ['192.168.1.83']
CORS_ALLOW_ALL_ORIGINS = True

INSTALLED_APPS = [
...
'corsheaders',
...
]

TEMPLATES = [
...
'DIRS': [BASE_DIR / 'templates'],
...
]

STATIC_URL = '/static/'
STATIC_ROOT = Path(BASE_DIR, 'staticroot/') # '/home/bogdan/web/staticroot/'
STATIC_DIR = Path(BASE_DIR, 'static')
STATICFILES_DIRS = [Path(BASE_DIR, 'static')]

MEDIA_URL = '/media/'
MEDIA_ROOT = Path(BASE_DIR, 'static/media')
</file>

python manage.py makemigrations

python manage.py migrate

python manage.py collectstatic

# python manage.py runserver 0.0.0.0:8000

# gunicorn --bind 0.0.0.0:8000 backend.wsgi

# GUNICORN
########################################################################################################################

sudo nano /etc/systemd/system/gunicorn-example.service

<file>
[Unit]
Description=Gunicorn for the Django example project
After=network.target

[Service]
Type=notify

User=bogdan
Group=bogdan

RuntimeDirectory=gunicorn_example
WorkingDirectory=/home/bogdan/web
ExecStart=/home/bogdan/web/env/bin/gunicorn --workers 5 --bind 127.0.0.1:8001 backend.wsgi
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true

[Install]
WantedBy=multi-user.target
</file>

sudo systemctl daemon-reload

sudo systemctl enable --now gunicorn-example.service

# NGINX
########################################################################################################################

sudo nano /etc/nginx/sites-available/example-http.conf

<file>
server {
listen 80;
listen [::]:80;

server_name 192.168.1.83;

location /static/ {
    alias /home/bogdan/web/staticroot/;

    expires max;
}

location /media/ {
    alias /home/bogdan/web/staticroot/media/;

    expires max;
}

location /env {
    return 444;
}

location / {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;

    proxy_redirect off;

    proxy_buffering off;

    proxy_pass http://127.0.0.1:8000;
}
}
</file>

sudo ln -s /etc/nginx/sites-available/example-http.conf /etc/nginx/sites-enabled/example-http.conf

sudo usermod -aG bogdan www-data

# sudo nginx -t

sudo systemctl reload nginx.service

########################################################################################################################
