import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import Dashboard from '../pages/nurse/Dashboard';
import HealthRecords from '../pages/nurse/HealthRecords';

const NurseLayout = () => (
  <MainLayout title="Nurse Portal">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/health-records" element={<HealthRecords />} />
    </Routes>
  </MainLayout>
);

export default NurseLayout;

