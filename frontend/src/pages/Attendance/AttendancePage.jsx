// ===== ./frontend/src/pages/Attendance/AttendancePage.jsx =====
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  CircularProgress,
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
  Refresh,
} from '@mui/icons-material';

// Enhanced Components
import AttendanceCalendarView from '../../components/attendance/AttendanceCalendarView';
import AttendanceStatsCards from '../../components/attendance/AttendanceStatsCards';
import AttendanceTrendChart from '../../components/attendance/AttendanceTrendChart';
import QuickAttendanceActions from '../../components/attendance/QuickAttendanceActions';
import AttendanceStudentList from '../../components/attendance/AttendanceStudentList';

// API service
import { api } from '../../utils/api'; //frontend/src/utils/api.js

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    attendanceRate: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch attendance data
  const fetchAttendanceData = useCallback(async (date) => {
    try {
      setLoading(true);
      setError(null);

      const formattedDate = date.toISOString().split('T')[0];
      console.log('🔄 Fetching attendance for date:', formattedDate); // ADD THIS

      const response = await api.fetchAttendanceByDate(formattedDate);
      console.log('📊 API Response:', response); // ADD THIS

      // FIX: Add null check
      if (!response || !Array.isArray(response)) {
        console.log('⚠️ No data in response'); // ADD THIS
        setAttendanceData([]);
        setStudents([]);
        return;
      }

      setAttendanceData(response);

      // FIX: Add proper check for empty array
      if (response.length === 0) {
        console.log('📭 Attendance array is empty'); // ADD THIS
        setStudents([]);
        // You might want to fetch students from a specific class
        // This is a placeholder - implement based on your needs
        // const classResponse = await classApi.getActiveClasses();
        // setStudents(classResponse.data.students || []);
      } else {
        console.log('✅ Found attendance records:', response.length); // ADD THIS
        // Extract unique students from attendance records
        // FIX: Add optional chaining for safety
        const studentList = response
          .filter((record) => record && record.student) // Filter out invalid records
          .map((record) => ({
            ...record.student,
            attendanceStatus: record.status,
            attendanceId: record._id,
          }));
        console.log('👥 Students extracted:', studentList.length); // ADD THIS
        setStudents(studentList);
      }
    } catch (err) {
      console.error('❌ Error fetching attendance:', err); // THIS EXISTS, KEEP IT
      setError('Failed to fetch attendance data');
      setAttendanceData([]);
      setStudents([]);
    } finally {
      setLoading(false);
      console.log('🏁 Finished fetching attendance'); // ADD THIS
    }
  }, []);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      console.log('📈 Fetching attendance stats...'); // ADD THIS

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const startDate = thirtyDaysAgo.toISOString().split('T')[0];
      const endDate = new Date().toISOString().split('T')[0];
      console.log('📅 Date range:', startDate, 'to', endDate); // ADD THIS

      const response = await api.fetchAttendanceStats(startDate, endDate);
      console.log('📊 Stats API Response:', response); // ADD THIS
      console.log('📊 Stats data:', response?.data); // ADD THIS

      // FIX: Set default stats if response.data is undefined
      const statsData = response?.data || {
        total: 0,
        present: 0,
        absent: 0,
        late: 0,
        attendanceRate: 0,
      };

      console.log('📊 Final stats to set:', statsData); // ADD THIS
      setStats(statsData);
    } catch (err) {
      console.error('❌ Error fetching stats:', err);
      // FIX: Set default stats on error
      setStats({
        total: 0,
        present: 0,
        absent: 0,
        late: 0,
        attendanceRate: 0,
      });
    }
  }, []);

  console.log('🎬 AttendancePage rendering');
  console.log('📊 Current stats:', stats); // ADD THIS
  console.log('👥 Current students:', students.length); // ADD THIS
  console.log('📅 Current attendance data:', attendanceData.length); // ADD THIS

  // Fetch data on component mount and when selectedDate changes
  useEffect(() => {
    console.log('🚀 useEffect triggered, selectedDate:', selectedDate); // ADD THIS
    fetchAttendanceData(selectedDate);
    fetchStats();
  }, [selectedDate, fetchAttendanceData, fetchStats]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleBulkAction = async (action, studentIds, status) => {
    try {
      setLoading(true);

      const attendanceRecords = studentIds.map((studentId) => ({
        studentId,
        status: status || action.toLowerCase(),
        date: selectedDate.toISOString().split('T')[0],
      }));

      // You'll need to add classId here - get it from your context or state
      const classId = 'your-class-id-here'; // Replace with actual class ID

      await api.markAttendance({
        date: selectedDate.toISOString().split('T')[0],
        records: attendanceRecords,
        classId: classId,
        markedBy: 'current-user-id', // Get from auth context
      });

      setSuccess(
        `Successfully marked ${studentIds.length} students as ${status || action}`
      );

      // Refresh data
      fetchAttendanceData(selectedDate);
      fetchStats();
    } catch (err) {
      setError(`Failed to mark attendance: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.exportAttendance({
        startDate: selectedDate.toISOString().split('T')[0],
        endDate: selectedDate.toISOString().split('T')[0],
        format: 'csv',
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `attendance-${selectedDate.toISOString().split('T')[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to export attendance data');
    }
  };

  const handleRefresh = () => {
    fetchAttendanceData(selectedDate);
    fetchStats();
  };

  const handleMarkAttendance = () => {
    // Open attendance marking modal/dialog
    // This would trigger your attendance marking interface
    console.log('Open attendance marking interface');
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', position: 'relative' }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </Box>
      )}

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
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
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
              startIcon={<Refresh />}
              onClick={handleRefresh}
              sx={{
                borderRadius: 3,
                px: 3,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Refresh
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExport}
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
              onClick={handleMarkAttendance}
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
                  {error ? (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  ) : null}
                  <AttendanceStudentList
                    students={students}
                    attendanceData={attendanceData}
                    onBulkAction={handleBulkAction}
                    selectedDate={selectedDate}
                    loading={loading}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <QuickAttendanceActions
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                  onMarkAttendance={handleMarkAttendance}
                />
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
              <AttendanceStudentList
                students={students}
                showHistory={true}
                onBulkAction={handleBulkAction}
                attendanceData={attendanceData}
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
                attendanceData={attendanceData}
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
                  <AttendanceTrendChart
                    attendanceData={attendanceData}
                    stats={stats}
                  />
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
                        Today&apos;s Attendance Rate
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {stats.attendanceRate.toFixed(1)}%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Present Today
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {stats.present} students
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Monthly Average
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {stats.attendanceRate.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </Box>

      {/* Snackbar Notifications */}
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSuccess(null)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {success}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AttendancePage;
