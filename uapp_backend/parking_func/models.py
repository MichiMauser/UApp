from django.db import models


class ParkingSlots(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
    ]
    status = models.CharField(max_length=90, choices=STATUS_CHOICES, default='Available')
    student_name = models.CharField(max_length=200, blank=True, null=True)
    registration_plate = models.CharField(max_length=200, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)


    def is_reserved(self):
        return self.status == 'Occupied'

    def __str__(self):
        return f"Slot {self.id} - {self.status}"


class ParkingRequest(models.Model):
    STATUS_CHOICES = [
        ('approved', 'Approved'),
        ('denied', 'Denied'),
        ('pending', 'Pending'),
        ('ApprovedPending', 'approvedPending')
    ]

    parking_slot_number = models.IntegerField(help_text="Parking Slot Number")
    student_name = models.CharField(max_length=200, help_text="Student's Name")
    registration_plate = models.CharField(max_length=200, blank=True, null=True, help_text="Registration Plate Number")
    start_date = models.DateField(blank=True, null=True)
    nr_of_days = models.PositiveIntegerField(blank=True, null=True)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='pending',
                              help_text="Request Status (approved/denied/pending/approvedPending)")

    def __str__(self):
        return f"Request for Slot {self.parking_slot_number} - Status: {self.status}"
