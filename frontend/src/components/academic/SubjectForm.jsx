import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';

const SubjectForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    code: initialData.code || '',
    school: initialData.school || '',
    description: initialData.description || '',
    area: initialData.area || '',
    courseCode: initialData.courseCode || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {initialData.id ? 'Edit Subject' : 'New Subject'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="School"
          name="school"
          value={formData.school}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Course Code"
          name="courseCode"
          value={formData.courseCode}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 1 }}
        >
          Save
        </Button>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </Paper>
  );
};

export default SubjectForm;
