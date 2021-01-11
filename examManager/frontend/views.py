from django.shortcuts import render
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view

from appExam.models import Exam, Grade
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
from appExam.serializers import ExamSerializer


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


def exams_grade(request, rid):
    exam = Exam.objects.filter(id_exam=rid)
    grades = Grade.objects.filter(exam_id=rid)

    context = {
        'exam': exam,
        'grades': grades,
    }

    return render(request, 'frontend/exams_grades.html', context)


def examDelete(request):
    return None


@api_view(['POST'])
def examCreate(request):
    serializer = ExamSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def examUpdate(request, pk):
    exam = Exam.objects.get(id_exam=pk)
    serializer = ExamSerializer(instance=exam, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def examDelete(request, pk):
    exam = Exam.objects.get(id_exam=pk)
    grades = Grade.objects.filter(exam_id=pk)
    if not grades:
        exam.delete()
        return Response('Item succsesfully delete!')
    else:
        return Response('Cant delete!')
