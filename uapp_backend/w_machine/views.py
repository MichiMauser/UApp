from datetime import datetime
from django.core.exceptions import ValidationError
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .models import Booking
from rest_framework import status
from .serializers import BookingSerializer 
from django.db import transaction
# Create your views here.

def index(reqeust):
    return HttpResponse("Index for washing machine")



@api_view(['POST'])
def make_reservation(request):
    
    if request.method == 'POST':
        username = request.data.get('username')
        time_frame = request.data.get('time_frame')
        date = request.data.get('date')
        room_nr = request.data.get('room_nr')
       
        try:
            with transaction.atomic():
                washer_booking = Booking(
                    time_frame = time_frame,
                    date = datetime.fromisoformat(date.replace("Z", "+00:00")), 
                    username = username,
                    room_nr = room_nr
            )
                washer_booking.clean()
                washer_booking.save()
                serialized_washer = BookingSerializer(washer_booking).data
            return Response({'success': True, 'booking': serialized_washer}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'success': False, 'error': f"{e}"}, status=status.HTTP_409_CONFLICT)
        
@api_view(['DELETE'])
def delete_reservation(request):
    
    if request.method == 'DELETE':
        username = request.data.get("username")
        time_slot = request.data.get("time_frame")
        if not username and not time_slot:
            return Response({"success": False, 'error': "Can't delete others reservation"}, status=status.HTTP_401_UNAUTHORIZED)
        
        reservation = Booking.objects.filter(username=username, time_frame=time_slot).first()

        if not reservation:
            return Response({"success": False, "error": "Can't delete an inexistent reservation"}, status=status.HTTP_403_FORBIDDEN)

        reservation.delete()
        return Response({"success": True, "deletion": f"Successfully deleted the reservation for the time slot {time_slot}"}, status=status.HTTP_200_OK)




@api_view(['GET'])
def get_reservations(request):
    
    if request.method == 'GET':
        
        booked_time_slots = Booking.objects.all()
        serialized_booked = BookingSerializer(booked_time_slots, many= True)
        return Response(serialized_booked.data, status= status.HTTP_200_OK)

def index(reqeust):
    return HttpResponse("Index for washing machine")

