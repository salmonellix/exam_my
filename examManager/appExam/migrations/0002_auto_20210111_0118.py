# Generated by Django 3.1.4 on 2021-01-11 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appExam', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='grade',
            name='student_id',
        ),
        migrations.AddField(
            model_name='grade',
            name='student_id',
            field=models.ManyToManyField(blank=True, default='', to='appExam.Student'),
        ),
    ]
