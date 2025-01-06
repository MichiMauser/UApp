from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .image_parser import convert_image_to_data
from .mail_sender import  send_email
from .models import User
from .serializers import UserSerializer
from PIL import Image

def parseFile(file):
    try:
        image = Image.open(file)
        image.save("test1.jpeg")
        data = convert_image_to_data(image)
        return data
    except Exception as e:
        return {
            'real_name': 'mock',
            'birthday': '1990-01-01',
            'gender': 'M',
            'password': 'Paineculapte123@'
        }



@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        # Get data from the request
        username = request.POST.get('username')
        email = request.POST.get('email')
        file = request.FILES.get('validationImage')

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return Response({'success': False, 'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        parsed_data = parseFile(file)
        # Create the user
        user = User(
            username=username,
            email=email,
            real_name=parsed_data.get('real_name'),
            birthday=parsed_data.get('birthday'),
            gender=parsed_data.get('gender'),
            password=parsed_data.get('password'),
            role='Student'
        )
        user.save()

        send_email(email, user.username, user.password)
        # Return success response with user data
        user_data = UserSerializer(user).data
        return Response({'success': True, 'user': user_data}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = User.objects.get(username=username)
            # Check if the password matches
            if user.password == password:
                user_data = UserSerializer(user).data
                return Response({'success': True, 'user': user_data}, status=status.HTTP_200_OK)
            else:
                return Response({'success': False, 'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)

        except User.DoesNotExist:
            return Response({'success': False, 'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
