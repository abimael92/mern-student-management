import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import LoginPage from './pages/auth/LoginPage';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import NurseLayout from './layouts/NurseLayout';
import SecretaryLayout from './layouts/SecretaryLayout';
import DirectorLayout from './layouts/DirectorLayout';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (roles && !roles.includes(role)) {
    // Redirect to their appropriate dashboard based on role
    const redirectPath = `/${role}`;
    return <Navigate to={redirectPath} replace />;
  }

  // Authorized - render children
  return children;
};

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    <Route
      path="/admin/*"
      element={
        <ProtectedRoute roles={['admin']}>
          <AdminLayout />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/*"
      element={
        <ProtectedRoute roles={['teacher']}>
          <TeacherLayout />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/*"
      element={
        <ProtectedRoute roles={['student']}>
          <StudentLayout />
        </ProtectedRoute>
      }
    />
    <Route
      path="/nurse/*"
      element={
        <ProtectedRoute roles={['nurse']}>
          <NurseLayout />
        </ProtectedRoute>
      }
    />
    <Route
      path="/secretary/*"
      element={
        <ProtectedRoute roles={['secretary']}>
          <SecretaryLayout />
        </ProtectedRoute>
      }
    />
    <Route
      path="/director/*"
      element={
        <ProtectedRoute roles={['director']}>
          <DirectorLayout />
        </ProtectedRoute>
      }
    />
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default App;
