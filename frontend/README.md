# School Management System (M.E.R.N)

A modular system for academic scheduling, attendance, payroll, and more.  Student Management

## Overview

This is a full-stack MERN application that allows for student management. The project contains both a **frontend** built with React and a **backend** built with Node.js and Express. The frontend and backend are configured to run concurrently.

---

## Core Features

Flexible Academic Calendar (Semester/Trimester/Quarter).

Subject → Course → Class hierarchy with room/teacher assignment.

Role-based access (Teachers, Nurses, Admin).

Attendance, Notes, Payroll, and Extracurriculars.

---

## System UML (Simplified)

classDiagram
    SchoolYear "1" --> "*" Period : contains
    Subject "1" --> "*" Course : offers
    Course "1" --> "*" Class : has_sessions
    Class "1" --> "1" Room : uses
    Class "1" --> "1" Teacher : taught_by
    Class "1" --> "*" Student : enrolls
    Student "1" --> "*" Attendance : has
    Teacher "1" --> "1" Payroll : paid_via
    Subject "1" --> "1" Department : belongs_to

---

## Workflow Diagram

flowchart TD
    A[Set School Year] --> B[Add Periods e.g. Semester 1]
    B --> C[Create Subjects e.g. Math]
    C --> D[Add Courses e.g. Algebra 101]
    D --> E[Schedule Classes + Assign Rooms/Teachers]
    E --> F[Enroll Students]
    F --> G[Track Attendance/Notes]
    G --> H[Run Payroll]

---


## Setup Guide

# 1. Configure Academic Timeline

### Step 1: Create a School Year

Fields: start_date, end_date, active, calendar_type (Semester/Trimester/Quarter).

### Step  2: Add Periods

 ```
Example for Semesters:

Period 1: "Fall 2025" (Sep-Dec)

Period 2: "Spring 2026" (Jan-May)
 ```

# 2. Define Subjects & Courses

- Subjects are containers for courses:

subject_id, name, grade_level, department, duration (Year/Semester).

- Courses are instances of subjects:

course_id, subject_id, period_id (links to Semester 1/2), prerequisites.

 ```
Example:

Subject: Mathematics (Grade 10, Year-long)

Course 1: Algebra 101 (Semester 1)

Course 2: Geometry 102 (Semester 2)
 ```

# 3. Schedule Classes

- For each Course, create Classes:

class_id, course_id, room_id (auto-checks capacity), time_slot, teacher_id.

-- Rules:

Rooms can’t be double-booked for the same time.

Teachers can’t teach overlapping classes.

# 4. Assign Students & Track Data

Enrollment: Link student_id to class_id.

Attendance: Per-class, recorded by teachers.

-- Notes: Tagged by role (e.g., nurse notes are medical-only).

# 5. Payroll & Extras
Salaries: Base pay + extracurricular bonuses.

--- Extracurriculars: Treated like courses but flagged is_extracurricular=True.

# Visual Examples

## 1. Subject/Course Timeline

 ```
Mathematics (Grade 10, Year-long)
├── Semester 1: Algebra 101
│   ├── Class A: Mon/Wed 9 AM (Room 2B) 
│   └── Class B: Tue/Thu 1 PM (Room 3A)
└── Semester 2: Geometry 102
    └── Class A: Mon/Fri 10 AM (Room 2B)
```

## 2. Room Booking Conflict Check

```
Room	Time	Monday	Tuesday
2B	9:00-10:30	Algebra 101	Available
2B	11:00-12:30	Available	Physics 201
```



## 3. School Year

year_id, start_date, end_date, is_active

Settings: Toggle between:

Semesters (2)

Trimesters (3)

Quarters (4)

Terms (custom, e.g., "Summer Intensive")

## Periods

1. period_id, year_id, name (e.g., "Semester 1"), start_date, end_date

2. Subject & Course Management

## Subjects

subject_id, name (e.g., "Mathematics"), department (e.g., "STEM"), grade_level (e.g., "9-12"), is_extracurricular (T/F)

## Courses

course_id, subject_id, name (e.g., "Algebra 101"), description, credit_hours, prerequisite_course_id, is_year_long (T/F)

3. Class & Room Scheduling

Classes

class_id, course_id, period_id (links to Semester/Trimester), teacher_id, room_id, max_students (auto-pulled from room capacity), time_slot (e.g., "Mon/Wed 9:00-10:30")

Rooms

room_id, name (e.g., "Room 2B"), capacity, type (e.g., "Lab", "Lecture Hall"), department_restriction (optional)

Time Slots

slot_id, start_time, end_time, day_of_week (for conflict checks)

4. People & Roles

Teachers

teacher_id, department, is_extracurricular_supervisor (T/F), salary_id

Students

student_id, grade_level, extracurricular_activities (list)

Staff

staff_id, role (e.g., "Nurse", "Secretary"), department

5. Attendance & Notes
 
 Attendance

attendance_id, class_id, date, student_id, status (Present/Absent/Late), recorded_by (teacher/staff)

 Notes

note_id, student_id, author_id (teacher/principal/nurse), type (e.g., "Behavior", "Medical"), content, is_confidential

6. Payroll & Extras

Payroll

salary_id, employee_id (teacher/staff), base_salary, bonuses, deductions, payment_schedule

 Extracurriculars

activity_id, name (e.g., "Chess Club"), supervisor_id, schedule, room_id

Visual Workflow Example
Admin sets up:

School Year: "2025-2026" → Trimesters.

