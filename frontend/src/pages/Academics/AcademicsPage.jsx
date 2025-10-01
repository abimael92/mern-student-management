import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, Typography } from '@mui/material';
import SubjectManagement from '../../components/academic/SubjectManagement';
import CoursesManager from '../../components/academic/CoursesManager';
import ClassesManager from '../../components/academic/ClassesManager';
import RoomManagement from '../../components/academic/RoomManagement';
import CourseBuilder from '../../components/academic/CourseBuilder';

const AcademicsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (e, newValue) => setActiveTab(newValue);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Academics Dashboard
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Courses" />
        <Tab label="Subjects" />
        <Tab label="Classes" />
        <Tab label="Rooms" />
        <Tab label="Relations" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <Paper sx={{ p: 2 }}>
            <CoursesManager />
          </Paper>
        )}
        {activeTab === 1 && (
          <Paper sx={{ p: 2 }}>
            <SubjectManagement />
          </Paper>
        )}
        {activeTab === 2 && (
          <Paper sx={{ p: 2 }}>
            <ClassesManager />
          </Paper>
        )}
        {activeTab === 3 && (
          <Paper sx={{ p: 2 }}>
            <RoomManagement />
          </Paper>
        )}
        {activeTab === 4 && (
          <Paper sx={{ p: 2 }}>
            <CourseBuilder />
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default AcademicsPage;
