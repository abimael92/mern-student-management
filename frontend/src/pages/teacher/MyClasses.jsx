import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import api from '../../services/api';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/classes', { params: { page: 1, limit: 50 } });
      setClasses(Array.isArray(data) ? data : data.classes || []);
    };
    load();
  }, []);

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        My Classes
      </Typography>
      {classes.map((c) => (
        <Paper key={c._id} sx={{ p: 2, mb: 1 }}>
          <Typography variant="subtitle1">
            {c.name} {c.section}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default MyClasses;

