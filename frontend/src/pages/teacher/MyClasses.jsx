import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import api from '../../services/api';
import PageWrapper from '../../components/common/PageWrapper';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/classes', { params: { page: 1, limit: 50 } });
        setClasses(Array.isArray(data) ? data : data.classes || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <PageWrapper title="My Classes">
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {classes.map((c, i) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  '&:hover': { boxShadow: '0 14px 40px rgba(0, 0, 0, 0.12)' },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {c.name} {c.section}
                </Typography>
                {c.code && (
                  <Typography variant="body2" color="text.secondary">
                    {c.code}
                  </Typography>
                )}
              </Paper>
            </motion.div>
          ))}
        </Box>
      )}
    </PageWrapper>
  );
};

export default MyClasses;

