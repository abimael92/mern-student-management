import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import Dashboard from '../pages/teacher/Dashboard';
import MyClasses from '../pages/teacher/MyClasses';
import MarkAttendance from '../pages/teacher/MarkAttendance';

const TeacherLayout = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/classes" element={<MyClasses />} />
      <Route path="/attendance" element={<MarkAttendance />} />
    </Routes>
  </MainLayout>
);

export default TeacherLayout;

