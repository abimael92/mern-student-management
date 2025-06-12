import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const ClassForm = ({ selectedClass, onSave, onCancel }) => {
  const courses = useSelector((st) => st.courses?.courses || []);
  const teachers = useSelector((st) => st.teachers?.teachers || []);
  const rooms = useSelector((st) => st.rooms?.rooms || []);
  const students = useSelector((st) => st.students?.students || []);

  const [form, setForm] = useState({
    schedule: '',
    course: '',
    teacher: '',
    room: '',
    students: [],
  });

  useEffect(() => {
    if (selectedClass) {
      setForm({
        schedule: selectedClass.schedule,
        course: selectedClass.course?._id || selectedClass.course,
        teacher: selectedClass.teacher?._id || selectedClass.teacher,
        room: selectedClass.room?._id || selectedClass.room,
        students:
          selectedClass.students?.map((s) =>
            typeof s === 'object' ? s._id : s
          ) || [],
      });
    } else {
      setForm({
        schedule: '',
        course: '',
        teacher: '',
        room: '',
        students: [],
      });
    }
  }, [selectedClass]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Schedule"
            name="schedule"
            value={form.schedule}
            onChange={handleChange}
            required
          />
        </Grid>
        {[
          { name: 'course', label: 'Course', data: courses },
          { name: 'teacher', label: 'Teacher', data: teachers },
          { name: 'room', label: 'Room', data: rooms },
        ].map(({ name, label, data }) => (
          <Grid item xs={12} md={4} key={name}>
            <TextField
              select
              fullWidth
              label={label}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
            >
              <MenuItem value="">None</MenuItem>
              {data.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Students"
            name="students"
            value={form.students}
            onChange={handleChange}
            SelectProps={{ multiple: true }}
          >
            {students.map((st) => (
              <MenuItem key={st._id} value={st._id}>
                {st.firstName} {st.lastName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {selectedClass ? 'Update' : 'Add'} Class
          </Button>
          <Button onClick={onCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ClassForm;
