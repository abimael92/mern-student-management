import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const subjects = [
  'Math',
  'Science',
  'English',
  'History',
  'Art',
  'Music',
  'PE',
  'Computers',
  'Languages',
];

const TeacherFilter = ({ filter, onFilterChange }) => {
  const handleChange = (field) => (e) => {
    onFilterChange({ ...filter, [field]: e.target.value });
  };

  const clearSearch = () => {
    onFilterChange({ ...filter, search: '' });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <TextField
        label="Search"
        value={filter.search}
        onChange={handleChange('search')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: filter.search && (
            <IconButton onClick={clearSearch} size="small">
              <ClearIcon />
            </IconButton>
          ),
        }}
        sx={{ minWidth: 250 }}
      />

      <TextField
        select
        label="Status"
        value={filter.status}
        onChange={handleChange('status')}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="all">All Status</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </TextField>

      <TextField
        select
        label="Subject"
        value={filter.subject}
        onChange={handleChange('subject')}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All Subjects</MenuItem>
        {subjects.map((subject) => (
          <MenuItem key={subject} value={subject}>
            {subject}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default TeacherFilter;
