from rest_framework import serializers

from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['time_frame', 'date','username', 'room_nr']
