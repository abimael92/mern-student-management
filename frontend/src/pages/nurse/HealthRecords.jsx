import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const HealthRecords = () => (
  <Box>
    <Typography variant="h6" mb={2}>
      Health Records
    </Typography>
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2">
        Search and manage student health records and immunizations here.
      </Typography>
    </Paper>
  </Box>
);

export default HealthRecords;

