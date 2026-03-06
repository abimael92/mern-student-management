import React from 'react';
import { Paper, Typography } from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import PageWrapper from '../../components/common/PageWrapper';

const DirectorAnalytics = () => (
  <PageWrapper title="Analytics">
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
      }}
    >
      <TrendingUp sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        School-wide analytics
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Enrollment trends, attendance rates, and performance metrics.
      </Typography>
    </Paper>
  </PageWrapper>
);

export default DirectorAnalytics;
