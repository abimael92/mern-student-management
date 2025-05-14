import React from 'react';
import { Grid, Box } from '@mui/material';
import GPAOverviewCard from './GPAOverviewCard';
import AssignmentCompletionChart from './AssignmentCompletionChart';
import AttendanceHeatmap from './AttendanceHeatmap';

const SubjectsStatusView = () => {
  const gpa = 3.85;

  const assignmentData = [
    { assignment: 'Assignment 1', completed: 80 },
    { assignment: 'Assignment 2', completed: 90 },
    { assignment: 'Assignment 3', completed: 75 },
    { assignment: 'Assignment 4', completed: 95 },
    { assignment: 'Assignment 5', completed: 88 },
  ];

  const attendanceData = [
    [95, 90, 100, 85, 80],
    [88, 92, 85, 78, 95],
    [70, 75, 80, 90, 85],
    [100, 98, 97, 100, 100],
  ];

  const xLabels = ['January', 'February', 'March', 'April', 'May'];
  const yLabels = ['Student 1', 'Student 2', 'Student 3', 'Student 4'];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <GPAOverviewCard gpa={gpa} />
        </Grid>
        <Grid item xs={12} md={8}>
          <AssignmentCompletionChart data={assignmentData} />
        </Grid>
        <Grid item xs={12}>
          <AttendanceHeatmap
            data={attendanceData}
            xLabels={xLabels}
            yLabels={yLabels}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubjectsStatusView;
