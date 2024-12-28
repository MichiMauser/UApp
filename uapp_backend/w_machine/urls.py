from django.urls import path
from . import views

urlpatterns = [
    path('washer/', views.make_reservation, name= 'add_reservation'),
    path('washer/del_res', views.delete_reservation, name= "delete_reservation")
]
