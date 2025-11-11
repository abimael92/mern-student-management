import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { useSelector } from 'react-redux';

// Semester options with exact format you requested
const SEMESTER_OPTIONS = [
  'Fall 2024 (Aug-Dec)',
  'Spring 2025 (Jan-May)',
  'Summer 2025 (Jun-Jul)',
];

const CourseForm = ({ selectedCourse, onSave, onCancel }) => {
  const subjects = useSelector((state) => state.subjects?.subjects || []);
  const courses = useSelector((state) => state.courses?.courses || []);

  const [formData, setFormData] = useState({
    name: '',
    credits: '',
    description: '',
    subject: '',
    semester: '',
    prerequisites: [],
  });

  useEffect(() => {
    if (selectedCourse) {
      setFormData({
        name: selectedCourse.name || '',
        credits: selectedCourse.credits || '',
        description: selectedCourse.description || '',
        subject: selectedCourse.subject?._id || selectedCourse.subject || '',
        semester: selectedCourse.semester || '',
        prerequisites:
          selectedCourse.prerequisites?.map((p) =>
            typeof p === 'object' ? p._id : p
          ) || [],
      });
    }
  }, [selectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="name"
            label="Course Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            name="credits"
            label="Credits"
            type="number"
            value={formData.credits}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Subject</InputLabel>
            <Select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              label="Subject"
            >
              {subjects.map((s) => (
                <MenuItem key={s._id} value={s._id}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Semester</InputLabel>
            <Select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              label="Semester"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {SEMESTER_OPTIONS.map((semester) => (
                <MenuItem key={semester} value={semester}>
                  {semester}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Prerequisites</InputLabel>
            <Select
              name="prerequisites"
              multiple
              value={formData.prerequisites}
              onChange={handleChange}
              input={<OutlinedInput label="Prerequisites" />}
              renderValue={(selected) =>
                courses
                  .filter((c) => selected.includes(c._id))
                  .map((c) => c.name)
                  .join(', ')
              }
            >
              {courses.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  <Checkbox checked={formData.prerequisites.includes(c._id)} />
                  <ListItemText primary={c.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {selectedCourse ? 'Update' : 'Add'} Course
          </Button>
          <Button onClick={onCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CourseForm;
