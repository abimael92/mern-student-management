import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const CourseForm = ({ selectedCourse, onSave, onCancel }) => {
  const teachers = useSelector((state) => state.teachers.teachers || []);

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
        // Handle instructor as object or string id:
        instructor:
          selectedCourse.instructor &&
          typeof selectedCourse.instructor === 'object'
            ? selectedCourse.instructor._id
            : selectedCourse.instructor || '',
        semester: selectedCourse.semester || '',
        grade: selectedCourse.grade || '',
      });
    } else {
      setForm({
        name: '',
        code: '',
        instructor: '',
        semester: '',
        grade: '',
      });
    }
  }, [selectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(form);
      // Clear only if adding a new course (no selectedCourse)
      if (!selectedCourse) {
        setForm({
          name: '',
          code: '',
          instructor: '',
          semester: '',
          grade: '',
        });
      }
    } catch (error) {
      // Optionally handle save error here
      console.error('Failed to save course:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {selectedCourse && (
          <Grid item xs={6}>
            <TextField
              label="Course Code"
              name="code"
              value={form.code}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        )}
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
            {Array.isArray(teachers) &&
              teachers.map((t) => (
                <MenuItem key={t._id} value={t._id}>
                  {t.firstName} {t.lastName}
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
            type="button"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CourseForm;
