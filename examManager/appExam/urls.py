from django.urls import include, path
from rest_framework import routers
from rest_framework.routers import SimpleRouter
from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from rest_framework.authtoken.views import obtain_auth_token

from .models import Exam
# from drf_auto_endpoint.router import router
# router = SimpleRouter(trailing_slash=True)
router = routers.DefaultRouter()
router.register(r'exam', views.ExamViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'grades', views.GradeViewSet)
# router.register(r'exam/create/', views.examCreate, basename=Exam)
# exam_list = views.ExamViewSet.as_view({
#     'get': 'list',
# })
# exam_post = views.ExamViewSet.as_view({
#     'post': 'create'
# })

# urlpatterns = format_suffix_patterns([
#
#     # path('exams/', exam_list, name='exam-list'),
#     # path('exams/create', exam_post, name='exam-post'),

# ])
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]