import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const statusColors = {
  Paid: 'success',
  Unpaid: 'error',
  Partial: 'warning',
};

const FeeStatusOverview = ({ records }) => {
  const statuses = ['Paid', 'Unpaid', 'Partial'];

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

export default FeeStatusOverview;
