import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SubjectManagement from '../../components/academic/SubjectManagement';
import SubjectsPerformanceOverview from '../../components/academic/SubjectsPerformanceOverview';
import SubjectsStatusView from '../../components/academic/SubjectsStatusView';
import CourseList from '../../components/academic/CourseList';
import CourseForm from '../../components/academic/CourseForm'; // inside

import GradeHistory from '../../components/academic/GradeHistory';

import { courses, gradeHistory } from '../../utils/mock/AcademicsPage';

const AcademicsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Academics Overview
      </Typography>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Courses</Typography>
        <CourseList courses={courses} />
      </Paper>
      AcademicsPage return, add above CourseList
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Add New Course</Typography>
        <CourseForm
          onSubmit={(newCourse) => {
            // handle new course submit here (e.g. API call, state update)
            console.log('New course data:', newCourse);
          }}
        />
      </Paper>
      <Paper sx={{ p: 2, mt: 2 }}>
        <SubjectManagement />
      </Paper>
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
  );
};

export default AcademicsPage;
