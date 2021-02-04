#!/bin/sh

cd ../

sudo apt-get update -y

sudo apt upgrade -y

sudo apt install python3-pip -y

sudo apt-get install python3-venv -y

python3 -m venv lin_env

source lin_env/bin/activate

pip install --upgrade pip

pip install -r requirements_lin.txt