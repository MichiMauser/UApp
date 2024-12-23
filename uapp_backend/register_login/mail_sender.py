import os
import base64
import random
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Define the scope for Gmail API. Modify if you need more permissions.
SCOPES = ['https://www.googleapis.com/auth/gmail.send']


def authenticate_gmail():
    """Authenticates and returns a Gmail API service instance."""
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=8080)
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        service = build("gmail", "v1", credentials=creds)
        return service
    except HttpError as error:
        print(f"An error occurred: {error}")
        return None


def create_message(sender, to, subject, body):
    """Creates an email message."""
    message = MIMEMultipart()
    message["from"] = sender
    message["to"] = to
    message["subject"] = subject

    message.attach(MIMEText(body, "plain"))
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {"raw": raw_message}


def send_activation_email(service, sender_email, recipient_email, username, password):
    # Email content
    subject = "UApp account details"
    body = f"Your generated password for your UApp account is: \n username: {username} \n password: {password}"

    # Create and send the email
    try:
        message = create_message(sender_email, recipient_email, subject, body)
        sent_message = service.users().messages().send(userId="me", body=message).execute()
        # print("Message sent successfully:", sent_message)
        return True, password
    except HttpError as error:
        # print(f"An error occurred: {error}")
        return False, str(error)

def send_email(email, username, password):
    service = authenticate_gmail()

    # Define the sender and recipient
    sender_email = "alexandru00053@gmail.com"  # Replace with your sender email

    # Send the activation email and print the result
    if service:
        success, result = send_activation_email(service, sender_email, email, username, password)
        if success:
            print(f"Email sent successfully.")
        else:
            print(f"Failed to send email. Error: {result}")
