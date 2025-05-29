import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const CourseForm = ({ selectedCourse, onSave, onCancel, teachers = [] }) => {
  const [form, setForm] = useState({
    name: '',
    code: '',
    instructor: '',
    semester: '',
    grade: '',
  });

  useEffect(() => {
    if (selectedCourse) {
      setForm({
        name: selectedCourse.name || '',
        code: selectedCourse.code || '',
        instructor: selectedCourse.instructor?._id || '',
        semester: selectedCourse.semester || '',
        grade: selectedCourse.grade || '',
      });
    }
  }, [selectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form);
    setForm({ name: '', code: '', instructor: '', semester: '', grade: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Course Code"
            name="code"
            value={form.code}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Course Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Instructor"
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            {teachers.map((t) => (
              <MenuItem key={t._id} value={t._id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Semester"
            name="semester"
            value={form.semester}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Grade"
            name="grade"
            value={form.grade}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {selectedCourse ? 'Update' : 'Add'} Course
          </Button>
          <Button
            onClick={onCancel}
            color="secondary"
            style={{ marginLeft: '1rem' }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CourseForm;
