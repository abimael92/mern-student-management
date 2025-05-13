import React from 'react';
import { Typography, List } from '@mui/material';
import SubjectListItem from './SubjectListItem';

const SubjectList = ({ subjects, onEdit, onDelete }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Subject List
      </Typography>
      {subjects.length === 0 ? (
        <Typography>No subjects available.</Typography>
      ) : (
        <List>
          {subjects.map((subject) => (
            <SubjectListItem
              key={subject._id}
              subject={subject}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </List>
      )}
    </div>
  );
};

export default SubjectList;
