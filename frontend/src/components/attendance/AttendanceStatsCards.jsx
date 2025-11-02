// ===== ./frontend/src/components/attendance/AttendanceStatsCards.jsx =====
import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  People,
  EventAvailable,
  Schedule,
} from '@mui/icons-material';

const AttendanceStatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Students',
      value: stats.total,
      icon: <People sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      progress: 100,
    },
    {
      title: 'Present Today',
      value: stats.present,
      icon: <EventAvailable sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      progress: (stats.present / stats.total) * 100,
    },
    {
      title: 'Absent Today',
      value: stats.absent,
      icon: <Schedule sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      progress: (stats.absent / stats.total) * 100,
    },
    {
      title: 'Attendance Rate',
      value: `${stats.attendanceRate}%`,
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      progress: parseFloat(stats.attendanceRate),
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={card.title}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                background: card.color,
                color: 'white',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {card.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {card.title}
                    </Typography>
                  </Box>
                  <Box sx={{ opacity: 0.8 }}>{card.icon}</Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={card.progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: 3,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default AttendanceStatsCards;
