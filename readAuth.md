Here is a well-structured, comprehensive API documentation that covers your **Authentication** and **Job Management** routes. This format provides an easy-to-read, detailed description of each API endpoint, including request formats, response samples, and possible error messages.

---

# **API Documentation**

## **Base URL**

```
https://your-api-base-url.com/api
```

---

## **Authentication API**

### 1. **Register a New Company**

- **Endpoint:** `POST /auth/register`
  
- **Description:** This endpoint is used to register a new company.

- **Request:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "+1234567890",
    "password": "securepassword123",
    "companyName": "Example Corp",
    "employeeSize": "100"
  }
  ```

- **Responses:**

  - **201 Created** (Success):
    ```json
    {
      "message": "Company registered. Please verify your email and phone."
    }
    ```

  - **400 Bad Request** (Email or mobile already in use):
    ```json
    {
      "error": "Email or mobile already in use"
    }
    ```

  - **500 Internal Server Error** (Server error during registration):
    ```json
    {
      "error": "Internal server error during registration"
    }
    ```

---

### 2. **Verify Email**

- **Endpoint:** `POST /auth/verify-email`

- **Description:** This endpoint is used to verify a company's email using the OTP sent to their email.

- **Request:**

  ```json
  {
    "email": "john@example.com",
    "code": "123456"
  }
  ```

- **Responses:**

  - **200 OK** (Email verified successfully):
    ```json
    {
      "message": "Email verified successfully"
    }
    ```

  - **400 Bad Request** (Invalid verification code):
    ```json
    {
      "message": "Invalid verification code or phone number"
    }
    ```

  - **500 Internal Server Error** (Server error during email verification):
    ```json
    {
      "error": "Internal server error during email verification"
    }
    ```

---

### 3. **Verify Phone**

- **Endpoint:** `POST /auth/verify-phone`

- **Description:** This endpoint is used to verify a company's phone number using the OTP sent to their mobile.

- **Request:**

  ```json
  {
    "mobile": "+1234567890",
    "code": "654321"
  }
  ```

- **Responses:**

  - **200 OK** (Phone verified successfully):
    ```json
    {
      "message": "Phone verified successfully"
    }
    ```

  - **400 Bad Request** (Invalid verification code):
    ```json
    {
      "message": "Invalid verification code or phone number"
    }
    ```

  - **500 Internal Server Error** (Server error during phone verification):
    ```json
    {
      "error": "Internal server error during phone verification"
    }
    ```

---

### 4. **Login a Company**

- **Endpoint:** `POST /auth/login`

- **Description:** This endpoint is used for companies to log in with their email and password.

- **Request:**

  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```

- **Responses:**

  - **200 OK** (Login successful):
    ```json
    {
      "message": "Login successful"
    }
    ```

  - **400 Bad Request** (Invalid credentials):
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

  - **403 Forbidden** (Email or phone not verified):
    ```json
    {
      "message": "Please verify your email first"
    }
    ```

    ```json
    {
      "message": "Please verify your phone first"
    }
    ```

  - **500 Internal Server Error** (Server error during login):
    ```json
    {
      "error": "Internal server error during login"
    }
    ```

---

### 5. **Logout a Company**

- **Endpoint:** `POST /auth/logout`

- **Description:** This endpoint is used to log out a company by clearing the JWT cookie.

- **Responses:**

  - **200 OK** (Logout successful):
    ```json
    {
      "message": "Logout successful"
    }
    ```
