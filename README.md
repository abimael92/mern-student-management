# School Management System

MERN stack school management platform with **6 roles**:

- **Admin**
- **Director**
- **Teacher**
- **Student**
- **Nurse**
- **Secretary**

The system provides secure, role‑based access to core school operations: user management, classes, attendance, grades, fees, medical records, documents, and analytics.

---

## Quick Start

### 1. Clone repository

```bash
git clone https://github.com/your-org/school-management.git
cd school-management
```

### 2. Install dependencies

At the project root:

```bash
npm run install-all
```

> Configure `install-all` in `package.json` to run `npm install` in both `backend` and `frontend`.

### 3. Configure environment variables

Copy `.env.example` into backend and frontend as needed and update values:

```bash
cp .env.example backend/.env
cp .env.example frontend/.env   # or create a separate frontend .env
```

Set:

- `MONGO_URI`
- `JWT_SECRET`, `JWT_REFRESH_SECRET`
- AWS credentials and bucket
- `VITE_API_URL`

See **`.env.example`** for details.

### 4. Seed database

```bash
cd backend
npm run seed
```

This will:

- Reset the target database.
- Create all collections with indexes.
- Seed users for all 6 roles.
- Seed students, classes, attendance, fees, and medical data.

### 5. Start development servers

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` (or your Vite dev port).

---

## Default Logins

Use these accounts in **local development** after running the seed script.

- **Admin**
  - Email: `admin@school.edu`
  - Password: `Admin@2024Secure!`
- **Admin (secondary)**
  - Email: `admin2@school.edu`
  - Password: `Admin@2024Secure!`
- **Director**
  - Email: `director@school.edu`
  - Password: `Director@2024Secure!`
- **Teacher**
  - Email: `wilson@school.edu`
  - Password: `Teacher@2024Secure!`
- **Student**
  - Email: `emma.j@student.edu`
  - Password: `Student@2024Secure!`
- **Nurse**
  - Email: `nurse@school.edu`
  - Password: `Nurse@2024Secure!`
- **Secretary**
  - Email: `secretary@school.edu`
  - Password: `Secretary@2024Secure!`

> Additional seeded teachers and students follow the naming patterns described in `SEED_DATA_COMPLETE.json`.

---

## High‑Level Features

- **Authentication & Security**
  - JWT‑based auth with short‑lived access tokens and rotated refresh tokens.
  - Role‑based access control (RBAC) for 6 roles.
  - httpOnly cookies, Helmet, rate limiting, input sanitization, Mongo injection + XSS protection.

- **Admin**
  - User management (CRUD).
  - Role assignment.
  - System settings.
  - Audit logs viewer.

- **Director**
  - Read‑only analytics: attendance trends, grade distributions, fee statistics.
  - School performance and reports.

- **Teacher**
  - Own classes and rosters.
  - Attendance marking for own classes.
  - Grade management and student notes.

- **Student**
  - Self‑service dashboard.
  - Profile (read‑only).
  - Attendance history and grades.
  - Fee status and documents.

- **Nurse**
  - Health records per student.
  - Immunization and incident logging.
  - Medical document uploads.

- **Secretary**
  - Student enrollment and documentation.
  - Timetable and schedule management.
  - Communication logs.

- **Infrastructure**
  - MongoDB with indexes and seeding.
  - AWS S3 for file storage (profile pictures, documents, medical files).
  - Optional Redis caching for frequent queries.

---

## Project Structure

```text
backend/      # Express API, models, controllers, middleware
frontend/     # React + Vite SPA with role-based dashboards
scripts/      # Seed, backup, and maintenance scripts
docs/         # API docs, user manual, deployment, testing, monitoring
```

See:

- `API_DOCS.md` – All endpoints and roles.
- `USER_MANUAL.md` – Role‑specific usage.
- `DEPLOYMENT_GUIDE.md` – Local & production deployment.
- `TESTING.md` – How to run and interpret tests.
- `MONITORING.md` – Logging, alerting, performance.
- `TROUBLESHOOTING.md` – Common issues and fixes.

---

## Scripts

From the **root**:

- `npm run install-all` – Install dependencies for backend and frontend.
- `npm run seed` – Run backend seeding.
- `npm run dev` – Start both backend and frontend in dev (if configured via a root script).

From **backend**:

- `npm run dev` – Start API in development.
- `npm run seed` – Reset and seed MongoDB with sample data.
- `npm test` – Run backend tests (models, API, RBAC).

From **frontend**:

- `npm run dev` – Start Vite dev server.
- `npm run build` – Build production bundle.

---

## Contributing

See `CONTRIBUTING.md` for:

- How to set up your dev environment.
- Coding standards and linting.
- Pull request process.
- Testing and review requirements.

---

## License

This project is released under the MIT License. See `LICENSE` for details.
