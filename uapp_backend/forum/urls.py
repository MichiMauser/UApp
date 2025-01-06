from django.urls import path
from . import views

urlpatterns = [
    path('getAnnouncements/', views.get_announcements, name='getAnnouncements'),
    path('createAnnouncement', views.create_announcement, name='createAnnouncement'),

    ]
