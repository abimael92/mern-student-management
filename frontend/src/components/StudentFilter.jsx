import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

const StudentFilter = ({ onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (event) => {
    setSearchQuery(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 3,
        gap: 2,
      }}
    >
      <TextField
        label="Search by name"
        variant="outlined"
        value={searchQuery}
        onChange={handleFilterChange}
        sx={{ width: 350, bgcolor: 'white', borderRadius: 1 }}
      />
      <Button variant="contained" color="error" onClick={() => onFilter('')}>
        Clear Filter
      </Button>
    </Box>
  );
};

export default StudentFilter;
