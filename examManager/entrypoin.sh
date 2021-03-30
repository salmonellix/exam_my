#!/bin/sh

python manage.py migrate  --no-input
python manage.py collatstatic --no-input

gunicorn exam_my.wsgi:application --bind 0.0.0.0:8000

