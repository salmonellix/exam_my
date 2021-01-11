from django.urls import include, path
from rest_framework import routers
from . import views

urlpatterns = [
    path('examslist/', views.exams, name='exam_list'),
    path('examslist/<int:pk>/', views.exams, name='exam_list_post'),
    path('examslist/grades/<int:rid>/', views.exams_grade, name='exam_list_grade'),
    path('studentslist/', views.students, name='students_list'),
    path('gradeslist/', views.grades, name='grades_list'),
    path('', views.home, name='home'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('student/examslist/', views.examsStudent, name='exam_student'),
    path('student/gradeslist/', views.gradesStudent, name='grades_student'),
    path('student/', views.homeStudent, name='home_student'),
    path('exam-delete/<int:rid>/', views.examDelete, name="exam-delete"),
    path('exam-create/', views.examCreate, name="exam-create"),
    path('exam-update/<int:rid>/', views.examUpdate, name="exam-update"),
    # path('view/', views.ExamListView.as_view(), name='exam_changelist'),
    # path('add/', views.ExamCreateView.as_view(), name='exam_add'),
    # path('<int:pk>/', views.ExamUpdateView.as_view(), name='exam_change'),

]
