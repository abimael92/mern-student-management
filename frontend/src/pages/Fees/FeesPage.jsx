// ===== ./frontend/src/pages/Fees/EnhancedFeesPage.jsx =====
import React from 'react';
import { Box, Container } from '@mui/material';
import EnhancedFeeDashboard from '../../components/fees/EnhancedFeeDashboard';

const EnhancedFeesPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 3,
      }}
    >
      <Container maxWidth="xl">
        <EnhancedFeeDashboard />
      </Container>
    </Box>
  );
};

export default EnhancedFeesPage;
