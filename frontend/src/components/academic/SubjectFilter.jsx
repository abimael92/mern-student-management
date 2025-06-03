// components/courses/SubjectFilter.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { TextField, MenuItem } from '@mui/material';

const SubjectFilter = ({ subjectFilter, onChange }) => {
  const subjects = useSelector((state) => state.subjects.subjects || []);

  return (
    <TextField
      select
      label="Filter by Subject"
      value={subjectFilter}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      style={{ marginBottom: 20 }}
    >
      <MenuItem value="">All Subjects</MenuItem>
      {subjects.map((subject) => (
        <MenuItem key={subject._id} value={subject._id}>
          {subject.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SubjectFilter;
