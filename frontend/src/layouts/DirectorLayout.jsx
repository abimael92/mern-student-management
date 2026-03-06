import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import DirectorDashboard from '../pages/director/Dashboard';
import DirectorAnalytics from '../pages/director/Analytics';
import DirectorReports from '../pages/director/Reports';
import DirectorStudents from '../pages/director/Students';
import DirectorTeachers from '../pages/director/Teachers';

const DirectorLayout = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<DirectorDashboard />} />
      <Route path="/analytics" element={<DirectorAnalytics />} />
      <Route path="/reports" element={<DirectorReports />} />
      <Route path="/students" element={<DirectorStudents />} />
      <Route path="/teachers" element={<DirectorTeachers />} />
    </Routes>
  </MainLayout>
);

export default DirectorLayout;
