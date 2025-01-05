from django.db import models
from register_login.models import User
# Create your models here.
class Announcement(models.Model):
    TYPES = [
        ('news', 'News'),
        ('event', 'Event'),
        ('alert', 'Alert'),
    ]

    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.CharField(max_length=200)
    type = models.CharField(max_length=50, choices=TYPES, default='news')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title