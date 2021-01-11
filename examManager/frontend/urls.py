from django.urls import include, path
from rest_framework import routers
from . import views

urlpatterns = [
    path('examslist/', views.exams, name='exam_list'),
    path('examslist/grades/{int:rid}', views.exams_grade, name='exam_list'),
    path('studentslist/', views.students, name='students_list'),
    path('gradeslist/', views.grades, name='grades_list'),
    path('', views.home, name='home'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('student/examslist/', views.examsStudent, name='exam_student'),
    path('student/gradeslist/', views.gradesStudent, name='grades_student'),
    path('student/', views.homeStudent, name='home_student'),
]
