import React, { useState } from 'react';
import {
  TextField,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Typography,
  IconButton,
  Grid2 as Grid,
} from '@mui/material';
import { Search, Clear, FilterList, PersonSearch } from '@mui/icons-material';

const StudentFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    name: '',
    clan: '',
    age: '',
    grade: '',
    tutor: '',
    nationality: '',
  });

  const handleChange = (field) => (event) => {
    const updated = { ...filters, [field]: event.target.value };
    setFilters(updated);
    onFilter(updated);
  };

  const handleClear = () => {
    const cleared = {
      name: '',
      clan: '',
      age: '',
      grade: '',
      tutor: '',
      nationality: '',
    };
    setFilters(cleared);
    onFilter(cleared);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
          Student Search & Filters
        </Typography>
        <FilterList color="action" sx={{ ml: 'auto' }} />
      </Box>

      <Grid container spacing={2} alignItems="center">
        {/* Name Search */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Student Name"
            variant="outlined"
            value={filters.name}
            onChange={handleChange('name')}
            fullWidth
            placeholder="Enter student name..."
            InputProps={{
              startAdornment: <Search color="action" sx={{ mr: 1 }} />,
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

        {/* Clan Search */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Clan/Family"
            variant="outlined"
            value={filters.clan}
            onChange={handleChange('clan')}
            fullWidth
            placeholder="Search by clan..."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
              },
            }}
          />
        </Grid>

        {/* Age */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <TextField
            label="Age"
            type="number"
            variant="outlined"
            value={filters.age}
            onChange={handleChange('age')}
            fullWidth
            InputProps={{
              inputProps: { min: 0, max: 100 },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
              },
            }}
          />
        </Grid>

        {/* Grade */}
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Grade Level</InputLabel>
            <Select
              value={filters.grade}
              onChange={handleChange('grade')}
              label="Grade Level"
              sx={{
                borderRadius: 2,
                backgroundColor: 'white',
              }}
            >
              <MenuItem value="">
                <em>All Grades</em>
              </MenuItem>
              <MenuItem value="A">Grade A</MenuItem>
              <MenuItem value="B">Grade B</MenuItem>
              <MenuItem value="C">Grade C</MenuItem>
              <MenuItem value="D">Grade D</MenuItem>
              <MenuItem value="F">Grade F</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Tutor */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Tutor/Instructor"
            variant="outlined"
            value={filters.tutor}
            onChange={handleChange('tutor')}
            fullWidth
            placeholder="Search by tutor..."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
              },
            }}
          />
        </Grid>

        {/* Nationality */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Nationality"
            variant="outlined"
            value={filters.nationality}
            onChange={handleChange('nationality')}
            fullWidth
            placeholder="Enter nationality..."
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
            onClick={handleClear}
            startIcon={<Clear />}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Clear Filters
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
            Search Students
          </Button>
        </Grid>
      </Grid>

      {/* Active Filters Indicator */}
      {Object.values(filters).some((value) => value !== '') && (
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
          {Object.entries(filters).map(
            ([key, value]) =>
              value && (
                <Box
                  key={key}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    backgroundColor: 'primary.light',
                    color: 'white',
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {key}: {value}
                </Box>
              )
          )}
        </Box>
      )}
    </Paper>
  );
};

export default StudentFilter;
