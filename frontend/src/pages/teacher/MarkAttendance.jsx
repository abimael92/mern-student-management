import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MarkAttendance = () => (
  <Box>
    <Typography variant="h6" mb={2}>
      Mark Attendance
    </Typography>
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2">
        Attendance grid for the selected class and date will be implemented here.
      </Typography>
    </Paper>
  </Box>
);

export default MarkAttendance;

