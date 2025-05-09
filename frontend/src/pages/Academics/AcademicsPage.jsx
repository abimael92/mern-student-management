import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AcademicsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Academics Overview
      </Typography>

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Courses</Typography>
        {/* Insert Courses component or table here */}
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Subjects</Typography>
        {/* Insert Subjects component or table here */}
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Grades</Typography>
        {/* Insert Grades view here */}
      </Paper>
    </Box>
  );
};

export default AcademicsPage;
