import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

const SubjectDetail = ({ subject, onEdit, onDelete }) => {
  if (!subject) return null;

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Subject Details
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Name" secondary={subject.name} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Code" secondary={subject.code} />
        </ListItem>
        <ListItem>
          <ListItemText primary="School" secondary={subject.school} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Description" secondary={subject.description} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Area" secondary={subject.area} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Course Code" secondary={subject.courseCode} />
        </ListItem>
      </List>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, mr: 1 }}
        onClick={onEdit}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        color="error"
        sx={{ mt: 2 }}
        onClick={onDelete}
      >
        Delete
      </Button>
    </Paper>
  );
};

export default SubjectDetail;
