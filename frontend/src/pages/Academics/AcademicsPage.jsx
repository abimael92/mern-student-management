import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Paper, Button } from '@mui/material';
import SubjectManagement from '../../components/academic/SubjectManagement';
import CoursesManager from '../../components/academic//CoursesManager';

const AcademicsPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const handleAddCourse = (course) => {
    const newCourse = { ...course, id: Date.now().toString() };
    setCourses((prev) => [...prev, newCourse]);
    setSelectedCourse(null);
  };

  const handleEditCourse = (updatedCourse) => {
    if (!selectedCourse) return;
    setCourses((prev) =>
      prev.map((c) =>
        c.id === selectedCourse.id
          ? { ...updatedCourse, id: selectedCourse.id }
          : c
      )
    );
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
  };

  const handleCancel = () => {
    setSelectedCourse(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Academics Overview
      </Typography>
      <Paper sx={{ p: 2, mt: 2 }}>
        <CoursesManager />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <SubjectManagement />
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
