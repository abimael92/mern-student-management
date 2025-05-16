import React from 'react';
import { Typography } from '@mui/material';

const FeeSummary = ({ records }) => {
  const total = records.length;
  const paid = records.filter((r) => r.status === 'Paid').length;
  const unpaid = records.filter((r) => r.status === 'Unpaid').length;
  const partial = records.filter((r) => r.status === 'Partial').length;

  return (
    <>
      <Typography variant="h6">Summary</Typography>
      <Typography>Total Fees: {total}</Typography>
      <Typography>Paid: {paid}</Typography>
      <Typography>Unpaid: {unpaid}</Typography>
      <Typography>Partial: {partial}</Typography>
    </>
  );
};

export default FeeSummary;
