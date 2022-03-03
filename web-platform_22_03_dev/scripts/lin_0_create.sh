# ubuntu (20.04.04)
########################################################################################################################
if system on VirtualBox:
  "insert guest additions"
  sudo adduser bogdan vboxsf

sudo apt-get update -y
sudo apt upgrade -y
sudo apt -y install build-essential python3-dev python3-pip python3-venv libpq-dev gunicorn nginx unixodbc-dev htop postgresql postgresql-contrib
sudo usermod -aG bogdan www-data
# sudo usermod -aG sudo bogdan
SETUP IP CONFIGS
sudo reboot

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
...
DEBUG = False
ALLOWED_HOSTS = ["*"]
...
</file>
#python manage.py check --database default
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
# python manage.py createsuperuser
# python manage.py runserver 0.0.0.0:8000
# gunicorn --bind 0.0.0.0:8000 backend.wsgi

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
ExecStart=/home/bogdan/web/env/bin/gunicorn --workers 3 --bind unix:/run/gunicorn.sock backend.wsgi:application
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
# systemctl status gunicorn.service
# sudo systemctl disable gunicorn
# sudo systemctl stop gunicorn

# NGINX
########################################################################################################################

# for web.km.kz:88 => 192.168.1.111:88
# for web.km.kz:80 => 192.168.1.157:80
# for web.km.kz:443 => 192.168.1.157:443
# for web.km.kz:8000 => 192.168.1.157:8000

# sudo rm /etc/nginx/sites-enabled/web.km.kz.conf # Удалить файл в папке
sudo nano /etc/nginx/sites-available/web.km.kz.conf
<file>
server {
listen 127.0.0.1:8000;
listen 8000;
listen [::]:8000;

server_name 89.218.132.130 www.web.km.kz web.km.kz localhost;

root /home/bogdan/web;

location /.well-known {
    alias /home/bogdan/web/letsencrypt/;

    expires max;
}

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
    include proxy_params;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_buffering off;
    proxy_pass http://unix:/run/gunicorn.sock;
}
}
</file>


sudo ln -s /etc/nginx/sites-available/web.km.kz.conf /etc/nginx/sites-enabled/
sudo service nginx start
# sudo systemctl status nginx.service
sudo ufw allow 'Nginx Full'
sudo systemctl reload nginx.service
# sudo nginx -t

########################################################################################################################