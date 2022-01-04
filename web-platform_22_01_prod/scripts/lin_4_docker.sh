#! /bin/sh

cd ../

source env/bin/activate

pip install docker-compose

sudo docker-compose build

sudo docker-compose up