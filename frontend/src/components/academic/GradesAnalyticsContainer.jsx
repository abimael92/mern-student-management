import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';

import SubjectManagement from '../../components/academic/SubjectManagement';
import SubjectsPerformanceOverview from '../../components/academic/SubjectsPerformanceOverview';
import SubjectsStatusView from '../../components/academic/SubjectsStatusView';

import GpaSummaryCards from '../../components/academic/GpaSummaryCards';

import CourseList from '../../components/academic/CourseList';
import CourseForm from '../../components/academic/CourseForm'; // inside

import GradeHistory from '../../components/academic/GradeHistory';

import { courses, gradeHistory } from '../../utils/mock/AcademicsPage';

const GradesAnalyticsContainer = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Grades Analytics
      </Typography>

      {/* Intro Text */}
      <Typography variant="body1" sx={{ mb: 3, color: 'gray' }}>
        This dashboard provides academic performance insights for school
        administrators. All components below will support filtering, CRUD
        operations, and reporting.
      </Typography>

      {/* Section: GPA Summary Cards */}
      {/* Section: GPA Summary Cards */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        GPA Summary Cards
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Key indicators like average GPA, most improved student, and difficult
        subjects. These provide high-level insights at a glance.
      </Typography>
      <GpaSummaryCards />

      {/* Section: Filters */}
      <Typography variant="h6" sx={{ mt: 5, mb: 1 }}>
        Filters
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Allows filtering by class, subject, student name, and date range.
        Adjusts the data shown in the table and charts below.
      </Typography>
      <Paper sx={{ p: 2 }}>Filter Controls Placeholder</Paper>

      {/* Section: Grades Table */}
      <Typography variant="h6" sx={{ mt: 5, mb: 1 }}>
        Grades Table
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Table showing all student grades. Supports editing or deleting grade
        entries.
      </Typography>
      <Paper sx={{ p: 2, minHeight: 200 }}>Grades Table Placeholder</Paper>

      {/* Section: Charts */}
      <Typography variant="h6" sx={{ mt: 5, mb: 1 }}>
        Performance Charts
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Visual representation of GPA trends and subject performance comparisons.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>GPA Trend Line Chart</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>Subject Comparison Bar Chart</Paper>
        </Grid>
      </Grid>

      {/* Section: At-Risk Students */}
      <Typography variant="h6" sx={{ mt: 5, mb: 1 }}>
        At-Risk Students
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        List of students with GPA below acceptable level. Useful for
        intervention planning.
      </Typography>
      <Paper sx={{ p: 2, minHeight: 100 }}>At-Risk Students Placeholder</Paper>

      {/* Section: Export Data */}
      <Typography variant="h6" sx={{ mt: 5, mb: 1 }}>
        Export
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Export filtered data to PDF or Excel for reporting.
      </Typography>
      <Button variant="contained">Export as PDF</Button>

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Academics Overview
        </Typography>

        {/* Subjects & Performance Overview */}
        <Paper sx={{ p: 2, mt: 2 }}>
          <SubjectsPerformanceOverview />
        </Paper>
        <Paper sx={{ p: 2, mt: 2 }}>
          <SubjectsStatusView />
        </Paper>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Grades</Typography>
          <GradeHistory history={gradeHistory} />
        </Paper>
      </Box>
    </Box>
  );
};

export default GradesAnalyticsContainer;
