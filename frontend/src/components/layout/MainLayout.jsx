import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 128px)' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
