// ===== ./frontend/src/components/attendance/AttendanceTrendChart.jsx =====
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
  Bar,
} from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';

const AttendanceTrendChart = ({ records }) => {
  const theme = useTheme();

  // Generate sample trend data - replace with your actual data
  const trendData = [
    { date: 'Jan 1', present: 45, absent: 5, late: 3, rate: 85 },
    { date: 'Jan 2', present: 48, absent: 2, late: 2, rate: 92 },
    { date: 'Jan 3', present: 46, absent: 4, late: 2, rate: 88 },
    { date: 'Jan 4', present: 49, absent: 1, late: 1, rate: 96 },
    { date: 'Jan 5', present: 47, absent: 3, late: 2, rate: 90 },
    { date: 'Jan 8', present: 44, absent: 6, late: 2, rate: 85 },
    { date: 'Jan 9', present: 48, absent: 2, late: 1, rate: 94 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 1,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === 'rate' ? '%' : ''}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <ComposedChart
          data={trendData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            fontSize={12}
          />
          <YAxis stroke={theme.palette.text.secondary} fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="rate"
            fill={theme.palette.primary.main + '20'}
            stroke={theme.palette.primary.main}
            name="Attendance Rate %"
            strokeWidth={2}
          />
          <Bar
            dataKey="present"
            fill={theme.palette.success.main}
            name="Present"
            opacity={0.8}
          />
          <Bar
            dataKey="absent"
            fill={theme.palette.error.main}
            name="Absent"
            opacity={0.8}
          />
          <Line
            type="monotone"
            dataKey="late"
            stroke={theme.palette.warning.main}
            name="Late"
            strokeWidth={2}
            dot={{ fill: theme.palette.warning.main, strokeWidth: 2, r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AttendanceTrendChart;
