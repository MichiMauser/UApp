# UApp

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