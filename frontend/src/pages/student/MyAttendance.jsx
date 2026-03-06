import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import api from '../../services/api';
import PageWrapper from '../../components/common/PageWrapper';

const MyAttendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/attendance/student/me');
        setRecords(Array.isArray(data) ? data : []);
      } catch {
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <PageWrapper title="My Attendance">
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress />
          </Box>
        ) : records.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No attendance records yet.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {records.map((r, i) => (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Typography variant="body2">
                  {new Date(r.date).toLocaleDateString()} — <strong>{r.status}</strong>
                </Typography>
              </motion.div>
            ))}
          </Box>
        )}
      </Paper>
    </PageWrapper>
  );
};

export default MyAttendance;

