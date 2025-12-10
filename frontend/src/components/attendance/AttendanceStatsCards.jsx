import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  People,
  EventAvailable,
  Schedule,
} from '@mui/icons-material';

const AttendanceStatsCards = ({ stats }) => {
  // Add defensive check - handle undefined/null stats
  if (!stats) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Skeleton variant="rounded" height={140} sx={{ borderRadius: 3 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  // Safely calculate progress values with defaults
  const safeStats = {
    total: stats.total || 0,
    present: stats.present || 0,
    absent: stats.absent || 0,
    attendanceRate: stats.attendanceRate || 0,
  };

  const cards = [
    {
      title: 'Total Students',
      value: safeStats.total,
      icon: <People sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      progress: 100,
    },
    {
      title: 'Present Today',
      value: safeStats.present,
      icon: <EventAvailable sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      progress:
        safeStats.total > 0 ? (safeStats.present / safeStats.total) * 100 : 0,
    },
    {
      title: 'Absent Today',
      value: safeStats.absent,
      icon: <Schedule sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      progress:
        safeStats.total > 0 ? (safeStats.absent / safeStats.total) * 100 : 0,
    },
    {
      title: 'Attendance Rate',
      value: `${safeStats.attendanceRate.toFixed(1)}%`,
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      progress: parseFloat(safeStats.attendanceRate) || 0,
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
                  value={card.progress || 0} // Add fallback value
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
