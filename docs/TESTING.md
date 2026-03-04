# Testing Guide – School Management System

This document explains how to run automated tests, interpret coverage, and perform manual test cases for each role.

---

## 1. Backend Testing

### 1.1 Test Stack

- Test runner: Jest or Mocha (depending on configuration).
- HTTP testing: Supertest.
- Database: MongoDB test database (use a separate URI).

### 1.2 Environment

Create a `.env.test` for backend:

```env
MONGO_URI=mongodb://localhost:27017/schoolManagement_test
JWT_SECRET=test_jwt_secret
JWT_REFRESH_SECRET=test_refresh_secret
```

Ensure tests use this environment when running.

### 1.3 Running Tests

From `backend`:

```bash
npm test
```

or if using Jest:

```bash
npm run test:unit
```

### 1.4 What to Test

**Models:**

- `User`:
  - Password hashing and `matchPassword`.
  - Role enum validation.
- `Student`, `Teacher`, `Class`, `AttendanceRecord`, `MedicalNote`, `Fee`, `LibraryBook`:
  - Required fields.
  - Virtuals and hooks.

**Controllers / Routes:**

- Auth:
  - `/api/auth/login`:
    - Valid and invalid credentials.
    - Token issuance and cookie behavior (if tested at HTTP layer).
  - `/api/auth/refresh`:
    - Valid refresh token rotation.
    - Invalid/expired token rejection.
- RBAC:
  - Each protected endpoint:
    - Authorized role receives 200/201.
    - Unauthorized roles receive 403.
    - Unauthenticated receives 401.
- CRUD:
  - Students, teachers, classes, attendance, fees, medical, library.

### 1.5 Coverage

If configured (e.g., Jest):

```bash
npm run test:coverage
```

Aim for:

- Models: 90%+
- Controllers: 80%+

---

## 2. Frontend Testing

### 2.1 Test Stack

- Unit/component tests: Jest + React Testing Library.

### 2.2 Running Tests

From `frontend`:

```bash
npm test
```

(Assumes a test script is configured.)

### 2.3 What to Test

- Auth components:
  - `LoginPage` renders and validates input.
  - Successful login dispatches `authSlice.login` and redirects by role.
- Layouts:
  - `ProtectedRoute` blocks unauthorized access.
  - Role layouts render correct navigation items.
- Core components:
  - `DataTable` pagination and rendering.
  - `FileUpload` state transitions on success/failure (mock API).

---

## 3. Manual Test Cases by Role

### 3.1 Admin

- [ ] Login as admin.
- [ ] Access `/admin` dashboard.
- [ ] View user list.
- [ ] Create a new teacher user.
- [ ] Change a user’s role.
- [ ] Access student and teacher lists.
- [ ] Access audit logs (if UI exists).
- [ ] Attempt to access nurse/secretary routes (should still be allowed as admin).

### 3.2 Teacher

- [ ] Login as teacher.
- [ ] Access `/teacher` dashboard.
- [ ] View own classes.
- [ ] Mark attendance for a class.
- [ ] Attempt to delete a student (should be forbidden).

### 3.3 Student

- [ ] Login as student.
- [ ] Access `/student` dashboard.
- [ ] View **My Profile**.
- [ ] View **My Attendance**.
- [ ] Attempt to access `/admin/users` (should redirect/403).

### 3.4 Nurse

- [ ] Login as nurse.
- [ ] Access `/nurse` dashboard.
- [ ] Search for student and add a health record.
- [ ] View recent incidents.
- [ ] Attempt to access user management (should be forbidden).

### 3.5 Secretary

- [ ] Login as secretary.
- [ ] Access `/secretary` dashboard.
- [ ] Enroll a new student.
- [ ] Upload a document for a student.
- [ ] Attempt to delete a user (should be forbidden).

---

## 4. Security and Regression Tests

After changes to auth or RBAC:

- [ ] Confirm all 6 roles can log in.
- [ ] Confirm each protected endpoint rejects non‑authenticated access.
- [ ] Confirm mis‑matched roles get 403 (e.g., student hitting `/api/users`).
- [ ] Run `npm audit` in backend and frontend:

```bash
cd backend && npm audit
cd ../frontend && npm audit
```

Upgrade or patch vulnerable packages as needed.

