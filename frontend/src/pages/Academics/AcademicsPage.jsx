import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Paper, Button } from '@mui/material';
import CourseBuilder from '../../components/academic/CourseBuilder';
import SubjectManagement from '../../components/academic/SubjectManagement';
import CoursesManager from '../../components/academic/CoursesManager';
import ClassesManager from '../../components/academic/ClassesManager';
import RoomManagement from '../../components/academic/RoomManagement';

const AcademicsPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Academics Overview
      </Typography>

      <Paper sx={{ p: 2, mt: 2 }}>
        <CourseBuilder />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <SubjectManagement />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <CoursesManager />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <ClassesManager />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <RoomManagement />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/academics/performance')}
          >
            View Performance Reports
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/academics/grades-analytics')}
          >
            View Grades Analytics
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AcademicsPage;
