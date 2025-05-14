import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const GradeHistory = ({ history }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="subtitle1" gutterBottom>
      Grade History
    </Typography>
    <List>
      {history.map((item, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`Semester: ${item.semester}`}
            secondary={`Grade: ${item.grade}`}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default GradeHistory;
