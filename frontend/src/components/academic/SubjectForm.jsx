import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
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
    console.log('Selected subject:', initialData);
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
    <Paper sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {initialData._id ? 'Edit Subject' : 'New Subject'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Table>
          <TableBody>
            {/* Show subject code only if editing */}
            {initialData._id && (
              <TableRow>
                <TableCell>Subject Code</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="subjectCode"
                    value={formData.subjectCode}
                    disabled
                  />
                </TableCell>
              </TableRow>
            )}

            {/* When creating new, show Subject Code as preview but disabled, on top */}
            {!initialData._id && (
              <TableRow>
                <TableCell>Subject Code Preview</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="subjectCode"
                    value={formData.subjectCode}
                    disabled
                  />
                </TableCell>
              </TableRow>
            )}

            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Credit Value</TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  type="number"
                  name="creditValue"
                  value={formData.creditValue}
                  onChange={handleChange}
                  inputProps={{ min: 0 }}
                  required
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Department</TableCell>
              <TableCell>
                <TextField
                  select
                  fullWidth
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="">Select Department</MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept._id} value={dept._id}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

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
