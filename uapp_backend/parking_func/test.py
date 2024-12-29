from parking_func.models import ParkingSlots

for i in range(1, 21):
    slot = ParkingSlots(id=i, status='available')
    slot.save()

print("Parking slots populated successfully!")