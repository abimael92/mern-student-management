// ===== ./frontend/src/pages/Attendance/AttendancePage.jsx =====
import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Tabs,
  Tab,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  People,
  EventAvailable,
  Schedule,
  TrendingUp,
  Download,
  FilterList,
  Add,
} from '@mui/icons-material';

// Enhanced Components
import AttendanceCalendarView from '../../components/attendance/AttendanceCalendarView';
import AttendanceStatsCards from '../../components/attendance/AttendanceStatsCards';
import AttendanceTrendChart from '../../components/attendance/AttendanceTrendChart';
import QuickAttendanceActions from '../../components/attendance/QuickAttendanceActions';
import AttendanceStudentList from '../../components/attendance/AttendanceStudentList';

// Mock data - replace with your actual data
import {
  attendanceRecords,
  students,
} from '../../utils/mock/mockAttendanceData';

const AttendancePage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({
    class: '',
    status: '',
    dateRange: { start: null, end: null },
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(
      (r) => r.status === 'Present'
    ).length;
    const absent = attendanceRecords.filter(
      (r) => r.status === 'Absent'
    ).length;
    const late = attendanceRecords.filter((r) => r.status === 'Late').length;

    return {
      total,
      present,
      absent,
      late,
      attendanceRate: total > 0 ? ((present / total) * 100).toFixed(1) : 0,
    };
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // You can fetch attendance data for the selected date here
  };

  const handleBulkAction = (action, studentIds) => {
    console.log(`Performing ${action} for students:`, studentIds);
    // Implement bulk attendance marking
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh' }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
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
              Attendance Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track and manage student attendance with real-time insights
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{
                borderRadius: 3,
                px: 3,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Filters
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              sx={{
                borderRadius: 3,
                px: 3,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                borderRadius: 3,
                px: 3,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              Mark Attendance
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Stats Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <AttendanceStatsCards stats={stats} />
      </motion.div>

      {/* Tabs Navigation */}
      <Paper
        sx={{
          mt: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              minHeight: 60,
              color: 'text.primary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
          }}
        >
          <Tab
            icon={<EventAvailable />}
            iconPosition="start"
            label="Daily View"
          />
          <Tab icon={<People />} iconPosition="start" label="Student List" />
          <Tab icon={<Schedule />} iconPosition="start" label="Calendar" />
          <Tab icon={<TrendingUp />} iconPosition="start" label="Analytics" />
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'white',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <People color="primary" />
                    Today&apos;s Attendance
                  </Typography>
                  <AttendanceStudentList
                    students={students}
                    onBulkAction={handleBulkAction}
                    selectedDate={selectedDate}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <QuickAttendanceActions onDateSelect={handleDateSelect} />
              </Grid>
            </Grid>
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
                background: 'white',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3 }}>
                Student Attendance History
              </Typography>
              {/* Enhanced Student List Component */}
              <AttendanceStudentList
                students={students}
                showHistory={true}
                onBulkAction={handleBulkAction}
              />
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
                background: 'white',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                minHeight: 500,
              }}
            >
              <Typography variant="h6" sx={{ mb: 3 }}>
                Attendance Calendar
              </Typography>
              <AttendanceCalendarView
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
            </Paper>
          </motion.div>
        )}

        {activeTab === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'white',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Attendance Trends
                  </Typography>
                  <AttendanceTrendChart records={attendanceRecords} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Quick Insights
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Best Attendance
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        Grade 5A - 98%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Needs Attention
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        Grade 8B - 82%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Monthly Average
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        94.2%
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default AttendancePage;
