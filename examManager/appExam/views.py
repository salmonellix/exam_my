from django.shortcuts import render
from rest_framework import filters

# Create your views here.
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ExamSerializer
from rest_framework.viewsets import ViewSet
from .models import Exam
from django.shortcuts import render
from rest_framework.renderers import TemplateHTMLRenderer
from .serializers import StudentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from rest_framework import generics
from .serializers import GradeSerializer
from .models import Grade


class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all().order_by('id_exam')
    serializer_class = ExamSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['description', 'title']




class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('username')
    serializer_class = StudentSerializer


class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all().order_by('grade_number')
    serializer_class = GradeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['exam_id']

