A Django RESTful Application project using Docker
===


Description
====
This is simple Django project that uses Django REST framework.
The main goal is to manage exams and student grades. The data can be manipulated either through an API using a client such as Postman or using a simple web app.


Run
====

Build and run:
```
    docker-compose up -d --build
```

Recreate the DB
```
    docker-compose exec web python manage.py makemigrations
    docker-compose exec web python manage.py migrate
    docker-compose exec web python manage.py createsuperuser
```
