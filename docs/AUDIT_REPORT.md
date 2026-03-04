# Academix MERN App – Full Audit Report

## 1. Overview

This document summarizes the current state of your Academix school management MERN app based on the existing codebase in this repository. It focuses on:

- Implemented features (backend + frontend).
- Authentication and role system status.
- Security vulnerabilities and exposure.
- Performance and scalability concerns.
- Gaps relative to a 6‑role school management system:
  - Admin, Director, Teacher, Student, Nurse, Secretary.

---

## 2. Working Features

### 2.1 Backend Features

**Students**
- `GET /api/students` – List all students (no pagination or auth).
- `GET /api/students/lastStudentNumber` – Compute the next student number based on year and existing records.
- `POST /api/students` – Create a student with validation, auto‑generating `studentNumber`.
- `PUT /api/students/:id` – Update a student by Mongo `_id`.
- `PUT /api/students/:id/assign` – Assign a student to a class and update both sides in a transaction.
- `PATCH /api/students/:id/status` – Toggle `isEnrolled`.
- `DELETE /api/students/:id` – Delete a student by `studentNumber`.

**Teachers**
- `GET /api/teachers` – List all teachers.
- `GET /api/teachers/lastTeacher` – Compute next teacher number.
- `POST /api/teachers` – Create a teacher record with number generation.
- `PUT /api/teachers/:id` – Update teacher data.
- `PUT /api/teachers/:id/assign` – Assign a teacher to a class (updates class and teacher classes array in a transaction, handles reassignment).
- `PATCH /api/teachers/:id/status` – Toggle `isActive`.
- `DELETE /api/teachers/:id` – Delete teacher by `_id`.

**Classes / Courses / Subjects / Periods**
- `Class` module:
  - Class schema with teacher, students, room, course, status, etc.
  - `GET /api/classes` – List classes.
  - `POST /api/classes` – Create class (validated).
  - `PUT /api/classes/:id` – Update class.
  - `PUT /api/classes/:id/assign-room` – Assign a room to a class.
  - `PUT /api/classes/:id/assign-course` – Assign a course to a class.
  - Temporary booking endpoints for special room usage.
- `Course` module:
  - Course schema with subject, semester, prerequisites, and auto‑generated `courseCode`.
  - CRUD routes/controllers for courses.
- `Subject` and `Semester` modules:
  - Schemas and routes for academic taxonomy (subjects, periods/semesters).

**Rooms**
- Room schema with:
  - Building, floor, room type, capacity, accessibility, equipment.
  - `currentOccupancy` and helper statics for availability search.
- Routes:
  - `POST /api/rooms` – Create room.
  - `GET /api/rooms` – List rooms.

**Attendance**
- Schema for daily attendance records (status, date, student, class, check‑in/out, remarks, indexes).
- `GET /api/attendance` – Get attendance by date/class.
- `POST /api/attendance` – Mark attendance for an entire class/day (bulk insert in a transaction).
- `GET /api/attendance/stats` – Aggregate present/absent/late counts and attendance rate.
- `GET /api/attendance/trends` – Daily attendance trends for a class (or all) over an interval.

**Library / Alerts / Misc**
- Library:
  - Book schema and `books` controller/routes for a simple library/inventory.
- Alerts:
  - `alert` model and `/api/alerts` routes for system alerts/notifications.

**Infrastructure**
- `server.js` wires routes, connects MongoDB, serves built frontend, and has a basic error handler.
- `config/db.js` handles MongoDB connection with logging and failure on missing URI.
- `config/s3.js` configures S3 client and tests connectivity at startup.
- `middlewares/error.middleware.js` centralizes error responses (500).
- `middlewares/auth.middleware.js` provides:
  - `protect` – JWT verification and attaching `req.user` (currently unused).
  - `restrictTo` – role gate based on `req.user.role` (currently unused).

---

### 2.2 Frontend Features

**Global App / Layout**
- React + Vite + Redux + MUI.
- `App.jsx` sets up routing:
  - `/` – LandingPage marketing view.
  - `/login` – Login form (Formik + Yup, no backend integration yet).
  - `/dashboard` – DashboardPage with cards/widgets.
  - `/analytics` – Rich analytics dashboard.
  - `/students`, `/teachers`, `/academics`, `/attendance`, `/fees`, `/transport`, `/library`.
- Theme and layout:
  - Header with navigation.
  - Footer.
  - MUI theming and responsive layout.

**Students**
- Student list table/cards with:
  - Filters (name, last name, age, grade, tutor, nationality).
  - Edit dialog.
  - Enrollment status toggle.
  - Delete action.
- Redux slice for students:
  - Fetch all students.
  - Update student.
  - Delete student.
  - Toggle status.

**Teachers**
- Teacher list and filters.
- CRUD operations via Redux actions:
  - Create, update, delete teacher.
  - Assign classes.

**Attendance**
- `AttendancePage` with:
  - Calendar view, day grid, attendance entry (per student present/absent/late).
  - Statistics cards.
  - Trends chart.
  - Integration with `/api/attendance` endpoints.

