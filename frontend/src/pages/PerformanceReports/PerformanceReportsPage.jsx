import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const samplePerformanceData = [
  { subject: 'Algebra', averageGrade: 87, passRate: 0.95 },
  { subject: 'Geometry', averageGrade: 82, passRate: 0.9 },
];

const PerformanceReportsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Performance Reports
      </Typography>
      <Paper sx={{ p: 2 }}>
        {samplePerformanceData.map(({ subject, averageGrade, passRate }) => (
          <Box key={subject} sx={{ mb: 2 }}>
            <Typography variant="h6">{subject}</Typography>
            <Typography>Average Grade: {averageGrade}</Typography>
            <Typography>Pass Rate: {(passRate * 100).toFixed(1)}%</Typography>
            {/* Replace this with actual charts like Recharts or Chart.js */}
            <Box
              sx={{
                height: 100,
                bgcolor: '#eee',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#888',
                mt: 1,
              }}
            >
              Chart placeholder
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default PerformanceReportsPage;
