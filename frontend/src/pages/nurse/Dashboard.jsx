import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import LocalHospital from '@mui/icons-material/LocalHospital';
import PageWrapper from '../../components/common/PageWrapper';

const NurseDashboard = () => (
  <PageWrapper title="Nurse Dashboard">
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <LocalHospital sx={{ fontSize: 40 }} />
              <Typography variant="h6" fontWeight={600}>
                Health Records
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              View and manage student health records and immunizations.
            </Typography>
          </Paper>
        </motion.div>
      </Grid>
    </Grid>
  </PageWrapper>
);

export default NurseDashboard;

