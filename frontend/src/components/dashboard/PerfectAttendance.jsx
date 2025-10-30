import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { EmojiEvents, TrendingUp } from '@mui/icons-material';

const PerfectAttendance = () => {
  const perfectAttendancePercentage = 92;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          height: '100%',
          p: 3,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          boxShadow: '0 10px 30px rgba(79, 172, 254, 0.3)',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <EmojiEvents />
              Perfect Attendance
            </Typography>
            <TrendingUp sx={{ fontSize: 32, opacity: 0.8 }} />
          </Box>

          <Typography
            variant="h3"
            sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
          >
            {perfectAttendancePercentage}%
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 3, textAlign: 'center', opacity: 0.9 }}
          >
            of students maintained perfect attendance
          </Typography>

          <LinearProgress
            variant="determinate"
            value={perfectAttendancePercentage}
            sx={{
              height: 12,
              borderRadius: 6,
              background: 'rgba(255, 255, 255, 0.2)',
              '& .MuiLinearProgress-bar': {
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 6,
              },
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              0%
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Target: 95%
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              100%
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerfectAttendance;
