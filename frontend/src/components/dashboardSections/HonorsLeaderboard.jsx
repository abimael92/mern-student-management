import React from 'react';
import { Card, CardContent, Typography, LinearProgress } from '@mui/material';

const TeacherPerformance = () => {
  const teacherPerformanceScore = 85; // Example data

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Teacher Performance
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {teacherPerformanceScore}% performance score
        </Typography>
        <LinearProgress
          variant="determinate"
          value={teacherPerformanceScore}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </CardContent>
    </Card>
  );
};

export default TeacherPerformance;
