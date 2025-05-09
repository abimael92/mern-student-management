import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SubjectForm = ({ selectedSubject, onSave }) => {
  const [subjectData, setSubjectData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (selectedSubject) {
      setSubjectData({
        name: selectedSubject.name,
        description: selectedSubject.description,
      });
    }
  }, [selectedSubject]);

  const handleChange = (e) => {
    setSubjectData({
      ...subjectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(subjectData);
    setSubjectData({ name: '', description: '' }); // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Subject Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={subjectData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Subject Description"
        variant="outlined"
        fullWidth
        margin="normal"
        name="description"
        value={subjectData.description}
        onChange={handleChange}
      />
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            {selectedSubject ? 'Update' : 'Add'} Subject
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SubjectForm;
