import json

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from datetime import datetime, timedelta

from parking_func.models import ParkingRequest, ParkingSlots
from parking_func.serializers import ParkingRequestsSerializer, ParkingSlotsSerializer
from django.db.models import Q

@api_view(['POST'])
def createRequest(request):
    if request.method == 'POST':

        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({'error': 'Invalid JSON data.'}, status=status.HTTP_400_BAD_REQUEST)

        parking_slot_number = data.get('parking_slot_number')
        student_name = data.get('student_name')
        registration_plate = data.get('registration_plate')
        start_date = data.get('start_date')
        nr_of_days = int(data.get('nr_of_days'))

        start_date_obj = datetime.strptime(start_date, '%Y-%m-%d').date()
        end_date_obj = start_date_obj + timedelta(days=nr_of_days)

        overlapping_bookings = ParkingRequest.objects.filter(
            Q(start_date__lte=end_date_obj) & Q(end_date__gte=start_date_obj),
            parking_slot_number=parking_slot_number,
            status__in=['Approved', 'ApprovedPending'],
        )

        if overlapping_bookings.exists():
            return Response(
                {'success': False, 'message': 'The parking slot is already booked during the requested time.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        parkingRequest = ParkingRequest(
            parking_slot_number=parking_slot_number,
            student_name=student_name,
            registration_plate=registration_plate,
            nr_of_days = nr_of_days,
            start_date = start_date_obj,
            end_date= end_date_obj,
            status= "Pending"
        )
        parkingRequest.save()
        parkingRequestData = ParkingRequestsSerializer(parkingRequest).data
        return Response({'success': True, 'parkingRequest': parkingRequestData}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def getRequests(request):
    if request.method == 'GET':
        requests = ParkingRequest.objects.all()
        serialized_requests = ParkingRequestsSerializer(requests, many=True).data
        return Response({'success': True, 'requests': serialized_requests}, status=status.HTTP_200_OK)

@api_view(['GET'])
def getParkingSpots(request):
    if request.method == 'GET':
        parkingInfo = ParkingSlots.objects.all()
        serialized_parkingInfo = ParkingSlotsSerializer(parkingInfo, many=True).data
        return Response({'success': True, 'requests': serialized_parkingInfo}, status=status.HTTP_200_OK)

@api_view(['PATCH'])
def processRequest(request, request_id):
    if request.method == 'PATCH':
        try:
            data = json.loads(request.body.decode('utf-8'))

            parking_request = ParkingRequest.objects.get(id=request_id)
            statusRequest = data.get('status')
            nr_of_days = int(parking_request.nr_of_days)

            start_date_obj = parking_request.start_date
            end_date_obj = start_date_obj + timedelta(days=nr_of_days)

            if statusRequest == "Accepted":
                overlapping_reservations = ParkingRequest.objects.filter(
                    Q(start_date__lte=end_date_obj) & Q(end_date__gte=start_date_obj),
                    parking_slot_number=parking_request.parking_slot_number,
                    status__in=["Approved", "ApprovedPending"],
                )

                if overlapping_reservations.exists():
                    return Response({'success': False, 'message': 'The parking slot is already booked for the selected time interval.'},
                                    status=status.HTTP_400_BAD_REQUEST)

                parking_request.status = "ApprovedPending"
                parking_request.save()

                return Response({'success': True, 'message': 'Request status updated to ApprovedPending.', 'request': ParkingRequestsSerializer(parking_request).data
                    }, status=status.HTTP_200_OK)

            elif statusRequest == "Denied":
                parking_request.status = "Denied"
                parking_request.save()

                return Response({
                    'success': True,
                    'message': 'Request status updated to Denied.',
                    'request': ParkingRequestsSerializer(parking_request).data
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'success': False,
                    'error': 'Invalid status value. Must be "Accepted" or "Denied".'
                }, status=status.HTTP_400_BAD_REQUEST)
        except ParkingRequest.DoesNotExist:
            return Response({
                'success': False,
                'error': 'Parking request not found.'
            }, status=status.HTTP_404_NOT_FOUND)
