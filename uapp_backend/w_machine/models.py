from django.db import models
from django.core.exceptions import ValidationError
from django.utils.timezone import now
from datetime import date
# Create your models here.
class Booking(models.Model):

    time_frame = models.IntegerField()
    date = models.DateTimeField()
    username = models.CharField(max_length=150)
    room_nr = models.IntegerField()
    
    # TODO -> check the existince of the reservation of the timeslot in the clean 
    def clean(self):
        
        if self.date.date()<  date.today():

            raise ValidationError("Can't book on a past date")
        
        existing_bookings = Booking.objects.filter(date=self.date, room_nr=self.room_nr).count()
        
        if existing_bookings >= 3:
            raise ValidationError(f"The room {self.room_nr} has made 3 bookings already")
        
    class Meta:
        unique_together = ('time_frame', 'date')
        
    