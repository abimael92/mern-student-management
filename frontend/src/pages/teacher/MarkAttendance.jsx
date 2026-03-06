import React from 'react';
import { Paper, Typography } from '@mui/material';
import EventAvailableOutlined from '@mui/icons-material/EventAvailableOutlined';
import PageWrapper from '../../components/common/PageWrapper';

const MarkAttendance = () => (
  <PageWrapper title="Mark Attendance">
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
      }}
    >
      <EventAvailableOutlined sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Daily attendance
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Select a class and date to mark attendance. Use the grid to set present, absent, or late for each student.
      </Typography>
    </Paper>
  </PageWrapper>
);

export default MarkAttendance;

