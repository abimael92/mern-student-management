import React from 'react';
import { Paper, Typography } from '@mui/material';
import PageWrapper from '../../components/common/PageWrapper';

const Settings = () => (
  <PageWrapper title="System Settings">
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Configure global system options here (feature toggles, academic year, etc.).
      </Typography>
    </Paper>
  </PageWrapper>
);

export default Settings;

