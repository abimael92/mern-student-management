import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const GPAOverviewCard = ({ gpa }) => {
  const formattedGPA = gpa != null ? gpa.toFixed(2) : 'N/A';

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6">Overall GPA</Typography>
        <Typography variant="h4" color="primary">
          {formattedGPA}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GPAOverviewCard;
