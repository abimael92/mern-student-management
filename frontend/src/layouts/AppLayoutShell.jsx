/**
 * App shell using the original design: layout Header (role-aware) + main content + Footer.
 * Used by all role-specific layouts so every authenticated page has the same look and feel.
 */
import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import getNavConfig from '../config/navConfig.jsx';
import { useAuth } from '../hooks/useAuth';

const AppLayoutShell = ({ children }) => {
  const { role } = useAuth();
  const navConfig = getNavConfig(role);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header navConfig={navConfig} />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 3, flex: 1 }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayoutShell;
