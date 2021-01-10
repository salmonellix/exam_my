from django.shortcuts import render
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from appExam.models import Exam
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
class ExamList(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'exams_list.html'

    def get(self, request):
        queryset = Exam.objects.all()
        return Response({'exams': queryset})


def exams(request):
    # renderer_classes = [TemplateHTMLRenderer]
    # template_name = 'exams_list.html'
    # queryset = Exam.objects.all()
    # return Response({'exams': queryset})
    return render(request, 'frontend/exams_list.html')

def home(request):
    return render(request, 'frontend/index.html')

def students(request):
    return render(request, 'frontend/students_list.html')

def grades(request):
    return render(request, 'frontend/grades_list.html')

def login_view(request):
    # username = request.POST['username']
    # password = request.POST['password']
    # user = authenticate(request, username=username, password=password)
    # if user is not None:
    #     login(request, user)
    #
    # else:
    #     pass
    return render(request, 'registration/login.html')

def examsStudent(request):
    # renderer_classes = [TemplateHTMLRenderer]
    # template_name = 'exams_list.html'
    # queryset = Exam.objects.all()
    # return Response({'exams': queryset})
    return render(request, 'frontend/exams_list_student.html')

def homeStudent(request):
    return render(request, 'frontend/index_student.html')

def gradesStudent(request):
    return render(request, 'frontend/grades_list_student.html')

