import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  Grid2 as Grid,
  Button,
  Chip,
} from '@mui/material';
import {
  Search,
  Clear,
  FilterList,
  PersonSearch,
  Work,
  Public,
  Person,
} from '@mui/icons-material';

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

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'available', label: 'Available' },
  { value: 'busy', label: 'Busy' },
  { value: 'on leave', label: 'On Leave' },
  { value: 'inactive', label: 'Inactive' },
];

const TeacherFilter = ({ filter, onFilterChange }) => {
  const handleChange = (field) => (e) => {
    onFilterChange({ ...filter, [field]: e.target.value });
  };

  const clearSearch = () => {
    onFilterChange({ ...filter, search: '' });
  };

  const handleClearAll = () => {
    onFilterChange({
      search: '',
      status: 'all',
      subject: '',
      country: '',
      experience: '',
      students: '',
    });
  };

  const hasActiveFilters = Object.values(filter).some(
    (value) => value && value !== 'all' && value !== ''
  );

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
        <PersonSearch color="primary" />
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          fontWeight="600"
        >
          Teacher Search & Filters
        </Typography>
        <FilterList color="action" sx={{ ml: 'auto' }} />
      </Box>

      <Grid container spacing={2} alignItems="center">
        {/* Name Search */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Search Teachers"
            variant="outlined"
            value={filter.search}
            onChange={handleChange('search')}
            fullWidth
            placeholder="Search by name, email, or teacher number..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              endAdornment: filter.search && (
                <IconButton onClick={clearSearch} size="small">
                  <Clear />
                </IconButton>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>

        {/* Status */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <TextField
            select
            label="Status"
            value={filter.status}
            onChange={handleChange('status')}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
              },
            }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Subject */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <TextField
            select
            label="Subject"
            value={filter.subject}
            onChange={handleChange('subject')}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
              },
            }}
          >
            <MenuItem value="">All Subjects</MenuItem>
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Country */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <TextField
            label="Country"
            variant="outlined"
            value={filter.country}
            onChange={handleChange('country')}
            fullWidth
            placeholder="Filter by country..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Public fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
              },
            }}
          />
        </Grid>

        {/* Experience */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <TextField
            label="Min Experience"
            type="number"
            variant="outlined"
            value={filter.experience}
            onChange={handleChange('experience')}
            fullWidth
            placeholder="Years"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Work fontSize="small" color="action" />
                </InputAdornment>
              ),
              inputProps: { min: 0, max: 50 },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
              },
            }}
          />
        </Grid>

        {/* Student Count */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <TextField
            label="Min Students"
            type="number"
            variant="outlined"
            value={filter.students}
            onChange={handleChange('students')}
            fullWidth
            placeholder="Count"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person fontSize="small" color="action" />
                </InputAdornment>
              ),
              inputProps: { min: 0 },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
              },
            }}
          />
        </Grid>

        {/* Action Buttons */}
        <Grid
          size={{ xs: 12 }}
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClearAll}
            startIcon={<Clear />}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Clear All
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Search />}
            sx={{
              borderRadius: 2,
              px: 4,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            Search Teachers
          </Button>
        </Grid>
      </Grid>

      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Active filters:
          </Typography>
          {Object.entries(filter).map(
            ([key, value]) =>
              value &&
              value !== 'all' && (
                <Chip
                  key={key}
                  label={`${key}: ${value}`}
                  size="small"
                  onDelete={() =>
                    onFilterChange({
                      ...filter,
                      [key]: key === 'status' ? 'all' : '',
                    })
                  }
                  color="primary"
                  variant="outlined"
                />
              )
          )}
        </Box>
      )}
    </Paper>
  );
};

export default TeacherFilter;
