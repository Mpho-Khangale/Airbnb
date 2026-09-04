# Airbnb Clone Backend

## Overview

This is the backend API for the Airbnb Clone Capstone Project.

The backend is built with Node.js, Express, MongoDB and Mongoose. It provides REST API endpoints for user authentication, accommodation management and reservation management.

## Technologies

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Tokens (JWT)
* bcryptjs
* CORS
* dotenv

## Project Structure

```text
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── accommodationController.js
│   ├── reservationController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── Accommodation.js
│   ├── Reservation.js
│   └── User.js
├── routes/
│   ├── accommodationRoutes.js
│   ├── reservationRoutes.js
│   └── userRoutes.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## Installation

Navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

The file should contain:

```text
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Do not commit the `.env` file to GitHub.

## Running the Server

Start the backend with:

```bash
node server.js
```

The API will run on:

```text
http://localhost:5000
```

## Authentication

The API uses JSON Web Tokens (JWT) for authentication.

After successfully logging in, the API returns a JWT token.

Protected requests must include the token in the Authorization header:

```text
Authorization: Bearer YOUR_TOKEN
```

Admin-only endpoints require a valid JWT belonging to a user with the `admin` role.

## API Endpoints

### User Endpoints

#### Register User

```text
POST /api/users/register
```

Request body:

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "Password123"
}
```

Successful response:

```text
201 Created
```

#### Login User

```text
POST /api/users/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Successful response:

```text
200 OK
```

The response contains a JWT token.

---

# Accommodation Endpoints

### Get All Accommodations

```text
GET /api/accommodations
```

Authentication:

```text
Not required
```

Successful response:

```text
200 OK
```

### Get One Accommodation

```text
GET /api/accommodations/:id
```

Authentication:

```text
Not required
```

Successful response:

```text
200 OK
```

If the accommodation does not exist:

```text
404 Not Found
```

### Create Accommodation

```text
POST /api/accommodations
```

Authentication:

```text
Required
Admin only
```

Example request body:

```json
{
  "title": "Modern Cape Town Apartment",
  "location": "Cape Town",
  "description": "A modern apartment near the city centre.",
  "type": "Apartment",
  "bedrooms": 2,
  "bathrooms": 1,
  "guests": 4,
  "amenities": ["WiFi", "Kitchen"],
  "images": [],
  "rating": 4.8,
  "reviews": 120,
  "price": 1000,
  "weeklyDiscount": 0,
  "cleaningFee": 200,
  "serviceFee": 100,
  "occupancyTaxes": 50
}
```

Successful response:

```text
201 Created
```

### Update Accommodation

```text
PUT /api/accommodations/:id
```

Authentication:

```text
Required
Admin only
```

Successful response:

```text
200 OK
```

### Delete Accommodation

```text
DELETE /api/accommodations/:id
```

Authentication:

```text
Required
Admin only
```

Successful response:

```text
200 OK
```

---

# Reservation Endpoints

### Create Reservation

```text
POST /api/reservations
```

Authentication:

```text
Required
```

Request body:

```json
{
  "accommodationId": "ACCOMMODATION_ID",
  "checkIn": "2026-10-10",
  "checkOut": "2026-10-15",
  "guests": 2
}
```

The API automatically:

* Associates the reservation with the logged-in user.
* Checks that the accommodation exists.
* Checks the maximum number of guests.
* Validates the reservation dates.
* Prevents overlapping reservations.
* Calculates the total reservation price.

Successful response:

```text
201 Created
```

### Get User Reservations

```text
GET /api/reservations/user
```

Authentication:

```text
Required
```

Returns reservations belonging to the logged-in user.

Successful response:

```text
200 OK
```

### Get Host Reservations

```text
GET /api/reservations/host
```

Authentication:

```text
Required
```

Returns reservations belonging to accommodations owned by the logged-in user.

Successful response:

```text
200 OK
```

### Get One Reservation

```text
GET /api/reservations/:id
```

Authentication:

```text
Required
```

Users can only view their own reservations.

Successful response:

```text
200 OK
```

### Update Reservation

```text
PUT /api/reservations/:id
```

Authentication:

```text
Required
```

Request body:

```json
{
  "checkIn": "2026-10-11",
  "checkOut": "2026-10-16",
  "guests": 3
}
```

The API validates the updated dates and prevents the reservation from overlapping another reservation.

Successful response:

```text
200 OK
```

### Delete Reservation

```text
DELETE /api/reservations/:id
```

Authentication:

```text
Required
```

Users can only delete their own reservations.

Successful response:

```text
200 OK
```

---

# HTTP Status Codes

The API uses standard HTTP status codes:

| Status Code | Meaning                                                      |
| ----------- | ------------------------------------------------------------ |
| 200         | Request successful                                           |
| 201         | Resource created successfully                                |
| 400         | Invalid request or validation error                          |
| 401         | Authentication required or invalid                           |
| 403         | User does not have permission                                |
| 404         | Resource not found                                           |
| 409         | Conflict, such as duplicate email or overlapping reservation |
| 500         | Internal server error                                        |

## Error Handling

Errors are handled centrally through the error-handling middleware.

The API handles:

* Invalid MongoDB IDs
* Mongoose validation errors
* Duplicate database values
* Authentication errors
* Authorization errors
* Invalid request data
* Missing resources
* Unexpected server errors

## Security

The backend implements several security practices:

* Passwords are hashed using bcryptjs.
* Passwords are never returned in API responses.
* JWT authentication protects private endpoints.
* Admin-only routes require an administrator role.
* Users cannot assign themselves the admin role during registration.
* Users can only modify or delete their own reservations.
* Accommodation ownership is checked before modification.
* Sensitive environment variables are stored in `.env`.
* `.env` is excluded from Git using `.gitignore`.

## Database

MongoDB Atlas is used as the database.

Mongoose provides:

* Database connection management
* Schemas
* Data validation
* Relationships between users, accommodations and reservations
* Querying and document management

The main relationships are:

```text
User
 │
 ├── hosts → Accommodations
 │
 └── creates → Reservations
                    │
                    └── belongs to → Accommodation
```

## Development

The backend can be tested using Postman or another API testing tool.

The frontend communicates with the backend using HTTP requests to the REST API.

## Deployment

The backend is designed to support deployment using environment variables so that database credentials, JWT secrets and port configuration are not hard-coded into the application.

For production deployment, the environment variables must be configured on the hosting platform.

## Author

Airbnb Clone Capstone Project
