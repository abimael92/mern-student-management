// src/routes/routes.js
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import StudentsPage from '../pages/Students/StudentsPage';
import StudentForm from '../components/students/StudentForm';

const appRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/dashboard', element: <DashboardPage /> },
    { path: '/students', element: <StudentsPage /> },
    { path: '/add-student', element: <StudentForm /> },
    { path: '/edit-student/:id', element: <StudentForm /> },
];

export default appRoutes;
