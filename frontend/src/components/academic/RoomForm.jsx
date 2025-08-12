import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';

const RoomForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    displayName: initialData.displayName || '',
    building: initialData.building || 'Main',
    floor: initialData.floor || 1,
    roomType: initialData.roomType || 'Classroom',
    departmentRestriction: initialData.departmentRestriction || 'None',
    seatingCapacity: initialData.seatingCapacity || 30,
    examCapacity:
      initialData.examCapacity ||
      Math.floor((initialData.seatingCapacity || 30) * 0.7),
    hasProjector: initialData.hasProjector || false,
    hasSmartBoard: initialData.hasSmartBoard || false,
    isWheelchairAccessible: initialData.isWheelchairAccessible || true,
    isActive: initialData.isActive !== undefined ? initialData.isActive : true,
    labEquipment: initialData.labEquipment || [],
  });

  const buildingOptions = ['Main', 'Science', 'Arts', 'Gym', 'Annex'];
  const roomTypeOptions = [
    'Classroom',
    'Lab',
    'Auditorium',
    'Gymnasium',
    'Specialized',
  ];
  const departmentOptions = ['STEM', 'Humanities', 'Arts', 'None'];
  const equipmentOptions = [
    'Microscopes',
    'Bunsen Burners',
    'Computers',
    'Chemicals',
    'Glassware',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEquipmentChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      labEquipment: checked
        ? [...prev.labEquipment, value]
        : prev.labEquipment.filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      seatingCapacity: Number(form.seatingCapacity),
      examCapacity: Number(form.examCapacity),
      floor: Number(form.floor),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {initialData._id ? 'Edit Room' : 'Add New Room'}
      </Typography>

      <Grid container spacing={2}>
        {/* Basic Information */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Display Name"
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Building</InputLabel>
            <Select
              name="building"
              value={form.building}
              onChange={handleChange}
              label="Building"
              required
            >
              {buildingOptions.map((building) => (
                <MenuItem key={building} value={building}>
                  {building}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            label="Floor"
            name="floor"
            type="number"
            value={form.floor}
            onChange={handleChange}
            inputProps={{ min: 0, max: 10 }}
            required
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Room Type</InputLabel>
            <Select
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              label="Room Type"
              required
            >
              {roomTypeOptions.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Department Restriction</InputLabel>
            <Select
              name="departmentRestriction"
              value={form.departmentRestriction}
              onChange={handleChange}
              label="Department Restriction"
            >
              {departmentOptions.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Capacity */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Seating Capacity"
            name="seatingCapacity"
            type="number"
            value={form.seatingCapacity}
            onChange={handleChange}
            inputProps={{ min: 1, max: 300 }}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Exam Capacity"
            name="examCapacity"
            type="number"
            value={form.examCapacity}
            onChange={handleChange}
            inputProps={{ min: 1, max: Math.floor(form.seatingCapacity * 0.7) }}
            required
          />
        </Grid>

        {/* Equipment & Features */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Equipment & Features
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.hasProjector}
                    onChange={handleChange}
                    name="hasProjector"
                  />
                }
                label="Has Projector"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.hasSmartBoard}
                    onChange={handleChange}
                    name="hasSmartBoard"
                  />
                }
                label="Has Smart Board"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.isWheelchairAccessible}
                    onChange={handleChange}
                    name="isWheelchairAccessible"
                  />
                }
                label="Wheelchair Accessible"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.isActive}
                    onChange={handleChange}
                    name="isActive"
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Lab Equipment (conditionally shown for Labs) */}
        {form.roomType === 'Lab' && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Lab Equipment
            </Typography>
            <Grid container spacing={2}>
              {equipmentOptions.map((equipment) => (
                <Grid item xs={6} md={4} key={equipment}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.labEquipment.includes(equipment)}
                        onChange={handleEquipmentChange}
                        value={equipment}
                      />
                    }
                    label={equipment}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {/* Form Actions */}
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}
        >
          <Button onClick={onCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData._id ? 'Update' : 'Add'} Room
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomForm;
