from django.urls import path
from . import views

urlpatterns = [
    path('washer/', views.make_reservation, name= 'add_reservation'),
    path('washer/del_reservation', views.delete_reservation, name= "delete_reservation"),
    path('washer/get_reservations',views.get_reservations, name= "get_reservations")
]
