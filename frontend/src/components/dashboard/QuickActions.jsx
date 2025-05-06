import React from 'react';
import { Button, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';

const QuickActions = ({ onEnroll, onNotify }) => (
  <Box display="flex" gap={2}>
    <Button
      variant="contained"
      startIcon={<PersonAddIcon />}
      onClick={onEnroll}
    >
      Enroll Student
    </Button>
    <Button
      variant="contained"
      color="secondary"
      startIcon={<NotificationsIcon />}
      onClick={onNotify}
    >
      Send Notice
    </Button>
  </Box>
);

export default QuickActions;
