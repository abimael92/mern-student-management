import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const MyProfile = () => {
  const { user } = useAuth();
  const profile = user?.profile || {};
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        My Profile
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="body2">Name: {profile.firstName} {profile.lastName}</Typography>
        <Typography variant="body2">Email: {user?.email}</Typography>
        <Typography variant="body2">Phone: {profile.phone}</Typography>
      </Paper>
    </Box>
  );
};

export default MyProfile;

