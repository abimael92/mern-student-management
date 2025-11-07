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

// Generates subject code abbreviation dynamically
const generateSubjectAbbr = (name) => {
  if (!name) return '';
  const words = name.trim().split(' ').filter(Boolean);
  const abbrParts = [];
  for (let i = 0; i < words.length && abbrParts.length < 2; i++) {
    if (words[i].length >= 3)
      abbrParts.push(words[i].slice(0, 3).toUpperCase());
  }
  if (abbrParts.length < 2 && words.length > abbrParts.length) {
    for (let i = 0; i < words.length && abbrParts.length < 2; i++) {
      if (words[i].length < 3)
        abbrParts.push(words[i].slice(0, 3).toUpperCase());
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

  // Update subject code abbreviation dynamically for new subjects
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
    <Paper
      sx={{
        p: 4,
        maxWidth: 650,
        mx: 'auto',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease',
        '&:hover': { boxShadow: '0 12px 48px rgba(0,0,0,0.15)' },
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          mb: 3,
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
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
                  backgroundColor: '#f0f0f0',
                  color: '#888888',
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

        <Box mb={2} display="flex" gap={2} flexWrap="wrap">
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

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button
            type="submit"
            variant="contained"
            sx={{
              px: 4,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{
              px: 4,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: '#667eea',
              color: '#667eea',
              '&:hover': { backgroundColor: '#f0f0ff', borderColor: '#764ba2' },
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SubjectForm;
