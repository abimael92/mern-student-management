import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import FeesPage from './pages/Fees/FeesPage';
import StudentPage from './pages/Students/StudentPage';
import StudentForm from './components/students/StudentForm';
import TeacherPage from './pages/Teachers/TeacherPage';
import TransportPage from './pages/Transport/TransportPage';
import AcademicsPage from './pages/Academics/AcademicsPage';
import AttendancePage from './pages/Attendance/AttendancePage';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Container, ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <Box component="main" sx={{ flex: 1 }}>
              <Container maxWidth="lg">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/students" element={<StudentPage />} />
                  <Route path="/teachers" element={<TeacherPage />} />
                  <Route path="/add-student" element={<StudentForm />} />
                  <Route path="/edit-student/:id" element={<StudentForm />} />
                  <Route path="/academics" element={<AcademicsPage />} />
                  <Route path="/attendance" element={<AttendancePage />} />
                  <Route path="/fees" element={<FeesPage />} />
                  <Route path="/transport" element={<TransportPage />} />
                  /fees
                </Routes>
              </Container>
            </Box>
            <Footer />
          </Box>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