Subjects: "Science" → Courses: "Biology 101" (Trimester 1), "Chemistry 101" (Trimester 2).

Room: "Lab 3A" (Capacity: 24 → auto-limits max_students in classes).

Teacher assigns:

Class: "Biology 101 - Section A" (Mon/Wed 10 AM, Lab 3A).

Logs attendance daily; adds notes (e.g., "Student A needs lab safety retraining").

Nurse adds:

Confidential note: "Student B: Allergy to latex (in Science Lab)".

Payroll auto-calculates:

Teacher salary + bonus for extracurricular supervision.

Key Features:
Flexible Academic Calendar: Switch between semesters/trimesters without data loss.

Room-Driven Constraints: Classes can’t exceed room capacity; time-slot conflicts flagged.

Role-Specific Access: Nurses see medical notes; teachers see attendance.

Extracurricular Tracking: Separate from academic courses but uses same room/teacher systems.

## Initial Setup

Follow these steps to get your environment up and running:

### 1. Clone the Repository

Clone the repository to your local machine:

 ```
git clone https://github.com/yourusername/mern-student-management.git cd mern-student-management
 ```

### 2. Install Root Dependencies

From the root directory, install the root-level dependencies:

 ```
npm install
 ```

### 3. Install Frontend Dependencies

Navigate to the `frontend` folder and install its dependencies:

 ```
npm install --prefix frontend
 ```

### 4. Install Backend Dependencies

Navigate to the `backend` folder and install its dependencies:

 ```
npm install --prefix backend
 ```

---

## Running the Development Environment

To run both the backend and frontend concurrently, run:

npm run start

This will start the **backend** and **frontend** servers simultaneously.

- **Backend** will be available on `http://localhost:5000`.
- **Frontend** will be available on `http://localhost:3000`.

---

## Linting & Prettier

The project uses **Husky** to run linting and formatting checks automatically before each commit.

- **ESLint**: Automatically checks your code for common issues.
- **Prettier**: Automatically formats your code to ensure consistent style.

### Commands:

- **Lint** the code:

  ```
  npm run lint
  ```

- **Prettier** to format the code:

  ```
  npm run prettier
  ```

---

## Build

To build the frontend and backend for production, run the following commands:

### Build the Frontend

Navigate to the `frontend` directory and run:

```
npm run build --prefix frontend
```

### Build the Backend

Navigate to the `backend` directory and run:

```
npm run build --prefix backend
```

---

## Folder Structure

The folder structure for this project is as follows:

```
/mern-student-management
│
├── /frontend # Frontend React App
│ ├── /public # Static files for the frontend
│ ├── /src # Source files for the frontend (components, pages, etc.)
│ ├── package.json # Frontend package.json with dependencies and scripts
│ └── .gitignore # Git ignore rules for frontend
│
├── /backend # Backend Node.js App
│ ├── /controllers # Controller files for handling logic
│ ├── /models # Model files for MongoDB schema
│ ├── /routes # API routes for the backend
│ ├── /config # Configuration files (database, server settings, etc.)
│ ├── package.json # Backend package.json with dependencies and scripts
│ └── .gitignore # Git ignore rules for backend
│
├── .gitignore # Git ignore rules for the entire project
├── package.json # Root-level package.json with shared scripts (start, lint, etc.)
├── README.md # Project documentation
├── .eslintrc.js # ESLint configuration
├── .prettierrc # Prettier configuration
└── /logs # Log files (e.g., server logs, error logs)
```

---

## Files to Delete If No Longer Needed

If there are files that are no longer necessary in either the frontend or backend, here's a list of common files to delete:

### **Frontend:**

If no longer needed, delete:


- **Unnecessary Components**: If you have components that aren't being used, you can delete them from `frontend/src/components/`.

  Example:

  - `frontend/src/components/Header.jsx`
  - `frontend/src/components/Footer.jsx`

- **Unused Pages**: If you have page components that aren't being used, you can delete them from `frontend/src/pages/`.

  Example:

  - `frontend/src/pages/LoginPage.jsx`

- **CSS or Styles**: If you've removed specific styles or no longer need them, delete the corresponding CSS files from `frontend/src/`.

  Example:

  - `frontend/src/index.css`

### **Backend:**

If no longer needed, delete:

- **Unused Routes or Controllers**: Remove unnecessary route files or controllers from `backend/src/routes/` or `backend/src/controllers/`.

  Example:

  - `backend/src/routes/studentRoutes.js`
  - `backend/src/controllers/studentController.js`

- **Models**: Delete any unused models from `backend/src/models/`.

  Example:

  - `backend/src/models/studentModel.js`

- **Middleware**: If you've created middleware that's no longer in use, delete it from `backend/src/middleware/`.

  Example:

  - `backend/src/middleware/authMiddleware.js`

- **Unused Config Files**: Delete any unused configuration files or settings in `backend/src/config/`.

---

## Useful Commands

- **Start the Backend**:

  ```
  npm run server
  ```

- **Start the Frontend**:

  ```
  npm run client
  ```

- **Start both Backend and Frontend concurrently**:

  ```
  npm run start
  ```

---

## Troubleshooting

- **If the backend server doesn't start**: Ensure you have `nodemon` installed and configured for automatic server restarts.

- **If the frontend doesn't load**: Check the `frontend/package.json` for the correct start script and make sure the frontend dependencies are installed correctly.

---

## Contributing

If you wish to contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and commit them.
4. Open a pull request to merge your changes into the main branch.

---

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
