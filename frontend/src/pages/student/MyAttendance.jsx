import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import api from '../../services/api';

const MyAttendance = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/attendance/student/me');
      setRecords(Array.isArray(data) ? data : []);
    };
    load();
  }, []);

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        My Attendance
      </Typography>
      <Paper sx={{ p: 2 }}>
        {records.map((r) => (
          <Typography key={r._id} variant="body2">
            {new Date(r.date).toLocaleDateString()} - {r.status}
          </Typography>
        ))}
      </Paper>
    </Box>
  );
};

export default MyAttendance;

