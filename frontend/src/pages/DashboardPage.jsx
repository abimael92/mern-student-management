import React from 'react';
import { Grid, Box, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

// Primary Metrics (Most Important - Top Level Overview)
import StatsCard from '../components/dashboard/StatsCard';
import PerfectAttendance from '../components/dashboard/PerfectAttendance';
import TeacherPerformance from '../components/dashboard/TeacherPerformance';

// Action & Engagement Components
import QuickActions from '../components/dashboard/QuickActions';
import HonorsLeaderboard from '../components/dashboard/HonorsLeaderboard';

// Time-Sensitive Information
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import DashboardCalendar from '../components/dashboard/DashboardCalendar';

// Notifications & Alerts
import NotificationsList from '../components/dashboard/NotificationsList';

const Dashboard = () => {
  const theme = useTheme();

  // Primary Metrics Data
  const studentsData = {
    title: 'Student Enrollment Growth',
    count: 1200,
    trendData: [
      { month: 'Jan', value: 1000 },
      { month: 'Feb', value: 1100 },
      { month: 'Mar', value: 1200 },
    ],
    change: 5,
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  };

  const teachersData = {
    title: 'Active Teaching Staff',
    count: 80,
    trendData: [
      { month: 'Jan', value: 70 },
      { month: 'Feb', value: 75 },
      { month: 'Mar', value: 80 },
    ],
    change: 3,
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  };

  // Time-Sensitive Data
  const events = [
    {
      id: 1,
      title: 'Final Exams',
      category: 'Academics',
      date: '2025-03-15',
      color: '#667eea',
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      category: 'Meeting',
      date: '2025-03-20',
      color: '#f093fb',
    },
  ];

  const notifications = [
    {
      message: '5 students absent today',
      time: '2 hours ago',
      type: 'warning',
    },
    {
      message: 'New course materials uploaded',
      time: '1 day ago',
      type: 'info',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box
      sx={{
        p: 3,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dashboard Overview
        </Typography>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {/* ROW 5: ALERTS & NOTIFICATIONS */}
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <NotificationsList notifications={notifications} />
            </motion.div>
          </Grid>

          {/* ROW 4: TIME-SENSITIVE INFORMATION */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <UpcomingEvents events={events} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <DashboardCalendar events={events} />
            </motion.div>
          </Grid>
          {/* ROW 1: CORE METRICS - Most Important Numbers */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <StatsCard {...studentsData} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <StatsCard {...teachersData} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <PerfectAttendance />
            </motion.div>
          </Grid>

          {/* ROW 2: PERFORMANCE & QUALITY METRICS */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <TeacherPerformance />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <HonorsLeaderboard />
            </motion.div>
          </Grid>

          {/* ROW 3: QUICK ACTIONS & ENGAGEMENT */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <QuickActions />
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Dashboard;