**Academics / Analytics**
- Academics:
  - Course builder and manager.
  - Subject management and performance overview.
- Analytics:
  - Dashboard for grades, performance, attendance using charts.
  - Heavy use of MUI + custom chart components and some mock data.

**Fees / Transport / Library**
- Fees:
  - Enhanced fee dashboards (summary, analytics, history, quick actions).
  - Mostly mock data; no fee backend model yet.
- Transport:
  - Overviews for routes, vehicles, driver assignments, schedules.
  - UI is rich but currently mostly frontend logic.
- Library:
  - LibraryPage with cards for books, filtering/search.
  - Uses backend library routes.

---

## 3. Authentication and Role System Status

**Authentication**
- JWT middleware (`middlewares/auth.middleware.js`) exists but:
  - There is no `User` model.
  - No `/auth/login`, `/auth/register`, or `/auth/me` endpoints.
  - No password handling or bcrypt usage.
  - No refresh token implementation.
- The frontend `LoginPage` is purely UI:
  - Does not submit to any API.
  - Merely logs values to console.

**Role System**
- `restrictTo(...roles)` middleware references `req.user.role` but:
  - No place sets `req.user` from a `User` document.
  - No roles are defined in the database.
- No role‑specific routes or UI:
  - No separate layouts/dashboards for Admin, Director, Teacher, Student, Nurse, or Secretary.

**Conclusion:**
- At the moment, the app runs effectively as a **single anonymous admin**. Everything is public and there is no real auth or RBAC enforcement.

---

## 4. Database Structure (Current)

**MongoDB Schemas Present**
- `Student` (`modules/students/student.schema.js`):
  - Academic: `studentNumber`, `gradeLevel`, `gradeAlias`, `homeroom`, `enrolledClasses`, `advisor`, `extracurriculars`, `noteIds`.
  - Personal: `firstName`, `lastName`, `dateOfBirth`, `gender`, `nationality`.
  - Contact: `contact.email`, `contact.phone`, nested address fields.
  - Emergency: `emergencyContacts` array.
  - Meta/timestamps, virtuals `fullName`, `gradeDisplay`.
- `Teacher`:
  - Identification: `teacherNumber`, `firstName`, `lastName`, `profilePicture`.
  - Status: `isActive`, `status`.
  - Contact + emergency contact.
  - Professional: qualifications, certificates, yearsOfExperience, hireDate.
  - References: department, classes, notes, extracurriculars.
  - Virtuals: `fullName`, `yearsAtSchool`.
- `Class`:
  - Name, section, code, teacher, students, room, course, status, etc.
- `Course`, `Subject`, `Semester`:
  - Course: `courseCode`, `name`, `credits`, `description`, `subject`, `semester`, `prerequisites`.
  - Subject/Semester: core taxonomy for academics.
- `Room`:
  - Identification and location.
  - `currentOccupancy`, `availablePeriods`, `maintenanceSchedule`.
  - Virtuals and static helpers plus indexes.
- `AttendanceRecord`:
  - `date`, `status`, `checkInTime`, `checkOutTime`, `remarks`, `session`, `isExcused`, `excuseNote`.
  - References to `Student` and `Class`.
  - Several indexes on `student`, `class`, `date`, `status`.
- Library / Extra:
  - `Book`, `Grade`, `Department`, `Alert`, `Note`, `Extracurricular`.

**Not Present**
- No `User` collection for login accounts.
- No `Fee`, `MedicalNote`, or `Document` models yet.
- No explicit indexing on many high‑traffic collections (students/teachers) other than defaults.

---

## 5. Security Holes

### 5.1 Critical Issues

**1. No effective authentication**
- No login endpoint or password storage.
- All routes can be hit without a token.
- `protect` middleware is not applied anywhere in `server.js` route wiring.

**2. No role‑based access control**
- No `User` model or `role` field.
- `restrictTo` middleware is never used.
- Every endpoint is effectively admin‑level but open to the world.

**3. S3 Upload endpoint is public and unrestricted**
- `POST /api/upload`:
  - No auth check.
  - Accepts any file type.
  - No size limits.
  - Directly uploads to AWS S3 using application credentials.
  - Returns a public URL for the uploaded object.

**4. PII exposed over unauthenticated APIs**
- Students and teachers endpoints return full personal data (emails, addresses, emergency contacts, DOB, etc.) to any caller.

### 5.2 High Severity

**5. No rate limiting or brute‑force protection**
- No `express-rate-limit` on auth or any sensitive path.
- DoS or brute‑force attempts are unchecked.

**6. Missing security middleware**
- No `helmet` for secure HTTP headers.
- No explicit XSS/NoSQL injection hardening beyond Mongoose defaults.
- CORS is dev‑configured (`origin: http://localhost:5173`) and must be tightened for production.

**7. Mass assignment vulnerabilities**
- Several `findByIdAndUpdate(req.body)` operations use unfiltered `req.body`.
- If new sensitive fields are added later, they will be mass‑assignable without code changes.

### 5.3 Medium / Low

