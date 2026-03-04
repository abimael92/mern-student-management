import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Enrollment = () => (
  <Box>
    <Typography variant="h6" mb={2}>
      Enrollment Management
    </Typography>
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2">
        Manage new student enrollments and document verification here.
      </Typography>
    </Paper>
  </Box>
);

export default Enrollment;

