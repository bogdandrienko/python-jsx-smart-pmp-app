#!/bin/sh

sudo apt-get update -y

sudo apt upgrade -y

sudo apt install python3-pip -y

sudo apt-get install python3-venv -y

cd ../



source env/bin/activate

python -m pip install --upgrade pip



sh