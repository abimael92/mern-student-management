// ===== ./frontend/src/pages/Academics/AcademicsPage.tsx =====
'use client';

import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Add,
  FilterList,
  Download,
  School,
  Book,
  Class,
  MeetingRoom,
  Build,
} from '@mui/icons-material';

// Components
import SubjectManagement from '../../components/academic/SubjectManagement';
import CoursesManager from '../../components/academic/CoursesManager';
import ClassesManager from '../../components/academic/ClassesManager';
import RoomManagement from '../../components/academic/RoomManagement';
import CourseBuilder from '../../components/academic/CourseBuilder';

const AcademicsPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (e, newValue) => setActiveTab(newValue);

  const tabs = [
    { label: 'Courses', icon: <School /> },
    { label: 'Subjects', icon: <Book /> },
    { label: 'Classes', icon: <Class /> },
    { label: 'Rooms', icon: <MeetingRoom /> },
    { label: 'Relations', icon: <Build /> },
  ];

  return (
    <Box sx={{ p: 3, minHeight: '100vh' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Academics Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage courses, subjects, classes, rooms, and relations easily
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600 }}
            >
              Filters
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600 }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              Add New
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Tabs */}
      <Paper
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              minHeight: 60,
              color: 'text.primary',
              '&.Mui-selected': { color: 'primary.main' },
            },
          }}
        >
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              icon={tab.icon}
              iconPosition="start"
              label={tab.label}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <CoursesManager />
            </Paper>
          </motion.div>
        )}
        {activeTab === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <SubjectManagement />
            </Paper>
          </motion.div>
        )}
        {activeTab === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <ClassesManager />
            </Paper>
          </motion.div>
        )}
        {activeTab === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <RoomManagement />
            </Paper>
          </motion.div>
        )}
        {activeTab === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <CourseBuilder />
            </Paper>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default AcademicsPage;
