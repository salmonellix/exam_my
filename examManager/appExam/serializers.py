from abc import ABC

from rest_framework import serializers
from rest_framework.serializers import Serializer, FileField, ListField

from .models import Exam, Student, Grade, Teacher



class ExamSerializer(serializers.ModelSerializer):
    file_uploaded = FileField()

    class Meta:
        model = Exam
        fields = ['id_exam', 'date', 'title', 'description', 'location', 'student_id', 'file_uploaded']


class StudentSerializer(serializers.ModelSerializer):
    # url = serializers.HyperlinkedIdentityField(view_name="css/student-detail")
    class Meta:
        model = Student
        fields = ['username', 'first_name', 'last_name', 'email', 'url']


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['grade_number', 'exam_id', 'student_id']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        max_length=100,
        style={'placeholder': 'Email', 'autofocus': True}
    )
    password = serializers.CharField(
        max_length=100,
        style={'input_type': 'password', 'placeholder': 'Password'}
    )
    remember_me = serializers.BooleanField()
