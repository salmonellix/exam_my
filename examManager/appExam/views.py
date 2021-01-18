from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import filters, mixins

# Create your views here.
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import api_view
from .serializers import ExamSerializer
from .models import Exam
from .serializers import StudentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from rest_framework import generics
from .serializers import GradeSerializer
from .models import Grade
from django.views.generic import ListView, CreateView, UpdateView
# from django.urls import reverse_lazy


# class ExamViewSet(GenericViewSet,  # generic view functionality
#                      CreateModelMixin,  # handles POSTs
#                      RetrieveModelMixin,  # handles GETs for 1 Company
#                      UpdateModelMixin,  # handles PUTs and PATCHes
#                      ListModelMixin):
class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all().order_by('id_exam')
    serializer_class = ExamSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['description', 'title']


    def destroy(self, request, *args, **kwargs):
        exam = self.get_object()
        rid = exam.id_exam
        grades = Grade.objects.filter(exam_id=rid)
        if not grades:
            exam.delete()
            return Response('Item succsesfully delete!')
        else:
            return Response('Cant delete!')

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('username')
    serializer_class = StudentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']


class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all().order_by('grade_number')
    serializer_class = GradeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['exam_id']



