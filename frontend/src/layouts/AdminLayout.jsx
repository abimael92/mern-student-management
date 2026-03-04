import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import Dashboard from '../pages/admin/Dashboard';
import UserManagement from '../pages/admin/UserManagement';
import Settings from '../pages/admin/Settings';

const AdminLayout = () => (
  <MainLayout title="Admin Portal">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </MainLayout>
);

export default AdminLayout;

