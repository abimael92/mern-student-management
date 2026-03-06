import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import PageWrapper from '../../components/common/PageWrapper';

const MyProfile = () => {
  const { user } = useAuth();
  const profile = user?.profile || {};
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || user?.username;

  return (
    <PageWrapper title="My Profile">
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1"><strong>Name:</strong> {fullName}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
          <Typography variant="body1"><strong>Phone:</strong> {profile.phone || '—'}</Typography>
        </Box>
      </Paper>
    </PageWrapper>
  );
};

export default MyProfile;

