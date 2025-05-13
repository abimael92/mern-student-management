import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const SubjectListItem = ({ subject, onEdit, onDelete }) => {
  return (
    <ListItem divider>
      <ListItemText primary={subject.name} secondary={subject.description} />
      <ListItemSecondaryAction>
        <IconButton color="primary" onClick={() => onEdit(subject)}>
          <Edit />
        </IconButton>
        <IconButton color="secondary" onClick={() => onDelete(subject._id)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SubjectListItem;
