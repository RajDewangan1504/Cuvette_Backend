Here is a well-structured API documentation that outlines your **Job Management** API, including each route's purpose, the expected request format, and possible responses.

---

# **Job Management API Documentation**

## **Base URL**
```
https://your-api-domain.com/api/jobs
```

---

## **1. Post a Job**

### **Endpoint**
```
POST /api/jobs/post
```

### **Description**
This endpoint is used to post a new job by an authenticated company.

### **Authentication**
This route requires JWT authentication. The token should be passed in the request headers as `Authorization: Bearer <token>`.

### **Request Body**
```json
{
  "title": "Software Developer",
  "description": "Responsible for developing web applications.",
  "experienceLevel": "Intermediate",
  "candidates": ["candidate1@example.com", "candidate2@example.com"],
  "endDate": "2024-12-31"
}
```

### **Response**

#### **201 Created** (Success)
```json
{
  "message": "Job posted successfully",
  "job": {
    "_id": "614c1f7742fd370d885f2345",
    "title": "Software Developer",
    "description": "Responsible for developing web applications.",
    "experienceLevel": "Intermediate",
    "candidates": ["candidate1@example.com", "candidate2@example.com"],
    "endDate": "2024-12-31",
    "companyId": "614c1f7742fd370d885f2345"
  }
}
```

#### **400 Bad Request** (Validation Error)
```json
{
  "error": "All fields are required"
}
```

#### **500 Internal Server Error**
```json
{
  "error": "Internal server error while posting job"
}
```

---

## **2. Send Job Alert**

### **Endpoint**
```
POST /api/jobs/send-job-alert
```

### **Description**
This endpoint allows the company to send job alert emails to the specified candidates.

### **Authentication**
This route requires JWT authentication. The token should be passed in the request headers as `Authorization: Bearer <token>`.

### **Request Body**
```json
{
  "jobId": "614c1f7742fd370d885f2345"
}
```

### **Response**

#### **200 OK** (Success)
```json
{
  "message": "Job alerts sent successfully to candidates"
}
```

#### **400 Bad Request** (Job ID missing or no candidates)
```json
{
  "error": "Job ID is required"
}
```

```json
{
  "error": "No candidates to send job alerts to"
}
```

#### **404 Not Found** (Job not found)
```json
{
  "error": "Job not found"
}
```

#### **500 Internal Server Error**
```json
{
  "error": "Internal server error while sending job alert"
}
```

---

## **3. Get All Job Posts**

### **Endpoint**
```
GET /api/jobs/all
```

### **Description**
This endpoint fetches all job posts and includes the company information.

### **Authentication**
This is a public route and does not require authentication.

### **Response**

#### **200 OK** (Success)
```json
[
  {
    "_id": "614c1f7742fd370d885f2345",
    "title": "Software Developer",
    "description": "Responsible for developing web applications.",
    "experienceLevel": "Intermediate",
    "companyId": {
      "name": "Example Corp",
      "email": "example@example.com"
    },
    "endDate": "2024-12-31"
  },
  {
    "_id": "614c1f7742fd370d885f2346",
    "title": "Data Analyst",
    "description": "Analyze data for business insights.",
    "experienceLevel": "Junior",
    "companyId": {
      "name": "Data Inc",
      "email": "data@example.com"
    },
    "endDate": "2024-11-15"
  }
]
```

#### **500 Internal Server Error**
```json
{
  "error": "Internal server error while fetching jobs"
}
```

---

## **4. Get a Specific Job Post by ID**

### **Endpoint**
```
GET /api/jobs/:jobId
```

### **Description**
This endpoint fetches a specific job post by its `jobId`.

### **Authentication**
This is a public route and does not require authentication.

### **Request Parameters**
- `jobId`: The unique identifier of the job to fetch.

### **Response**

#### **200 OK** (Success)
```json
{
  "_id": "614c1f7742fd370d885f2345",
  "title": "Software Developer",
  "description": "Responsible for developing web applications.",
  "experienceLevel": "Intermediate",
  "companyId": {
    "name": "Example Corp",
    "email": "example@example.com"
  },
  "endDate": "2024-12-31"
}
```

#### **400 Bad Request** (Missing Job ID)
```json
{
  "error": "Job ID is required"
}
```

#### **404 Not Found** (Job not found)
```json
{
  "error": "Job not found"
}
```

#### **500 Internal Server Error**
```json
{
  "error": "Internal server error while fetching job"
}
```

---

### **Authentication Middleware:**
For routes requiring authentication, ensure the `verifyToken` middleware is correctly implemented in `authMiddleware.js` and included in the routes where required.

---

### **Schemas:**

#### **Job Schema**
- `title` (String, required): The title of the job position.
- `description` (String, required): A detailed description of the job.
- `experienceLevel` (String, required): The required experience level (e.g., Junior, Intermediate, Senior).
- `companyId` (ObjectId, ref: `Company`, required): The company that posted the job.
- `endDate` (Date, required): The application deadline.
- `candidates` (Array of Strings): A list of candidate email addresses.

#### **Company Schema** (Referenced in `Job Schema`)
- `name` (String, required): The name of the company.
- `companyName` (String, required): The legal name of the company.
- `employeeSize` (String): The size of the company's workforce.
- `email` (String, required, unique): The company's email address.
- `mobile` (String, required): The company's mobile contact number.
- `password` (String, required): The company's account password (hashed).
- `isEmailVerified` (Boolean, default: `false`): Whether the company's email is verified.
- `isPhoneVerified` (Boolean, default: `false`): Whether the company's phone number is verified.

---

### **Notes:**
- The routes that involve posting data (e.g., posting a job, sending job alerts) require authentication, which is verified using JWT tokens via the `verifyToken` middleware.
- For routes that retrieve data (e.g., getting job posts, getting job by ID), these routes are public and do not require authentication.
- Errors are handled at each step of the process to ensure that appropriate responses are returned in the event of missing parameters, validation errors, or internal server errors.

This structure ensures that the API is easy to follow and use, and covers all necessary details for developers interacting with your **Job Management API**.