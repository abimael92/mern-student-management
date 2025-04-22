import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';
import MainLayout from './components/layout/MainLayout';
import appRoutes from './routes/routes';
import { AuthProvider } from './features/context/AuthContext';
const App = () => {
  return (
    <AuthProvider>
      {' '}
      {/* Wrap the app with AuthProvider */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <MainLayout>
            <Routes>
              {appRoutes.map(({ path, element }, idx) => (
                <Route key={idx} path={path} element={element} />
              ))}
            </Routes>
          </MainLayout>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
