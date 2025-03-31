# Node.js Authentication API with MongoDB

This is a backend authentication API built with Node.js, Express.js, and MongoDB. It provides user signup, login, profile management, and authentication using JWT.

## Features
- User registration (Signup)
- User authentication (Login) with JWT
- Profile management (View and Update user profile)
- Password hashing using bcrypt
- Protected routes with JWT authentication middleware

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, bcrypt
- **API Testing:** Postman

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Satyam-Mishra-1/ERP-Backend-Task.git
cd ERP-Backend-Task
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create a `.env` File
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the Server
```bash
npm start
```
The server will start at `http://localhost:5000`.

## API Endpoints

### **Authentication Routes**
#### **1. User Signup**
- **Endpoint:** `POST /api/auth/signup`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword123",
  "phone": "1234567890",
  "profilePicture": "http://example.com/profile.jpg"
}
```
- **Response:**
```json
{
  "message": "User created successfully"
}
```

#### **2. User Login**
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```
- **Response:**
```json
{
  "token": "JWT_TOKEN_HERE"
}
```

### **Protected Routes (Requires JWT Token)**
#### **3. Get User Profile**
- **Endpoint:** `GET /api/auth/profile`
- **Headers:**
  - Authorization: `Bearer JWT_TOKEN_HERE`
- **Response:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "1234567890",
  "profilePicture": "http://example.com/profile.jpg"
}
```

#### **4. Update User Profile**
- **Endpoint:** `PUT /api/auth/profile`
- **Headers:**
  - Authorization: `Bearer JWT_TOKEN_HERE`
- **Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "newemail@example.com",
  "phone": "0987654321",
  "profilePicture": "http://example.com/newprofile.jpg",
  "password": "newpassword123"
}
```
- **Response:**
```json
{
  "message": "Profile updated successfully"
}
```

## How to Send API Requests in Postman
1. Open Postman.
2. Set the request type (GET, POST, PUT) as required.
3. Enter the API endpoint URL (e.g., `http://localhost:5000/api/auth/signup`).
4. For protected routes, go to the **Headers** tab and add:
   - **Key:** `Authorization`
   - **Value:** `Bearer JWT_TOKEN_HERE`
5. For POST/PUT requests, go to the **Body** tab and select **raw**, then enter JSON data.
6. Click **Send**.

