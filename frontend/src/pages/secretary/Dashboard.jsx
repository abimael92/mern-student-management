import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import People from '@mui/icons-material/People';
import PageWrapper from '../../components/common/PageWrapper';

const SecretaryDashboard = () => (
  <PageWrapper title="Secretary Dashboard">
    <Grid container spacing={3}>
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
                Enrollment
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              Manage new student enrollment and document verification.
            </Typography>
          </Paper>
        </motion.div>
      </Grid>
    </Grid>
  </PageWrapper>
);

export default SecretaryDashboard;

