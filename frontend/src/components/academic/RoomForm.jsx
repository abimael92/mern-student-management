import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';

const RoomForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: initialData.name || '',
    capacity: initialData.capacity || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      capacity: Number(form.capacity),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Room Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Capacity"
            name="capacity"
            type="number"
            value={form.capacity}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {initialData._id ? 'Update' : 'Add'} Room
          </Button>
          <Button onClick={onCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomForm;
