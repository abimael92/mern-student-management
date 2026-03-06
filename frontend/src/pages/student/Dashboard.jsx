import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import PageWrapper from '../../components/common/PageWrapper';
import EventNote from '@mui/icons-material/EventNote';
import Person from '@mui/icons-material/Person';

const StudentDashboard = () => {
  const { user } = useAuth();
  const name = user?.profile?.firstName || user?.username || 'Student';

  return (
    <PageWrapper title={`Welcome, ${name}`}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Person sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight={600}>
                  My Profile
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.95 }}>
                View your profile and contact information.
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <EventNote sx={{ fontSize: 40 }} />
                <Typography variant="h6" fontWeight={600}>
                  My Attendance
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.95 }}>
                Check your attendance history and stats.
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default StudentDashboard;

