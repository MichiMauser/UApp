# UApp register_login

# API Documentation

This API allows users to register and log in. It supports user registration with a file upload, which is parsed for additional user data (e.g., real name, birthday, gender). It also supports user login by verifying the username and password.

## Base URL

The base URL for the API is:
http://127.0.0.1:8000/register_login


## Endpoints

### 1. **Register a new user**

**Endpoint:** `POST /register/`

#### Request

This endpoint accepts a `POST` request with the following form-data:

- `username` (string, required): The username of the user.
- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user.
- `confirm_password` (string, required): The confirmation password for validation.
- `file` (file, required): The file to be uploaded (e.g., an image file). This file will be parsed to extract additional user data.

#### Response

On successful registration, the server responds with a JSON object containing the user data:

- `success`: `true` if the registration was successful.
- `user`: The user data (serialized).

Example response:

```json
{
    "success": true,
    "user": {
        "username": "john_doe",
        "email": "john.doe@example.com",
        "real_name": "John Doe",
        "birthday": "1990-01-01",
        "gender": "M",
        "role": "Student"
    }
}
```
On failure, the response will contain an error message:

- `success`: `false`
- `error`: A description of the error.

Example error response (password mismatch):

```json
{
    "success": false,
    "error": "Passwords do not match"
}
```

### 2. **Login a user**

**Endpoint:** `POST /login/`

#### Request

This endpoint accepts a `POST` request with the following JSON body:

- `username` (string, required): The username of the user.
- `password` (string, required): The password for the user.

#### Response

On successful registration, the server responds with a JSON object containing the user data:

- `success`: `true` if the registration was successful.
- `user`: The user data (serialized).

Example response:

```json
{
    "success": true,
    "user": {
        "username": "john_doe",
        "email": "john.doe@example.com",
        "real_name": "John Doe",
        "birthday": "1990-01-01",
        "gender": "M",
        "role": "Student"
    }
}
```
On failure, the response will contain an error message:

- `success`: `false`
- `error`: A description of the error.

Example error response (password mismatch):

```json
{
    "success": false,
    "error": "Passwords do not match"
}
```



# UApp forum

# API Documentation

This API allows users to retrieve and create announcements. It provides functionality to fetch all announcements as well as create new ones with the option to specify the type (News, Event, or Alert).

## Base URL

The base URL for the API is:
http://127.0.0.1:8000/forum


## Endpoints

### 1. **Get All Announcements**

**Endpoint:** `GET /getAnnouncements/`

#### Request

This endpoint accepts a GET request and does not require any parameters.

#### Response

On success, the server responds with a JSON object containing a list of all announcements:

Example response (success):

```json
{
    "success": true,
    "announcements": [
        {
            "id": 1,
            "title": "Announcement Title",
            "content": "The content of the announcement.",
            "author": "Author Name",
            "type": "news",
            "created_at": "2025-01-06T00:00:00Z"
        },
        ...
    ]
}
```
On failure, the response will indicate an internal error:

Example error response:

```json
{
    "success": false,
    "error": "An error occurred while fetching the announcements."
}
```

### 2. ** Create a New Announcement**

**Endpoint:** `POST /createAnnouncement/`

#### Request

This endpoint accepts a POST request with the following JSON body:

- `title` (string, required): The title of the announcement.
- `content` (string, required): The content of the announcement.
- `author` (string, required): The name of the author of the announcement.
- `type` (string, optional): The type of the announcement, can be 'news', 'event', or 'alert'. Defaults to 'news'.

Example Request Body:
```json
{
    "title": "Announcement Title",
    "content": "This is the content of the announcement.",
    "author": "John Doe",
    "type": "event"
}
```

#### Response

On successful creation, the server responds with the data of the created announcement:

Example response (success):
```json
{
    "success": true,
    "announcement": {
        "id": 1,
        "title": "Announcement Title",
        "content": "The content of the announcement.",
        "author": "John Doe",
        "type": "event",
        "created_at": "2025-01-06T00:00:00Z"
    }
}
```

If the required fields are missing or there is an issue, the server will return an error response:

Example error response (missing fields):
```json
{
    "success": false,
    "error": "All fields are required."
}
```