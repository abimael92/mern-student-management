import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import LandingPage from './pages/LandingPage';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import NurseLayout from './layouts/NurseLayout';
import SecretaryLayout from './layouts/SecretaryLayout';
import DirectorLayout from './layouts/DirectorLayout';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location?.pathname }} />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to={`/${role}`} replace />;
  }

  return children;
};

// Redirect authenticated users away from auth pages (login, register, forgot, reset)
const GuestRoute = ({ children }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={`/${role}`} replace />;
  }

  return children;
};

// Landing at "/" when not logged in; redirect to dashboard when authenticated
const HomeRoute = () => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (!isLoading && isAuthenticated && role) {
    return <Navigate to={`/${role}`} replace />;
  }

  // Always show landing page when not authenticated (including while auth is still loading)
  return <LandingPage />;
};

const App = () => (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <GuestRoute>
            <ForgotPasswordPage />
          </GuestRoute>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <GuestRoute>
            <ResetPasswordPage />
          </GuestRoute>
        }
      />

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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

export default App;
