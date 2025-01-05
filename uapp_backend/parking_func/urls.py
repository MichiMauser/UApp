from django.urls import path
from . import views

urlpatterns = [
    path('parking/createRequestForParkingSpace', views.createRequest, name='createRequest'),
    path('parking/processRequest/<int:request_id>', views.processRequest, name='processRequest'),
    path('parking', views.getParkingSpots, name='get_parking_spots'),
    path('parking/getRequests', views.getRequests, name='getRequests'),

    ]
