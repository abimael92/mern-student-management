import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import Dashboard from '../pages/secretary/Dashboard';
import Enrollment from '../pages/secretary/Enrollment';

const SecretaryLayout = () => (
  <MainLayout title="Secretary Portal">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/enrollment" element={<Enrollment />} />
    </Routes>
  </MainLayout>
);

export default SecretaryLayout;

