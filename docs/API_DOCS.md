# API Documentation – School Management System

This document describes all major API endpoints, their HTTP methods, required roles, request/response formats, and typical error codes.

Base URL (development):

- `http://localhost:5000/api`

All protected endpoints require a valid JWT access token sent via httpOnly cookie (or `Authorization: Bearer <token>` if you configured it that way).

---

## 1. Authentication

### POST /api/auth/login

**Public**

Authenticate a user and issue access + refresh tokens.

Request body:

```json
{
  "usernameOrEmail": "admin@school.edu",
  "password": "Admin@2024Secure!"
}
```

Response (200):

```json
{
  "user": {
    "id": "64f...",
    "username": "admin_primary",
    "email": "admin@school.edu",
    "role": "admin",
    "profile": {
      "firstName": "Primary",
      "lastName": "Admin",
      "avatarUrl": "https://..."
    }
  }
```

Access and refresh tokens are set as httpOnly cookies.

Errors:

- 400 – Validation failed.
- 401 – Invalid credentials.

### POST /api/auth/refresh

**Public (with refresh token cookie)**

Rotates the refresh token and issues a new access token.

Response (200):

```json
{ "message": "Token refreshed" }
```

Errors:

- 401 – Missing or invalid refresh token.

### POST /api/auth/logout

**Authenticated**

Revokes the current refresh token and clears auth cookies.

Response (200):

```json
{ "message": "Logged out" }
```

### GET /api/auth/me

**Authenticated**

Returns the currently authenticated user.

Response (200):

```json
{
  "user": {
    "id": "64f...",
    "username": "admin_primary",
    "email": "admin@school.edu",
    "role": "admin",
    "profile": { "firstName": "Primary", "lastName": "Admin" }
  }
}
```

---

## 2. Users (Admin only)

### GET /api/users

**Roles:** `admin`

List users with pagination.

Query parameters:

- `page` (optional, default `1`)
- `limit` (optional, default `10`)
- `role` (optional filter)

Response (200):

```json
{
  "users": [
    { "id": "64f...", "username": "admin_primary", "email": "admin@school.edu", "role": "admin" }
  ],
  "total": 12,
  "page": 1,
  "limit": 10
}
```

### GET /api/users/:id

**Roles:** `admin`

Return a single user.

Errors:

- 404 – Not found.

### POST /api/users

**Roles:** `admin`

Create a new user.

Request body:

```json
{
  "username": "teacher_new",
  "email": "newteacher@school.edu",
  "password": "Teacher@2024Secure!",
  "role": "teacher",
  "profile": {
    "firstName": "New",
    "lastName": "Teacher"
  }
}
```

Response (201):

```json
{
  "id": "64f...",
  "username": "teacher_new",
  "email": "newteacher@school.edu",
  "role": "teacher",
  "profile": {
    "firstName": "New",
    "lastName": "Teacher"
  }
}
```

### PUT /api/users/:id

**Roles:** `admin`

Update user fields (excluding password, which should have its own endpoint if added).

### DELETE /api/users/:id

**Roles:** `admin`

Delete a user.

Response: 204 (no content)

### PATCH /api/users/:id/role

**Roles:** `admin`

Change a user’s role.

Request body:

```json
{ "role": "teacher" }
```

Response (200): updated user.

---

## 3. Students

### GET /api/students

**Roles:** `admin`, `director`, `teacher`, `secretary`

List students with pagination and optional filters.

Query parameters:

- `page` (default `1`)
- `limit` (default `10`)
- `search` (optional, matches name/number)
- `gradeLevel` (optional)

Response (200):

```json
{
  "students": [
    {
      "id": "64f...",
      "studentNumber": "ST2026-001",
      "firstName": "Emma",
      "lastName": "Johnson",
      "gradeLevel": "10",
      "contact": { "email": "emma.j@student.edu" }
    }
  ],
  "total": 30,
  "page": 1,
  "limit": 10
}
```

### GET /api/students/:id

**Roles:**

- `admin` – any student.
- `teacher` – only students in own classes (enforced by backend).
- `student` – own record only.

Response: student object or 403 if not allowed.

### POST /api/students

**Roles:** `admin`, `secretary`

Create a new student record.

Request body (partial):

```json
{
  "firstName": "Emma",
  "lastName": "Johnson",
  "gradeLevel": "10",
  "contact": {
    "email": "emma.j@student.edu",
    "phone": "+15550001000"
  },
  "emergencyContacts": [
    {
      "name": "Parent Johnson",
      "relationship": "Parent",
      "phone": "+15550002000"
    }
  ]
}
```

Response (201): created student.

### PUT /api/students/:id

**Roles:**

- `admin`, `secretary` – full update.
- `teacher` – limited fields (e.g., notes).

Errors:

- 403 – teacher trying to update restricted fields.

### DELETE /api/students/:id

**Roles:** `admin`

Delete a student (or soft delete depending on implementation).

### GET /api/students/:id/attendance

**Roles:**

- `admin`, `teacher` – full access (subject to own classes).
- `student` – own record only.

Response (200):

```json
[
  { "date": "2026-03-01", "status": "present" },
  { "date": "2026-03-02", "status": "late" }
]
```

