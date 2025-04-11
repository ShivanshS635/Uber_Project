# User Authentication Endpoints Documentation

## Endpoint: `/users/register`

### Description
This endpoint registers a new user in the system. It validates the incoming data, hashes the provided password, creates the user, and returns an authentication token along with the user data.

### HTTP Method
`POST`

### Request Data
The request body must be in JSON format. The required fields are as follows:

- **fullname.firstname** (String): Required. Must be at least 3 characters long.
- **fullname.lastname** (String): Optional. If provided, must be at least 3 characters long.
- **email** (String): Required. Must be a valid email address.
- **password** (String): Required. Must be at least 6 characters long.

#### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Responses

#### Success (Registration Successful)
- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "token": "jwt-token-here",
    "user": {
      "_id": "user-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com",
      "socketId": null
    }
  }
  ```

#### Validation Errors
- **Status Code:** `422 Unprocessable Entity`
- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be atleast 3 character long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Password must be atleast 6 character long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Server Errors
- **Status Code:** `500 Internal Server Error`
- **Response Body:**
  ```json
  {
    "error": "An unexpected error occurred."
  }
  ```

---

## Endpoint: `/users/login`

### Description
This endpoint allows an existing user to log in by validating their credentials. If the credentials are correct, it returns an authentication token and the user data.

### HTTP Method
`POST`

### Request Data
The request body must be in JSON format. The required fields are as follows:

- **email** (String): Required. Must be a valid email address.
- **password** (String): Required. Must be at least 6 characters long.

#### Example Request
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Responses

#### Success (Login Successful)
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "token": "jwt-token-here",
    "user": {
      "_id": "user-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com",
      "socketId": null
    }
  }
  ```

#### Authentication Errors
- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Validation Errors
- **Status Code:** `400 Bad Request`
- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be atleast 6 character long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Server Errors
- **Status Code:** `500 Internal Server Error`
- **Response Body:**
  ```json
  {
    "error": "An unexpected error occurred."
  }
  ```

### Notes
- Ensure the `Content-Type` header is set to `application/json`.
- The endpoint uses `express-validator` to validate the request data.
- A JWT is generated and returned upon successful login.