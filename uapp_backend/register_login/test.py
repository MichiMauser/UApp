from django.contrib.auth.models import User
users = User.objects.all()  # This will get all users
for user in users:
    print(user.username, user.email)  # You can print out specific fields