### GET /api/students/:id/medical

**Roles:** `nurse`, `admin`

Return medical history (sanitized).

### GET /api/students/:id/fees

**Roles:** `admin`, `secretary`, `student` (own)

Return fee records for a student.

---

## 4. Teachers

### GET /api/teachers

**Roles:** `admin`, `director`, `secretary`

List teachers with pagination and filters (e.g., department).

### GET /api/teachers/:id

**Roles:** `admin`, `director`, `secretary`

Single teacher details.

### POST /api/teachers

**Roles:** `admin`, `secretary`

Create teacher.

### PUT /api/teachers/:id

**Roles:** `admin`, `secretary`

Update teacher fields.

### DELETE /api/teachers/:id

**Roles:** `admin`

Delete teacher.

### GET /api/teachers/:id/classes

**Roles:**

- `teacher` – own classes only.
- `admin` – any teacher’s classes.

---

## 5. Classes

### GET /api/classes

**Roles:** `admin`, `director`, `teacher`

List classes with pagination.

### GET /api/classes/:id

**Roles:**

- `admin` – any class.
- `teacher` – only own classes.

### POST /api/classes

**Roles:** `admin`, `secretary`

Create a class (assign teacher, room, course).

### PUT /api/classes/:id

**Roles:** `admin`, `secretary`

Update class details.

### DELETE /api/classes/:id

**Roles:** `admin`

Remove a class.

### GET /api/classes/:id/students

**Roles:** `teacher` (own), `admin`

Return roster for a class.

### GET /api/classes/:id/attendance

**Roles:** `teacher` (own), `admin`

Return attendance summary for a class.

---

## 6. Attendance

### GET /api/attendance/class/:classId

**Roles:** `teacher` (own), `admin`

Get attendance records for a class (optionally by date range).

### POST /api/attendance/mark

**Roles:** `teacher` (own), `admin`

Mark attendance for multiple students in a class for a given date.

Request body (example):

```json
{
  "classId": "64fClass...",
  "date": "2026-03-01",
  "records": [
    { "studentId": "64fStu1", "status": "present" },
    { "studentId": "64fStu2", "status": "late" }
  ]
}
```

### GET /api/attendance/statistics

**Roles:** `admin`, `director`

Aggregate statistics (present/absent/late, rates) over a date range.

Query parameters:

- `startDate`
- `endDate`
- `classId` (optional)

### GET /api/attendance/student/:studentId

**Roles:**

- `admin`, `teacher` – any.
- `student` – own only.

---

## 7. Medical Records

### GET /api/medical/student/:studentId

**Roles:** `nurse`, `admin`

Return medical notes and health history for a student.

### POST /api/medical

**Roles:** `nurse`, `admin`

Create a new medical note/record.

### PUT /api/medical/:id

**Roles:** `nurse`, `admin`

Update a medical record.

### DELETE /api/medical/:id

**Roles:** `nurse`, `admin`

Delete or archive a medical record.

### GET /api/medical/incidents

**Roles:** `nurse`, `admin`

Return recent incidents (e.g., last N days).

---

## 8. Fees

### GET /api/fees

**Roles:** `admin`, `secretary`

Return all fee records with pagination and filters (status, date).

### GET /api/fees/student/:studentId

**Roles:** `admin`, `secretary`, `student` (own)

Return fee history for a specific student.

### POST /api/fees

**Roles:** `admin`, `secretary`

Create a new fee entry (invoice, payment, adjustment).

### PUT /api/fees/:id

**Roles:** `admin`, `secretary`

Update a fee record.

---

## 9. Library

### GET /api/books

**Roles:** all staff (`admin`, `director`, `teacher`, `nurse`, `secretary`)

Return paginated list of books.

### GET /api/books/:id

**Roles:** all staff

Single book details.

### POST /api/books

**Roles:** `admin` (and/or librarian if added)

Create book record.

### PUT /api/books/:id

**Roles:** `admin`

Update book info.

### DELETE /api/books/:id

**Roles:** `admin`

Remove a book.

### POST /api/books/:id/borrow

**Roles:** all staff

Record a borrowing action.

### POST /api/books/:id/return

**Roles:** all staff

Record a return action.

---

## 10. File Uploads

### POST /api/upload/profile

**Roles:** any authenticated user

Upload a profile picture for the logged-in user (or student, if using `studentId`).

Request:

- Multipart/form-data with `file` field.

Response (201):

```json
{ "url": "https://bucket.s3.region.amazonaws.com/profiles/user123.jpg" }
```

### POST /api/upload/document

**Roles:** `admin`, `secretary`, `teacher`

Upload general documents (PDF).

### POST /api/upload/medical

**Roles:** `nurse`, `admin`

Upload medical documents (images/PDF).

### DELETE /api/upload/:key

**Roles:** `admin`

Delete an object from S3 by its key.

---

## 11. Error Codes

- `400` – Validation failed / bad request.
- `401` – Authentication required / invalid token.
- `403` – Forbidden (role or ownership violation).
- `404` – Resource not found.
- `409` – Conflict (duplicate email/username).
- `429` – Too many requests (rate limiting).
- `500` – Internal server error.

