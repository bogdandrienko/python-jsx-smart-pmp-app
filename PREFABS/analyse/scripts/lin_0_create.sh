# ubuntu (20.04.04)
########################################################################################################################

Install full and clean ubuntu (Virtual Machine or desktop)

Install updates for system: 'sudo apt-get update -y', 'sudo apt upgrade -y'

if system on VirtualBox == install 'insert guest additions', and 'sudo adduser bogdan vboxsf', and 'sudo reboot'

# Postgre SQL
########################################################################################################################

sudo apt -y install postgresql postgresql-contrib

sudo su - postgres

psql

postgres=# CREATE ROLE dbuser WITH LOGIN;

postgres=# ALTER ROLE dbuser SET client_encoding TO 'utf8';
postgres=# ALTER ROLE dbuser SET default_transaction_isolation TO 'read committed';
postgres=# ALTER ROLE dbuser SET timezone TO 'UTC';

postgres=# CREATE DATABASE dbname;

postgres=# GRANT ALL PRIVILEGES ON DATABASE dbname TO dbuser;

postgres=# \q
exit

sudo apt -y install build-essential python3-dev python3-pip python3-venv libpq-dev gunicorn nginx unixodbc-dev htop
sudo usermod -aG bogdan www-data

# DJANGO PROJECT
########################################################################################################################

cd ~

mkdir web

cd web

python3 -m venv env

source env/bin/activate

pip install --upgrade pip

pip install wheel

pip install Django gunicorn psycopg2 pyodbc django-cors-headers Pillow

pip install -r requirements.txt

django-admin startproject backend .

# DJANGO SETTINGS
########################################################################################################################

nano backend/settings.py
<file>
DEBUG = False
ALLOWED_HOSTS = ["*"]
CORS_ALLOW_ALL_ORIGINS = True
</file>

#python manage.py check --database default
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
ExecStart=/home/bogdan/web/env/bin/gunicorn --workers 5 --bind 127.0.0.1:8000 backend.wsgi
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true

[Install]
WantedBy=multi-user.target
</file>

sudo systemctl daemon-reload
sudo systemctl enable --now gunicorn-example.service
# systemctl status gunicorn-example.service

# NGINX
########################################################################################################################

sudo nano /etc/nginx/sites-available/example-http.conf
<file>
server {
# for web.km.kz:88 => 192.168.1.111:88
# for web.km.kz:80 => 192.168.1.157:80
# for web.km.kz:443 => 192.168.1.157:443
listen 80;
listen [::]:80
};

# server_name 192.168.1.111;
# server_name 192.168.1.157;
server_name web.km.kz;

location /static/ {
    alias /home/bogdan/web/static/;

    expires max;
}

location /media/ {
    alias /home/bogdan/web/static/media/;

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
# sudo nginx -t
sudo systemctl reload nginx.service

########################################################################################################################

sudo mv /etc/nginx/sites-available/example-http.conf /etc/nginx/sites-available/example-https.conf

sudo nano /etc/nginx/sites-available/example-http.conf

<file>
server {
listen 80;
listen [::]:80;

server_name web.km.kz;

root /home/bogdan/web;

location / {
    return 301 https://$server_name$request_uri;
}

location /.well-known/acme-challenge/ {}
}
</file>

########################################################################################################################

sudo certbot certonly --webroot -w /home/bogdan/web -d web.km.kz -m bogdandrienko@gmail.com --agree-tos

sudo nano /etc/nginx/sites-available/example-https.conf
<file>
listen 443 ssl http2;
listen [::]:443 ssl http2;

ssl_certificate /home/bogdan/web/letsencrypt/Certificate.crt;
ssl_certificate_key /home/bogdan/web/letsencrypt/Certificate.key;

ssl_session_timeout 1d;
ssl_session_cache shared:MozSSL:10m;

ssl_dhparam /etc/nginx/dhparam.pem;

ssl_protocols TLSv1.2;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;

ssl_stapling on;
ssl_stapling_verify on;

ssl_trusted_certificate /home/bogdan/web/letsencrypt/lets.pem;

resolver 1.1.1.1;
</file>

sudo ln -s /etc/nginx/sites-available/example-https.conf /etc/nginx/sites-enabled/example-https.conf
# sudo nginx -t
sudo systemctl reload nginx.service
