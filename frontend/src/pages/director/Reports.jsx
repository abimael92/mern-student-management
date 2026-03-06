import React from 'react';
import { Paper, Typography } from '@mui/material';
import Assessment from '@mui/icons-material/Assessment';
import PageWrapper from '../../components/common/PageWrapper';

const DirectorReports = () => (
  <PageWrapper title="Reports">
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
      }}
    >
      <Assessment sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Performance reports
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Generate and view institutional reports.
      </Typography>
    </Paper>
  </PageWrapper>
);

export default DirectorReports;
