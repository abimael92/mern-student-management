import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const StatsCard = ({ title, count, trendData, change, avatars = [] }) => (
  <Card sx={{ p: 2, textAlign: 'center', minWidth: 250 }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4" color="primary">
      {count}
    </Typography>
    <Typography color={change > 0 ? 'green' : 'red'}>
      {change > 0 ? `▲ ${change}%` : `▼ ${Math.abs(change)}%`}
    </Typography>
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={trendData}>
        <XAxis dataKey="month" hide />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#3f51b5" />
      </LineChart>
    </ResponsiveContainer>
    <Box display="flex" justifyContent="center">
      {avatars.map((src, i) => (
        <Avatar key={i} src={src} sx={{ width: 30, height: 30, mx: 0.5 }} />
      ))}
    </Box>
  </Card>
);

export default StatsCard;
