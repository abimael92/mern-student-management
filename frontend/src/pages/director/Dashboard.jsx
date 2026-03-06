import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Assessment from '@mui/icons-material/Assessment';
import People from '@mui/icons-material/People';
import PageWrapper from '../../components/common/PageWrapper';

const DirectorDashboard = () => (
  <PageWrapper title="Director Dashboard">
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Assessment sx={{ fontSize: 40 }} />
              <Typography variant="h6" fontWeight={600}>
                Analytics & Reports
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              View school-wide analytics and performance reports.
            </Typography>
          </Paper>
        </motion.div>
      </Grid>
      <Grid item xs={12} md={6}>
        <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <People sx={{ fontSize: 40 }} />
              <Typography variant="h6" fontWeight={600}>
                Students & Teachers
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              Overview of students and teaching staff.
            </Typography>
          </Paper>
        </motion.div>
      </Grid>
    </Grid>
  </PageWrapper>
);

export default DirectorDashboard;
