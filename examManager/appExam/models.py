from django.db import models
from django.db.models import Q
import uuid

from appExam import fields
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet


# def get_uploaded_filename(instance, filename):
#
#     extension = filename.split(".")[-1]
#     return "{}.{}".format(uuid.uuid4(), extension)


class Teacher(models.Model):
    username = models.CharField(max_length=20)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    id_user = models.IntegerField(blank=True)

    def __str__(self):
        return self.username


class Student(models.Model):
    username = models.CharField(max_length=20)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    id_user = models.IntegerField(blank=True)

    def __str__(self):
        return self.username

    def exams(self):
        return Exam.objects.filter(Q(student_id=self.id_user))

    def grades(self):
        return Grade.objects.filter(Q(student_id=self.id_user))




class Exam(models.Model):
    id_exam = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    description = models.CharField(max_length=400, blank=True, default='')
    location = models.CharField(max_length=1000, blank=True, default='8000')
    student_id = models.ManyToManyField(Student, blank=True, default='')
    file_uploaded = models.FileField(upload_to='file_uploaded', max_length=100, blank=True)

    # def __unicode__(self):
    #     return self.title

    def __str__(self):
        return self.title

    def students(self):
        return Student.objects.filter(Q(student_id=self.student_id))


class Grade(models.Model):
    grade_number = fields.IntegerRangeField(min_value=1, max_value=10)
    exam_id = models.ForeignKey(Exam, on_delete=models.CASCADE)
    student_id = models.ManyToManyField(Student, blank=True, default='')

    def __str__(self):
        return str(self.grade_number)

    # def __int__(self):
    #     return 'Exam:' + str(self.exam_id) + ' student: ' + str(self.student_id)

    def get_grade(self):
        return self.grade_number