**8. Inconsistent error handling**
- Some controllers log raw error objects; others use generic messages.
- Risk of leaking internal details in production logs if not configured carefully.

**9. No audit logging**
- No mechanism to track who did what (e.g., who created/updated/deleted students, marked attendance, etc.).

---

## 6. Performance Issues

### 6.1 Backend

**1. No pagination on list endpoints (CRITICAL)**
- `GET /api/students`, `/teachers`, `/classes`, `/rooms`, `/library` etc. always return full collections.
- This will not scale as data grows and increases response times and memory usage.

**2. Limited indexing (HIGH)**
- Good indexes exist on attendance and rooms.
- Students/teachers lack explicit indexes on common query keys:
  - `studentNumber`, `teacherNumber`.
  - Name fields and grade level.

**3. No caching (HIGH)**
- Repeatedly queried analytics (attendance stats/trends, class lists, etc.) always hit MongoDB.
- No Redis/in‑memory caching is used.

### 6.2 Frontend

**4. Mock vs. real data (MEDIUM)**
- Analytics and fees rely heavily on mock data.
- Data fetching is not centralized (no RTK Query/React Query).

**5. Overfetching (MEDIUM)**
- Lists return full documents even when only a subset of fields is needed for dropdowns or summary views.

---

## 7. Gaps vs. 6‑Role School Management Requirements

Roles: **Admin, Director, Teacher, Student, Nurse, Secretary**

### 7.1 Missing Backend Capabilities

- **User accounts & roles**
  - No `User` schema with role enum.
  - No separate auth routes (`/api/auth/login`, `/api/auth/register`, `/api/auth/me`, `/api/auth/refresh`).

- **Role scoping rules**
  - No resource‑level rules such as:
    - Teacher: only own classes/students.
    - Student: only own records.
    - Nurse: limited access to health + emergency info.
    - Secretary: manage enrollments, documents, schedules.
    - Director: read‑only analytics and KPIs.

- **Domain modules per role**
  - Fees: no `Fee` model or endpoints.
  - Medical: no `MedicalNote`/health record model or endpoints.
  - Documents: no structured `Document` model, despite S3 being used.

### 7.2 Missing Frontend Capabilities

- No role‑specific layouts or dashboards:
  - Admin: user/role management, system settings, audit logs.
  - Director: school KPIs, analytics, reports.
  - Teacher: my classes, attendance, grading, student notes.
  - Student: self‑service profile, attendance/grades/fees, library.
  - Nurse: health dashboard, records, immunizations, incidents.
  - Secretary: enrollment, documents, communication, scheduling.

- The `LoginPage` does not integrate with any backend auth or redirect by role.

---

## 8. Recommended Next Steps (Prioritized)

### 8.1 Critical (Do First)

1. **Introduce a User model and auth endpoints**
   - Create `User` schema with `username`, `email`, `password` (bcrypt hashed), `role` enum, `profile`.
   - Add `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`, `/api/auth/refresh`.
   - Use httpOnly cookies for access + refresh tokens and enforce 30‑minute session lifetimes.

2. **Protect all backend routes**
   - Apply `protect` to all API routes.
   - Use `restrictTo` (or a more expressive RBAC layer) with specific rules per controller.

3. **Secure S3 uploads**
   - Require auth on `/api/upload`.
   - Enforce file type/size limits and sanitize filenames.
   - Prefer private bucket + pre‑signed URLs or CloudFront over fully public objects.

4. **Add pagination and basic indexing**
   - Implement standard query helpers (`page`, `limit`, `sort`, `filter`) using `apiFeatures`.
   - Add indexes on high‑traffic fields in students, teachers, classes.

### 8.2 High Priority

5. **Implement role‑specific dashboards and flows**
   - Build separate frontend layouts for each role with appropriate menus and dashboards.
   - Add backend policies to enforce per‑role access and ownership.

6. **Add missing domain models**
   - `Fee`, `MedicalNote`, `Document`, and possibly `UserSession`/`RefreshToken`.

7. **Add rate limiting and security middleware**
   - `helmet`, `express-rate-limit`, and input sanitization (`express-validator` with sanitizers).

### 8.3 Medium / Long Term

8. **Caching and reporting**
   - Redis for hot queries (attendance stats, dashboards).
   - Report generator for director/admin (PDFs, CSV exports).

9. **Audit logs and soft deletes**
   - Per‑action logs with user ids and timestamps.
   - Soft delete for sensitive entities (students, teachers) instead of hard deletes.

---

## 9. Summary

The current Academix codebase delivers a strong foundation for a school management app: rich data models for students/teachers/classes/attendance, a polished frontend with many pages, and some S3 integration. However, **authentication, authorization, and role separation are essentially absent**, and many modules (fees, medical, reporting) are either frontend‑only or missing entirely.

The next major milestone should be a **proper auth + RBAC layer**, secure S3 usage, and pagination/indexing across all list endpoints. Once that backbone is in place, the app can safely support the full six‑role experience (Admin, Director, Teacher, Student, Nurse, Secretary) that you are targeting.

