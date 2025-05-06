import React, { useState } from 'react';
import {
  TextField,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const TeacherFilter = ({ onFilter }) => {
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
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
        mb: 3,
      }}
    >
      <TextField
        label="Search Name"
        variant="outlined"
        value={filters.name}
        onChange={handleChange('name')}
        sx={{ width: 250 }}
      />

      <TextField
        label="Search Clan"
        variant="outlined"
        value={filters.clan}
        onChange={handleChange('clan')}
        sx={{ width: 250 }}
      />

      <TextField
        label="Age"
        type="number"
        variant="outlined"
        value={filters.age}
        onChange={handleChange('age')}
        sx={{ width: 120 }}
      />

      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel>Grade</InputLabel>
        <Select
          value={filters.grade}
          onChange={handleChange('grade')}
          label="Grade"
        >
          <MenuItem value="">
            <em>Any</em>
          </MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Tutor"
        variant="outlined"
        value={filters.tutor}
        onChange={handleChange('tutor')}
        sx={{ width: 160 }}
      />

      <TextField
        label="Nationality"
        variant="outlined"
        value={filters.nationality}
        onChange={handleChange('nationality')}
        sx={{ width: 160 }}
      />

      <Button variant="contained" color="error" onClick={handleClear}>
        Clear
      </Button>
    </Box>
  );
};

export default TeacherFilter;
