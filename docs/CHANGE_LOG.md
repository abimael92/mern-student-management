# Change Log – School Management System

All notable changes to this project will be documented in this file.

---

## [0.3.0] – Role-Based Frontend & Security Hardening

### Added

- Role-based React frontend with layouts and dashboards for:
  - Admin, Director (placeholder), Teacher, Student, Nurse, Secretary.
- Centralized Axios client with 401 handling and optional JWT header.
- Redux Toolkit `authSlice` for login/logout and user state.
- File upload component with drag & drop and basic error handling.
- Documentation: `API_DOCS.md`, `USER_MANUAL.md`, `DEPLOYMENT_GUIDE.md`, `TROUBLESHOOTING.md`, `MONITORING.md`.

### Changed

- `App.jsx` now uses protected routes and per-role layouts.
- `main.jsx` now wraps app with MUI theme and React Router.

### Security

- Added helmet, rate limiting, input sanitization (mongoSanitize, xss-clean, hpp).
- Hardened error handler to avoid leaking stack traces in production.

---

## [0.2.0] – Auth & RBAC Backend

### Added

- `User` model with roles: `admin`, `director`, `teacher`, `student`, `nurse`, `secretary`.
- JWT-based authentication:
  - Short-lived access tokens.
  - Refresh tokens persisted in DB.
  - `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`, `/api/auth/refresh`.
- Role-based middleware:
  - `authRequired` and `restrictTo`.
- Audit log model and logger for CRUD actions.

### Security

- Moved auth tokens to httpOnly cookies (optional header-based auth for APIs).
- Introduced rate limiting on `/api` and stricter limits on `/api/auth`.

---

## [0.1.0] – Initial Academix Implementation

### Added

- Core backend modules:
  - Students, Teachers, Classes, Courses, Subjects, Attendance, Rooms, Library.
- Core frontend pages:
  - Landing page, Dashboard, Attendance, Analytics, Fees (mock), Transport, Library, Students, Teachers.
- MongoDB schemas for main school entities.

### Notes

- Authentication was skeletal (JWT middleware only, no User model).
- Most routes were open (no real RBAC).

