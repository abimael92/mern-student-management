import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Star, TrendingUp } from '@mui/icons-material';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

const TeacherPerformance = () => {
  const performanceData = [
    { subject: 'Teaching', A: 85, fullMark: 100 },
    { subject: 'Grading', A: 78, fullMark: 100 },
    { subject: 'Communication', A: 92, fullMark: 100 },
    { subject: 'Planning', A: 88, fullMark: 100 },
    { subject: 'Innovation', A: 75, fullMark: 100 },
  ];

  const averageScore =
    performanceData.reduce((acc, curr) => acc + curr.A, 0) /
    performanceData.length;

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
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          color: 'white',
          boxShadow: '0 10px 30px rgba(250, 112, 154, 0.3)',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Star />
              Teacher Performance
            </Typography>
            <TrendingUp sx={{ fontSize: 32, opacity: 0.8 }} />
          </Box>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              {averageScore.toFixed(1)}%
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Overall Performance Score
            </Typography>
          </Box>

          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="rgba(255, 255, 255, 0.3)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: 'white', fontSize: 10 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="A"
                stroke="rgba(255, 255, 255, 0.8)"
                fill="rgba(255, 255, 255, 0.4)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>

          <Box sx={{ mt: 2 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Performance Level
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {averageScore.toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={averageScore}
              sx={{
                height: 8,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeacherPerformance;
