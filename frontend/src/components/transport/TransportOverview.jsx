import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  LocationOn,
  People,
  DirectionsBus,
  Refresh,
  Notifications,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

const TransportOverview = () => {
  const theme = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeMetric, setActiveMetric] = useState('efficiency');

  // Mock data
  const performanceData = [
    { day: 'Mon', efficiency: 92, onTime: 88, utilization: 76 },
    { day: 'Tue', efficiency: 95, onTime: 91, utilization: 82 },
    { day: 'Wed', efficiency: 89, onTime: 85, utilization: 79 },
    { day: 'Thu', efficiency: 94, onTime: 90, utilization: 85 },
    { day: 'Fri', efficiency: 96, onTime: 93, utilization: 88 },
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Vehicle #B-102 needs maintenance',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'info',
      message: 'Route #R-004 running 15 mins late',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'success',
      message: 'All morning routes completed',
      time: '30 mins ago',
    },
  ];

  const liveUpdates = [
    { id: 1, route: 'Route A', status: 'on_time', progress: 85, students: 24 },
    { id: 2, route: 'Route B', status: 'delayed', progress: 45, students: 18 },
    { id: 3, route: 'Route C', status: 'on_time', progress: 92, students: 32 },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on_time':
        return '#43e97b';
      case 'delayed':
        return '#ff6b6b';
      default:
        return '#ffd93d';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -4, scale: 1.02 },
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Transport Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time monitoring and performance analytics
          </Typography>
        </Box>
        <Tooltip title="Refresh Data">
          <IconButton
            onClick={handleRefresh}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
              transform: isRefreshing ? 'rotate(360deg)' : 'rotate(0deg)',
              transition: 'transform 0.6s ease',
            }}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Performance Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Performance Trends
              </Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={alpha('#000', 0.1)}
                    />
                    <XAxis dataKey="day" />
                    <YAxis domain={[50, 100]} />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey={activeMetric}
                      stroke="#667eea"
                      strokeWidth={3}
                      dot={{ fill: '#667eea', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Live Updates */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <LocationOn color="primary" />
                Live Routes
              </Typography>
              {liveUpdates.map((update) => (
                <Box
                  key={update.id}
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    background: alpha(getStatusColor(update.status), 0.1),
                    borderLeft: `4px solid ${getStatusColor(update.status)}`,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      {update.route}
                    </Typography>
                    <Chip
                      label={`${update.progress}%`}
                      size="small"
                      color={update.status === 'on_time' ? 'success' : 'error'}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {update.students} students
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={update.progress}
                    sx={{
                      mt: 1,
                      height: 6,
                      borderRadius: 3,
                      background: alpha(getStatusColor(update.status), 0.3),
                      '& .MuiLinearProgress-bar': {
                        background: getStatusColor(update.status),
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              ))}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        {/* Left Column - Performance Metrics */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {[
              {
                label: 'Active Routes',
                value: '12',
                icon: <LocationOn />,
                color: '#667eea',
              },
              {
                label: 'Vehicles Running',
                value: '8',
                icon: <DirectionsBus />,
                color: '#43e97b',
              },
              {
                label: 'Students Today',
                value: '284',
                icon: <People />,
                color: '#4facfe',
              },
              {
                label: 'On-time Rate',
                value: '94%',
                icon: <CheckCircle />,
                color: '#f093fb',
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} key={stat.label}>
                <Card
                  sx={{
                    p: 2,
                    background: alpha(stat.color, 0.1),
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ p: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{ background: stat.color, width: 40, height: 40 }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color={stat.color}
                        >
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Column - Recent Alerts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Notifications color="warning" />
              Recent Alerts
            </Typography>
            <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
              {alerts.map((alert) => (
                <Box
                  key={alert.id}
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: 1,
                    background: alpha(
                      alert.type === 'warning'
                        ? '#ff6b6b'
                        : alert.type === 'success'
                          ? '#43e97b'
                          : '#4facfe',
                      0.1
                    ),
                    borderLeft: `3px solid ${
                      alert.type === 'warning'
                        ? '#ff6b6b'
                        : alert.type === 'success'
                          ? '#43e97b'
                          : '#4facfe'
                    }`,
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    {alert.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {alert.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransportOverview;
