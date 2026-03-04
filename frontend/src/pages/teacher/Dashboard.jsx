import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TeacherDashboard = () => (
  <Box>
    <Typography variant="h6" mb={2}>
      Today&apos;s Overview
    </Typography>
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="body2">Today&apos;s classes and quick actions will appear here.</Typography>
    </Paper>
  </Box>
);

export default TeacherDashboard;

