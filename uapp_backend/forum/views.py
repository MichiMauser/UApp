from .models import Announcement
from .serializers import AnnouncementSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import json

# Create your views here.
@api_view(['GET'])
def get_announcements(request):
    if request.method == 'GET':
        announcements = Announcement.objects.all()
        # Serialize the announcements
        serializer = AnnouncementSerializer(announcements, many=True)
        # Return the response with the serialized data
        return Response({'success': True, 'announcements': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_announcement(request):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({'success': False, 'error': 'Invalid JSON data.'}, status=status.HTTP_400_BAD_REQUEST)
        print(data)
        # Get the data from the request body
        title = data.get('title')
        content = data.get('content')
        announcement_type = data.get('type', 'news')  # Default to 'news' if not provided
        author = data.get('author')
        # Validate the required fields
        if not title or not content or not author:
            return Response({'success': False, 'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the new Announcement object
        announcement = Announcement(
            title=title,
            content=content,
            type=announcement_type,
            author=author
        )
        announcement.save()

        # Serialize the newly created Announcement and return a response
        announcement_data = AnnouncementSerializer(announcement).data
        return Response({'success': True, 'announcement': announcement_data}, status=status.HTTP_201_CREATED)