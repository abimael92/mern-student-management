import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

import AttendanceList from '../../components/attendance/AttendanceList';
import AttendanceSummary from '../../components/attendance/AttendanceSummary';
import AttendanceStatusView from '../../components/attendance/AttendanceStatusView';

import { attendanceRecords } from '../../utils/mock/mockAttendanceData';

const AttendancePage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Overview
      </Typography>

      <Paper sx={{ p: 2, mt: 2 }}>
        <AttendanceSummary records={attendanceRecords} />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <AttendanceList records={attendanceRecords} />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <AttendanceStatusView records={attendanceRecords} />
      </Paper>
    </Box>
  );
};

export default AttendancePage;
