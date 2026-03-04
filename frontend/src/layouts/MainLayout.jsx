import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const MainLayout = ({ title, children }) => {
  return (
    <Box display="flex" minHeight="100vh">
      <Box width={240} bgcolor="#111827" color="#e5e7eb">
        <Sidebar />
      </Box>
      <Box flex={1} display="flex" flexDirection="column">
        <Header title={title} />
        <Box flex={1} p={2} bgcolor="#f3f4f6">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;

