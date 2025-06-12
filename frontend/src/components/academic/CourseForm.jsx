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

const CourseForm = ({ selectedCourse, onSave, onCancel }) => {
  const subjects = useSelector((state) => state.subjects?.subjects || []);
  const semesters = useSelector((state) => state.semesters?.semesters || []);
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
        semester: selectedCourse.semester?._id || selectedCourse.semester || '',
        prerequisites:
          selectedCourse.prerequisites?.map((p) =>
            typeof p === 'object' ? p._id : p
          ) || [],
      });
    } else {
      setFormData({
        name: '',
        credits: '',
        description: '',
        subject: '',
        semester: '',
        prerequisites: [],
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
            required
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
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
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
          <FormControl fullWidth required>
            <InputLabel>Semester</InputLabel>
            <Select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              label="Semester"
            >
              {semesters.map((s) => (
                <MenuItem key={s._id} value={s._id}>
                  {s.name}
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
