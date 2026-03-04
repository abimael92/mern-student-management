import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const StudentDashboard = () => {
  const { user } = useAuth();
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Welcome, {user?.profile?.firstName || user?.username}
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="body2">
          This dashboard will show your schedule, alerts, and recent updates.
        </Typography>
      </Paper>
    </Box>
  );
};

export default StudentDashboard;

