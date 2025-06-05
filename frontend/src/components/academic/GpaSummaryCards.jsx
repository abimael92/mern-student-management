import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

// You'd replace this mock data with your actual calculated values
const mockData = {
  avgGpa: 3.6,
  mostImproved: 'Ana Lopez',
  challengingSubject: 'Organic Chemistry',
};

const GpaSummaryCards = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">School Average GPA</Typography>
          <Typography variant="h4" color="primary">
            {mockData.avgGpa.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Most Improved Student</Typography>
          <Typography variant="h5">{mockData.mostImproved}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Most Challenging Subject</Typography>
          <Typography variant="h5">{mockData.challengingSubject}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GpaSummaryCards;
