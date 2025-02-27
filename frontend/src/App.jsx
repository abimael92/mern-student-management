import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList'; // Correct import

// Import theme and other Material-UI components
import { Container, ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
          <Header />
          <Box component="main" sx={{ flex: 1 }}>
            <Container maxWidth="lg">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/add-student" element={<StudentForm />} />
                <Route path="/edit-student/:id" element={<StudentForm />} />
              </Routes>
            </Container>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
