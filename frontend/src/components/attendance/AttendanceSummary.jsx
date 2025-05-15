import React from 'react';
import { Typography } from '@mui/material';

const AttendanceSummary = ({ records }) => {
  const total = records.length;
  const present = records.filter((r) => r.status === 'Present').length;
  const absent = records.filter((r) => r.status === 'Absent').length;
  const late = records.filter((r) => r.status === 'Late').length;

  return (
    <>
      <Typography variant="h6">Summary</Typography>
      <Typography>Total Records: {total}</Typography>
      <Typography>Present: {present}</Typography>
      <Typography>Absent: {absent}</Typography>
      <Typography>Late: {late}</Typography>
    </>
  );
};

export default AttendanceSummary;
