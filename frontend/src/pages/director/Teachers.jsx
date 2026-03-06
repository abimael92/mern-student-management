import React from 'react';
import { Paper, Typography } from '@mui/material';
import People from '@mui/icons-material/People';
import PageWrapper from '../../components/common/PageWrapper';

const DirectorTeachers = () => (
  <PageWrapper title="Teachers Overview">
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
      }}
    >
      <People sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Teaching staff overview
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Read-only view of teachers and assignments.
      </Typography>
    </Paper>
  </PageWrapper>
);

export default DirectorTeachers;
