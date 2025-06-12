import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';

const generateSubjectAbbr = (name) => {
  if (!name) return '';

  const words = name.trim().split(' ').filter(Boolean);
  const abbrParts = [];

  for (let i = 0; i < words.length && abbrParts.length < 2; i++) {
    if (words[i].length >= 3) {
      abbrParts.push(words[i].slice(0, 3).toUpperCase());
    }
  }

  if (abbrParts.length < 2 && words.length > abbrParts.length) {
    for (let i = 0; i < words.length && abbrParts.length < 2; i++) {
      if (words[i].length < 3) {
        abbrParts.push(words[i].slice(0, 3).toUpperCase());
      }
    }
  }

  return abbrParts.join('');
};

const SubjectForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const departments = useSelector((state) => state.departments || []);

  const [formData, setFormData] = useState({
    name: '',
    subjectCode: '',
    description: '',
    creditValue: '',
    department: '',
  });

  useEffect(() => {
    setFormData({
      name: initialData.name || '',
      subjectCode: initialData.subjectCode || '',
      description: initialData.description || '',
      creditValue: initialData.creditValue || '',
      department: initialData.department?._id || '',
    });
  }, [initialData]);

  // Update subject code abbreviation preview on name change if creating new
  useEffect(() => {
    if (!initialData._id) {
      const abbr = generateSubjectAbbr(formData.name);
      setFormData((prev) => ({ ...prev, subjectCode: abbr }));
    }
  }, [formData.name, initialData._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {initialData._id ? 'Edit Subject' : 'New Subject'}
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        {initialData._id && (
          <Box mb={2}>
            <TextField
              label="Subject Code"
              fullWidth
              name="subjectCode"
              value={formData.subjectCode}
              disabled
              sx={{
                maxWidth: 250,
                mx: 'auto',
                '& .MuiInputBase-root.Mui-disabled': {
                  backgroundColor: '#f0f0f0', // light gray background
                  color: '#888888', // darker gray text
                },
              }}
            />
          </Box>
        )}

        <Box mb={2}>
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Box>

        <Box mb={2} display="flex" gap={2}>
          <TextField
            label="Credit"
            type="number"
            name="creditValue"
            value={formData.creditValue}
            onChange={handleChange}
            inputProps={{ min: 0 }}
            fullWidth
            required
          />
          <TextField
            select
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept._id} value={dept._id}>
                {dept.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box mb={3}>
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Box>

        <Box display="flex" gap={2}>
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SubjectForm;
