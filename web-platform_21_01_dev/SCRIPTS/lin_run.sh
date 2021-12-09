cd ../

source lin_env/bin/activate

echo -n "enter host and port value (default - '192.168.1.62:8000') : "
read var_1

if [[ $var_1 == "" ]]
then
python manage.py runserver 192.168.1.62:8000
else
python manage.py runserver $var_1
fi