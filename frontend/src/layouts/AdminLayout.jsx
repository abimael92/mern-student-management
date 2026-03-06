/**
 * Admin layout: original design + all original app pages as admin content.
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import DashboardPage from '../pages/DashboardPage';
import StudentPage from '../pages/Students/StudentPage';
import TeacherPage from '../pages/Teachers/TeacherPage';
import AttendancePage from '../pages/Attendance/AttendancePage';
import AcademicsPage from '../pages/Academics/AcademicsPage';
import GradesAnalyticsPage from '../pages/GradesAnalytics/GradesAnalyticsPage';
import FeesPage from '../pages/Fees/FeesPage';
import TransportPage from '../pages/Transport/TransportPage';
import LibraryPage from '../pages/Library/LibraryPage';
import AnalyticsPage from '../pages/Analytics/AnalyticsPage';
import UserManagement from '../pages/admin/UserManagement';
import Settings from '../pages/admin/Settings';

const AdminLayout = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/students" element={<StudentPage />} />
      <Route path="/teachers" element={<TeacherPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/academics" element={<AcademicsPage />} />
      <Route path="/academics-plan" element={<GradesAnalyticsPage />} />
      <Route path="/fees" element={<FeesPage />} />
      <Route path="/transport" element={<TransportPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </MainLayout>
);

export default AdminLayout;

