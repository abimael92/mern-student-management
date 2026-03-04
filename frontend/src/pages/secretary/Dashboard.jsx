import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SecretaryDashboard = () => (
  <Box>
    <Typography variant="h6" mb={2}>
      Secretary Dashboard
    </Typography>
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2">
        Pending enrollment tasks and communications will appear here.
      </Typography>
    </Paper>
  </Box>
);

export default SecretaryDashboard;

