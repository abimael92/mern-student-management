import React from 'react';
import { Card, CardContent, Typography, LinearProgress } from '@mui/material';

const PerfectAttendance = () => {
  const perfectAttendancePercentage = 92; // Example data

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Perfect Attendance
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {perfectAttendancePercentage}% of students
        </Typography>
        <LinearProgress
          variant="determinate"
          value={perfectAttendancePercentage}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </CardContent>
    </Card>
  );
};

export default PerfectAttendance;
