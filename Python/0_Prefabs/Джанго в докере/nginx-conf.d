upstream app {
    server django:8000;
}

server {

    listen 80;
    server_name test.world-itech.ru;

    location / {
        proxy_pass http://app;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

    location /staticfiles/ {
     alias /var/www/html/staticfiles/;
    }

}