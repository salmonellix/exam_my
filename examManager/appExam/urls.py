from django.urls import include, path
from rest_framework import routers
from rest_framework.routers import SimpleRouter
from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from rest_framework.authtoken.views import obtain_auth_token

from .models import Exam

router = routers.DefaultRouter()
router.register(r'exam', views.ExamViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'grades', views.GradeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
