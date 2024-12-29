from django.urls import path
from . import views

urlpatterns = [
    path('createRequestForParkingSpace/', views.createRequest, name='createRequest'),
    path('processRequest/<int:request_id>/', views.processRequest, name='processRequest'),
    path('getParkingSpots/', views.getParkingSpots, name='getParkingSpots'),
    path('getRequests/', views.getRequests, name='getRequests'),

    ]
