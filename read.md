Here's a step-by-step flow of API requests and responses for the **email and phone verification process** during company registration, login, and verification.

---

### **Step 1: Register Company**

**Endpoint**: `POST /api/auth/register`  
**Description**: This API registers the company and sends email and phone verification tokens/codes.

#### Request:
```json
{
  "name": "Company XYZ",
  "email": "contact@companyxyz.com",
  "mobile": "1234567890",
  "password": "password123"
}
```

#### Response (Success):
```json
{
  "message": "Company registered. Please verify your email and phone."
}
```

**What happens**:
- The company is created with the status of `isEmailVerified: false` and `isPhoneVerified: false`.
- A unique **email verification token** and a **phone verification code** are generated and stored in the database.
- A verification email containing the token is sent to the user's email.
- A verification SMS containing the code is sent to the user's phone.

---

### **Step 2: Verify Email**

**Endpoint**: `GET /api/auth/verify-email`  
**Description**: This API verifies the company's email using the token sent in the verification email.

#### Request (Query Parameter):
```http
GET /api/auth/verify-email?token=<emailVerificationToken>
```

Example:
```http
GET /api/auth/verify-email?token=d418a9e3e9e6fd82c2f4ac9b8b7f5f1f
```

#### Response (Success):
```json
{
  "message": "Email verified successfully"
}
```

#### Response (Error - Invalid or expired token):
```json
{
  "message": "Invalid or expired token"
}
```

**What happens**:
- The API searches for the company using the provided email verification token.
- If found, the `isEmailVerified` status is set to `true`, and the token is deleted.
- If the token is invalid or expired, an error is returned.

---

### **Step 3: Verify Phone**

**Endpoint**: `POST /api/auth/verify-phone`  
**Description**: This API verifies the company's phone number using the code sent in the SMS.

#### Request:
```json
{
  "mobile": "1234567890",
  "code": "123456"
}
```

#### Response (Success):
```json
{
  "message": "Phone verified successfully"
}
```

#### Response (Error - Invalid code):
```json
{
  "message": "Invalid verification code"
}
```

**What happens**:
- The API searches for the company using the provided mobile number and phone verification code.
- If found, the `isPhoneVerified` status is set to `true`, and the code is deleted.
- If the code is invalid, an error is returned.

---

### **Step 4: Login Company**

**Endpoint**: `POST /api/auth/login`  
**Description**: This API allows the company to log in **only after** their email and phone have been verified.

#### Request:
```json
{
  "email": "contact@companyxyz.com",
  "password": "password123"
}
```

#### Response (Success):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response (Error - Email not verified):
```json
{
  "message": "Please verify your email first"
}
```

#### Response (Error - Phone not verified):
```json
{
  "message": "Please verify your phone first"
}
```

**What happens**:
- The API checks the provided email and password.
- If the email and phone are both verified (`isEmailVerified: true`, `isPhoneVerified: true`), the company is authenticated, and a JWT token is returned.
- If either the email or phone is not verified, an appropriate error message is returned.

---

### **Complete API Flow:**

1. **Register Company**:  
   The company registers using `POST /api/auth/register`, and verification tokens are generated for email and phone.

2. **Verify Email**:  
   The company clicks the verification link sent to their email (`GET /api/auth/verify-email?token=<token>`), and the email is verified.

3. **Verify Phone**:  
   The company submits the phone verification code (`POST /api/auth/verify-phone`), and the phone is verified.

4. **Login**:  
   After both email and phone are verified, the company can log in (`POST /api/auth/login`).

---

### **Summary of APIs**:

| API                    | Method | Description                                      |
|------------------------|--------|--------------------------------------------------|
| `/api/auth/register`    | `POST` | Register company, send email and SMS for verification |
| `/api/auth/verify-email`| `GET`  | Verify email using the token from the email      |
| `/api/auth/verify-phone`| `POST` | Verify phone using the code sent via SMS         |
| `/api/auth/login`       | `POST` | Login after email and phone are verified         |

This flow ensures that the company has verified both their email and phone before logging in.