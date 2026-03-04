import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Settings = () => (
  <Box>
    <Typography variant="h6" mb={2}>
      System Settings
    </Typography>
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2">
        Configure global system options here (feature toggles, academic year, etc.).
      </Typography>
    </Paper>
  </Box>
);

export default Settings;

