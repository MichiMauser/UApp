from django.db import models


class User(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]

    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Student', 'Student'),
    ]

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField()
    password = models.CharField(max_length=128)
    real_name = models.CharField(max_length=200, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Student')

    def __str__(self):
        return self.username
