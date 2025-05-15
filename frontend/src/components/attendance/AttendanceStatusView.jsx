import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const statusColors = {
  Present: 'success',
  Absent: 'error',
  Late: 'warning',
};

const AttendanceStatusView = ({ records }) => {
  const statuses = ['Present', 'Absent', 'Late'];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Status Overview
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {statuses.map((status) => {
          const count = records.filter((r) => r.status === status).length;
          return (
            <Chip
              key={status}
              label={`${status}: ${count}`}
              color={statusColors[status]}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default AttendanceStatusView;
