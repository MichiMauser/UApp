from rest_framework import serializers
from .models import ParkingSlots, ParkingRequest


class ParkingSlotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSlots
        fields = ['id', 'status', 'student_name', 'registration_plate', 'start_date', 'end_date']


class ParkingRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingRequest
        fields = ['id', 'parking_slot_number', 'student_name', 'registration_plate', 'start_date','end_date', 'nr_of_days','status']