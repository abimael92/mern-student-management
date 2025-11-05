// ===== ./frontend/src/components/fees/FeeAnalyticsChart.jsx =====
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Box, Typography, useTheme, Grid, Paper } from '@mui/material';

const FeeAnalyticsChart = ({ data }) => {
  const theme = useTheme();

  // Process data for charts
  const statusData = [
    {
      name: 'Paid',
      value: data.filter((f) => f.status === 'paid').length,
      color: '#43e97b',
    },
    {
      name: 'Pending',
      value: data.filter((f) => f.status === 'pending').length,
      color: '#4facfe',
    },
    {
      name: 'Overdue',
      value: data.filter((f) => f.status === 'overdue').length,
      color: '#ff6b6b',
    },
    {
      name: 'Partial',
      value: data.filter((f) => f.status === 'partial').length,
      color: '#ffd93d',
    },
  ];

  const monthlyData = [
    { month: 'Jan', collected: 4500, pending: 1200 },
    { month: 'Feb', collected: 5200, pending: 800 },
    { month: 'Mar', collected: 4800, pending: 1500 },
    { month: 'Apr', collected: 6100, pending: 900 },
    { month: 'May', collected: 5800, pending: 1100 },
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
              {entry.name}: ${entry.value}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Grid container spacing={3}>
      {/* Bar Chart */}
      <Grid item xs={12} md={8}>
        <Paper
          sx={{
            p: 2,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Monthly Fee Collection
          </Typography>
          <Box sx={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.palette.divider}
                />
                <XAxis
                  dataKey="month"
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                />
                <YAxis
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="collected"
                  name="Collected Amount"
                  fill={theme.palette.success.main}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="pending"
                  name="Pending Amount"
                  fill={theme.palette.warning.main}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Pie Chart */}
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Payment Status
          </Typography>
          <Box sx={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} payments`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FeeAnalyticsChart;
