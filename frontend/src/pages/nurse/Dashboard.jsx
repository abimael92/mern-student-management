import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const NurseDashboard = () => (
  <Box>
    <Typography variant="h6" mb={2}>
      Nurse Dashboard
    </Typography>
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2">
        Today&apos;s appointments and health alerts will be summarized here.
      </Typography>
    </Paper>
  </Box>
);

export default NurseDashboard;

