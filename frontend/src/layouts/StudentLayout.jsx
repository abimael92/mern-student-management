import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import Dashboard from '../pages/student/Dashboard';
import MyProfile from '../pages/student/MyProfile';
import MyAttendance from '../pages/student/MyAttendance';

const StudentLayout = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/attendance" element={<MyAttendance />} />
    </Routes>
  </MainLayout>
);

export default StudentLayout;

