import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

import FeeSummary from '../../components/fees/FeeSummary';
import FeeHistory from '../../components/fees/FeeHistory';
import FeeStatusOverview from '../../components/fees/FeeStatusOverview';

import { feeRecords } from '../../utils/mock/mockFeesData';

const FeesPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Fees Overview
      </Typography>

      <Paper sx={{ p: 2, mt: 2 }}>
        <FeeSummary records={feeRecords} />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <FeeHistory records={feeRecords} />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <FeeStatusOverview records={feeRecords} />
      </Paper>
    </Box>
  );
};

export default FeesPage;
