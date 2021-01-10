from django.contrib import admin
from .models import Exam
from .models import Student
from .models import Grade
from .models import Teacher
# Register your models here.

admin.site.register(Exam)
admin.site.register(Student)
admin.site.register(Grade)
admin.site.register(Teacher)