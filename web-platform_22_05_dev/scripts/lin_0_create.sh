# ubuntu (20.04.04)
########################################################################################################################
if system on VirtualBox:
  "insert guest additions"
  sudo adduser bogdan vboxsf

sudo apt-get update -y
sudo apt upgrade -y
sudo apt install openssh-server
sudo systemctl start ssh
sudo systemctl enable ssh
###########
sudo apt -y install build-essential python3-dev python3-pip python3-venv libpq-dev gunicorn nginx unixodbc-dev htop postgresql postgresql-contrib net-tools git
sudo snap install --classic certbot
sudo snap install gh
sudo usermod -aG bogdan www-data
# sudo usermod -aG sudo bogdan
# SETUP IP CONFIGS
sudo reboot

# sudo ufw enable
# sudo ufw disable
# sudo ufw reset
# sudo ufw default deny incoming
# sudo ufw default allow outgoing

# sudo iptables -L
# sudo iptables -F

# sudo rm /etc/nginx/sites-enabled/web-km-kz-http.conf # Удалить файл в папке

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
django-admin startproject backend_settings .

# DJANGO SETTINGS
########################################################################################################################

nano backend_settings/settings.py
<file>
...
DEBUG = False
ALLOWED_HOSTS = ["*"]
...
</file>
#python manage.py check --database default
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
# python manage.py createsuperuser --username bogdan --email bogdandrienko@gmail.com
# python manage.py runserver 0.0.0.0:8000
# gunicorn --bind 0.0.0.0:8000 backend_settings.wsgi

# GUNICORN
########################################################################################################################

sudo nano /etc/systemd/system/gunicorn.socket
<file>
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
</file>


sudo nano /etc/systemd/system/gunicorn.service
<file>
[Unit]
Description=Gunicorn for the Django example project
Requires=gunicorn.socket
After=network.target

[Service]
Type=notify

User=bogdan
Group=www-data

RuntimeDirectory=gunicorn
WorkingDirectory=/home/bogdan/web
ExecStart=/home/bogdan/web/env/bin/gunicorn --workers 5 --bind unix:/run/gunicorn.sock backend.wsgi:application
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true

[Install]
WantedBy=multi-user.target
</file>
sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl enable --now gunicorn.service
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
# sudo systemctl status gunicorn.service
# sudo systemctl disable gunicorn
# sudo systemctl stop gunicorn

# NGINX
########################################################################################################################

# for web.km.kz:80 => 192.168.1.157:80 # Http
# for web.km.kz:443 => 192.168.1.157:443 # Https

# for web.km.kz:88 => 192.168.1.111:88 # Test
# for web.km.kz:8000 => 192.168.1.68:8000 # Development

sudo nano /etc/nginx/sites-available/web-km-kz-http.conf
<file>
server {
listen 80;
listen [::]:80;

server_name web.km.kz www.web.km.kz;

root /home/bogdan/web;

location /.well-known/acme-challenge/ {}

location /favicon.ico {
    alias /home/bogdan/web/static/logo.png;

    access_log off; log_not_found off;

    expires max;
}

location /robots.txt {
    alias /home/bogdan/web/static/robots.txt;

    access_log off; log_not_found off;

    expires max;
}

location /static/ {
    alias /home/bogdan/web/static/;

    expires max;
}

location /media/ {
    alias /home/bogdan/web/static/media/;

    expires max;
}

location / {
#    include proxy_params;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_buffering off;
    proxy_pass http://unix:/run/gunicorn.sock;
}
}
</file>


sudo ln -s /etc/nginx/sites-available/web-km-kz-http.conf /etc/nginx/sites-enabled/web-km-kz-http.conf
sudo service nginx start
# sudo systemctl status nginx.service
sudo ufw allow 'Nginx Full'
sudo systemctl reload nginx.service
# sudo nginx -t

########################################################################################################################

sudo mv /etc/nginx/sites-available/web-km-kz-http.conf /etc/nginx/sites-available/web.km.kz-https.conf

sudo nano /etc/nginx/sites-available/web-km-kz-http.conf
<file>
server {
listen 80;
listen [::]:80;

server_name web.km.kz www.web.km.kz;

root /home/bogdan/web;

location /.well-known/acme-challenge/ {}

location / {
    return 301 https://$server_name$request_uri;
}
}
</file>

sudo certbot certonly --webroot -w /home/bogdan/web -d web.km.kz -m bogdandrienko@gmail.com --agree-tos
sudo openssl dhparam -out /etc/nginx/dhparam.pem 2048

sudo nano /etc/nginx/sites-available/web-km-kz-https.conf
<file>
server {
listen 443 ssl http2;
listen [::]:443 ssl http2;

ssl_certificate /etc/letsencrypt/live/web.km.kz/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/web.km.kz/privkey.pem;

ssl_session_timeout 1d;
ssl_session_cache shared:MozSSL:10m;

ssl_dhparam /etc/nginx/dhparam.pem;

ssl_protocols TLSv1.2;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;

ssl_stapling on;
ssl_stapling_verify on;

ssl_trusted_certificate /etc/letsencrypt/live/web.km.kz/chain.pem;

resolver 1.1.1.1;

client_max_body_size 30M;

server_name web.km.kz www.web.km.kz;

root /home/bogdan/web;

location /.well-known/acme-challenge/ {}

location /favicon.ico {
    alias /home/bogdan/web/static/logo.png;

    access_log off; log_not_found off;

    expires max;
}

location /robots.txt {
    alias /home/bogdan/web/static/robots.txt;

    access_log off; log_not_found off;

    expires max;
}

location /static/ {
    alias /home/bogdan/web/static/;

    expires max;
}

location /media/ {
    alias /home/bogdan/web/static/media/;

    expires max;
}

location / {
#    include proxy_params;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_buffering off;
    proxy_pass http://unix:/run/gunicorn.sock;
}
}
</file>

sudo ln -s /etc/nginx/sites-available/web-km-kz-https.conf /etc/nginx/sites-enabled/web-km-kz-https.conf
sudo service nginx start
# sudo systemctl status nginx.service
sudo ufw allow 'Nginx Full'
sudo systemctl reload nginx.service
# sudo nginx -t

########################################################################################################################

sudo systemctl list-timers | grep 'certbot\|ACTIVATES'
sudo nano /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
<file>
#!/bin/bash
/usr/bin/systemctl reload nginx.service
sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
sudo certbot renew --dry-run
</file>

########################################################################################################################
