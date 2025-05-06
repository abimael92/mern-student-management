import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import StatsCard from '../components/dashboard/StatsCard';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import QuickActions from '../components/dashboard/QuickActions';
import NotificationsList from '../components/dashboard/NotificationsList';
import DashboardCalendar from '../components/dashboard/DashboardCalendar';
import PerfectAttendance from '../components/dashboard/PerfectAttendance';
import HonorsLeaderboard from '../components/dashboard/HonorsLeaderboard';
import TeacherPerformance from '../components/dashboard/TeacherPerformance';

const Dashboard = () => {
  const studentsData = {
    title: 'Student Enrollment Growth',
    count: 1200,
    trendData: [
      { month: 'Jan', value: 1000 },
      { month: 'Feb', value: 1100 },
      { month: 'Mar', value: 1200 },
    ],
    change: 5,
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
  };

  const events = [
    { id: 1, title: 'Final Exams', category: 'Academics', date: '2025-03-15' },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      category: 'Meeting',
      date: '2025-03-20',
    },
  ];

  const notifications = [
    { message: '5 students absent today', time: '2 hours ago' },
    { message: 'New course materials uploaded.', time: '1 day ago' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Student & Teacher Stats */}
        <Grid item xs={12} md={4}>
          <StatsCard {...studentsData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard {...teachersData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <UpcomingEvents events={events} />
        </Grid>

        {/* Attendance, Leaderboard, and Teacher Performance */}
        <Grid item xs={12} md={4}>
          <PerfectAttendance />
        </Grid>
        <Grid item xs={12} md={4}>
          <HonorsLeaderboard />
        </Grid>
        <Grid item xs={12} md={4}>
          <TeacherPerformance />
        </Grid>

        {/* Quick Actions, Notifications, Calendar */}
        <Grid item xs={12} md={4}>
          <QuickActions />
        </Grid>
        <Grid item xs={12} md={4}>
          <NotificationsList notifications={notifications} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCalendar events={events} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
