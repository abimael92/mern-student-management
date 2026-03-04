# User Manual – School Management System

This guide explains how each role uses the system in day‑to‑day operations.

Roles:

- Admin
- Director
- Teacher
- Student
- Nurse
- Secretary

---

## 1. Admin

### 1.1 Logging in

- Navigate to the login page.
- Use the default credentials (for local dev):  
  `admin@school.edu / Admin@2024Secure!`
- After login, you will be redirected to `/admin`.

### 1.2 Creating Users

1. From the sidebar, click **Users**.
2. Use the **User Management** table to:
   - View existing users.
   - Filter/sort the list.
3. Click the “Create User” button (if implemented) or use Postman against:
   - `POST /api/users` with `{ username, email, password, role, profile }`.
4. Confirm the new user appears in the table.

### 1.3 Assigning Roles

1. Open **Users** in the Admin dashboard.
2. Find the user whose role you want to change.
3. Use the **Role dropdown** to pick a new role.
4. The UI calls `PATCH /api/users/:id/role`; the change applies immediately.

### 1.4 Viewing Audit Logs

1. Navigate to **Audit Logs** (or equivalent menu item).
2. You will see a list of actions:
   - Who performed the action (user and role).
   - What they did (e.g., `student.create`, `fee.update`).
   - When it happened.
   - From which IP/user agent.
3. Use filters (date/user/action) to narrow results if implemented.

### 1.5 System Settings

1. Go to **Settings**.
2. Configure:
   - Academic year and terms.
   - Feature toggles (e.g., enable/disable modules).
   - Global notification preferences.
3. Settings changes are typically persisted via `PUT /api/settings` (endpoint may be implemented according to your needs).

---

## 2. Director

### 2.1 Logging in

- Use default (dev) credentials:  
  `director@school.edu / Director@2024Secure!`
- You will be redirected to `/director`.

### 2.2 Viewing KPIs and Dashboards

1. The Director dashboard shows:
   - Attendance trends.
   - Grade distributions.
   - Fee collection status.
   - Teacher performance summaries.
2. Data is read‑only and pulled from:
   - Attendance endpoints (`/api/attendance/statistics`, `/api/attendance/trends`).
   - Grade/fee statistics endpoints.

### 2.3 Generating Reports

1. From the reports section, choose:
   - Time range.
   - Target group (grade, class, department).
2. Click **Generate Report**.
3. The system may:
   - Render an on‑screen report.
   - Offer PDF/CSV export via a report endpoint (e.g., `/api/reports/...`).

### 2.4 School Overview

1. Use the **School Overview** or **Analytics** pages.
2. Review:
   - Enrollment numbers and trends.
   - Average attendance and grades by grade level.
   - Key alerts (low attendance, failing rates).

---

## 3. Teacher

### 3.1 Logging in

- Default dev teacher:  
  `wilson@school.edu / Teacher@2024Secure!`
- You will be redirected to `/teacher`.

### 3.2 Viewing My Classes

1. From the sidebar, click **My Classes**.
2. The system calls `GET /api/teachers/:id/classes` or `GET /api/classes` filtered by your teacher id.
3. Each card/row shows:
   - Class name and section.
   - Grade level.
   - Room and schedule.

### 3.3 Marking Attendance

1. Go to **Mark Attendance**.
2. Select a class and date.
3. A grid is displayed with:
   - List of enrolled students.
   - Status per student (`present`, `absent`, `late`, `excused`).
4. Select statuses and submit.
   - This calls `POST /api/attendance/mark`.
5. Confirm the success message and that stats update on the dashboard.

### 3.4 Adding Grades

> Implementation may use a `Grades` screen and related endpoints.

1. Navigate to **Grades**.
2. Choose:
   - Class.
   - Assignment/test.
3. Enter grades for each student.
4. Submit, which calls the grade API to persist entries.

### 3.5 Contacting Parents

1. View a student’s **details** (via Student Details page or roster).
2. Access parent contact info (email/phone).
3. Record parent communication in a log (if implemented) that is stored as notes or a communication record via dedicated endpoints.

---

## 4. Student

### 4.1 Logging in

- Example default student:  
  `emma.j@student.edu / Student@2024Secure!`
- Redirects to `/student`.

### 4.2 Viewing My Profile

1. Go to **My Profile**.
2. View:
   - Name and ID.
   - Grade and homeroom.
   - Contact info.
   - Emergency contact summary (as allowed).
3. Profile is read‑only for students.

### 4.3 Checking Attendance

1. Navigate to **My Attendance**.
2. The UI calls `GET /api/attendance/student/me`.
3. See:
   - Daily records (date + status).
   - Summary statistics (present %, absent %, late %).
4. Use filters by date range if available.

### 4.4 Viewing Grades

1. Use the **Grades** or **Report Card** view.
2. Review:
   - Grades by course, term, or assignment.
3. All data is read‑only for students.

### 4.5 Downloading Documents

1. Open the **Documents** or **Downloads** section.
2. Click a document to:
   - Get a time‑limited pre‑signed URL from the API.
   - Download via the browser.

---

## 5. Nurse

### 5.1 Logging in

- Default (dev):  
  `nurse@school.edu / Nurse@2024Secure!`
- Redirect to `/nurse`.

### 5.2 Adding Health Records

1. Navigate to **Health Records**.
2. Search for a student by name or ID.
3. Open the student’s health profile.
4. Add a new record:
   - Type (incident, routine check, allergy, etc.).
   - Description.
   - Actions taken.
5. Save, which calls `POST /api/medical`.

### 5.3 Tracking Immunizations

1. In the health record view, switch to **Immunizations**.
2. Add/update:
   - Vaccine name.
   - Date administered.
   - Next due date.
3. Save via the medical or immunization endpoints.

### 5.4 Logging Incidents

1. When an incident occurs (e.g., injury, symptoms):
   - Open the student’s health record.
   - Create an **Incident** entry with:
     - Date/time.
     - Description.
     - First aid given.
     - Recommendations.
2. These are accessible via `GET /api/medical/incidents` for trend analysis.

---

## 6. Secretary

### 6.1 Logging in

- Default (dev):  
  `secretary@school.edu / Secretary@2024Secure!`
- Redirect to `/secretary`.

### 6.2 Enrolling a New Student

1. Go to **Enrollment**.
2. Fill in:
   - Student personal information.
   - Grade and homeroom.
   - Contact and emergency details.
3. Submit:
   - Sends `POST /api/students`.
4. Optionally create a login account by having Admin create a linked user.

### 6.3 Uploading Documents

1. Within Enrollment or Documents section, use the **document upload** interface.
2. Drag and drop PDF/images or click to browse.
3. System calls:
   - `POST /api/upload/document` and associates the document with the student or enrollment.
4. Verify the document appears in the student’s document list.

### 6.4 Managing Schedules

1. Open the **Schedule** or **Classes** management UI.
2. Create or adjust:
   - Classes (Grades 10A, 10B, 11A, etc.).
   - Timetables (which class in which room at what period).
3. Actions are mapped to:
   - `/api/classes` CRUD endpoints.
   - Room assignment routes, if configured.

---

## 7. Director (Summary of Interactions)

Directors typically work in **read‑only analytics** mode:

- Review dashboards (attendance, grades, fees).
- Generate reports.
- Provide feedback to admin and teachers based on performance indicators.

No destructive operations (create/delete) are permitted by default for Director.

---

## 8. General Notes

- If you see a **403 Forbidden**, your role does not have permission for that action.
- If you see a **401 Unauthorized**, your session may have expired; log in again.
- Use the **logout** button in the header to safely end your session.

