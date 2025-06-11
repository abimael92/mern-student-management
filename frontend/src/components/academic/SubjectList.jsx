import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Paper,
} from '@mui/material';

const SubjectList = ({ subjects, onSelect }) => {
  if (!subjects || subjects.length === 0) {
    return (
      <Typography variant="body1" align="center" sx={{ mt: 4 }}>
        No subjects available.
      </Typography>
    );
  }

  return (
    <Paper sx={{ p: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Subjects
      </Typography>
      <List>
        {subjects.map((subject) => (
          <ListItem disablePadding key={subject._id}>
            <ListItemButton onClick={() => onSelect(subject)}>
              <ListItemText
                primary={`${subject.name} (${subject.code})`}
                secondary={subject.school}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SubjectList;
