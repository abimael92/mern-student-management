// In AnalyticsPage.jsx, replace the entire import section with:

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  alpha,
  Button,
  Chip,
  Divider,
  Slider,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  LinearProgress,
  Tooltip,
  Badge,
  Avatar,
  Stack,
  Paper,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  FilterList,
  Download,
  Refresh,
  Timeline,
  BarChart,
  PieChart,
  ShowChart,
  People,
  School,
  Assignment,
  DateRange,
  Insights,
  Psychology,
  Analytics as AnalyticsIcon,
  RocketLaunch,
  Whatshot,
  Bolt,
  AutoGraph,
  TrendingFlat,
  CalendarToday,
  ArrowUpward,
  ArrowDownward,
  CheckCircle,
  Warning,
  Error,
  Info,
  ZoomIn,
  ZoomOut,
  ViewWeek,
  ViewDay,
  DarkMode,
  LightMode,
  GridView,
  TableRows,
  CalendarMonth, // Correct icon name for monthly view
} from '@mui/icons-material';

// Charts
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';

const AnalyticsPage = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('monthly');
  const [viewMode, setViewMode] = useState('charts');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [animatedValue, setAnimatedValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [chartType, setChartType] = useState('line');
  const [liveData, setLiveData] = useState(false);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);

  // Generate dynamic dummy data
  const generatePerformanceData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    return months.map((month, index) => ({
      name: month,
      attendance: 85 + Math.random() * 15,
      grades: 75 + Math.random() * 20,
      engagement: 70 + Math.random() * 25,
      satisfaction: 80 + Math.random() * 18,
      efficiency: 88 + Math.random() * 12,
    }));
  };

  const generateGradeDistribution = () => {
    const grades = [
      'Grade 1',
      'Grade 2',
      'Grade 3',
      'Grade 4',
      'Grade 5',
      'Grade 6',
    ];
    return grades.map((grade) => ({
      name: grade,
      value: 100 + Math.floor(Math.random() * 100),
      fill: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));
  };

  const generateTeacherPerformance = () => {
    const subjects = [
      'Math',
      'Science',
      'English',
      'History',
      'Arts',
      'PE',
      'Music',
      'Tech',
    ];
    return subjects.map((subject) => ({
      subject,
      score: 70 + Math.random() * 30,
      students: 20 + Math.floor(Math.random() * 30),
      improvement: Math.random() * 20 - 5,
    }));
  };

  const generateWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day) => ({
      day,
      present: 85 + Math.random() * 15,
      late: Math.random() * 10,
      absent: Math.random() * 8,
      excused: Math.random() * 5,
    }));
  };

  const generateLiveMetrics = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      time: `${i}:00`,
      active: 500 + Math.random() * 500,
      sessions: 100 + Math.random() * 200,
      errors: Math.random() * 10,
    }));
  };

  // State for dynamic data
  const [performanceData, setPerformanceData] = useState(
    generatePerformanceData()
  );
  const [gradeData, setGradeData] = useState(generateGradeDistribution());
  const [teacherData, setTeacherData] = useState(generateTeacherPerformance());
  const [weeklyData, setWeeklyData] = useState(generateWeeklyData());
  const [liveMetrics, setLiveMetrics] = useState(generateLiveMetrics());

  // KPI Cards with animated values
  const kpiData = [
    {
      id: 1,
      title: 'Overall Performance',
      value: '92.5%',
      change: '+2.5%',
      trend: 'up',
      icon: <RocketLaunch />,
      color: '#667eea',
      description: 'School-wide performance score',
      target: 95,
      current: 92.5,
    },
    {
      id: 2,
      title: 'Student Engagement',
      value: '88.3%',
      change: '+3.1%',
      trend: 'up',
      icon: <Whatshot />,
      color: '#f093fb',
      description: 'Active participation rate',
      target: 90,
      current: 88.3,
    },
    {
      id: 3,
      title: 'Attendance Rate',
      value: '96.7%',
      change: '+1.2%',
      trend: 'up',
      icon: <CheckCircle />,
      color: '#4facfe',
      description: 'Daily attendance average',
      target: 97,
      current: 96.7,
    },
    {
      id: 4,
      title: 'Teacher Satisfaction',
      value: '94.2%',
      change: '+0.8%',
      trend: 'up',
      icon: <Psychology />,
      color: '#43e97b',
      description: 'Staff satisfaction index',
      target: 95,
      current: 94.2,
    },
  ];

  const [metrics, setMetrics] = useState(kpiData);

  // Animation effects
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue((prev) => (prev + 1) % 100);

      if (liveData) {
        // Update data in real-time
        setPerformanceData(generatePerformanceData());
        setWeeklyData(generateWeeklyData());

        // Update metrics with slight variations
        setMetrics((prev) =>
          prev.map((metric) => ({
            ...metric,
            current: Math.min(
              100,
              metric.current + (Math.random() * 0.5 - 0.25)
            ),
            value: `${(metric.current + (Math.random() * 0.5 - 0.25)).toFixed(1)}%`,
          }))
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [liveData]);

  // Simulate loading
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setPerformanceData(generatePerformanceData());
      setGradeData(generateGradeDistribution());
      setTeacherData(generateTeacherPerformance());
      setWeeklyData(generateWeeklyData());
      setLoading(false);
    }, 1500);
  };

  // Handle data point selection
  const handleChartClick = (data) => {
    setSelectedDataPoint(data);
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={8}
          sx={{
            p: 2,
            borderRadius: 2,
            background: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            minWidth: 200,
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 0.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: entry.color,
                  }}
                />
                <Typography variant="body2">{entry.dataKey}:</Typography>
              </Box>
              <Typography variant="body2" fontWeight="bold">
                {entry.value.toFixed(1)}%
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
            mb: 4,
            p: 3,
            borderRadius: 4,
            background: darkMode
              ? alpha(theme.palette.background.paper, 0.1)
              : alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <AnalyticsIcon
                sx={{
                  fontSize: 40,
                  color: darkMode ? '#60a5fa' : '#667eea',
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: darkMode
                    ? 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Interactive Analytics
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: darkMode ? '#94a3b8' : '#666',
                maxWidth: 600,
              }}
            >
              Real-time insights, dynamic visualizations, and interactive data
              exploration
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: 'center',
            }}
          >
            {/* Live Mode Toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Bolt sx={{ color: liveData ? '#fbbf24' : '#9ca3af' }} />
              <Typography variant="body2">Live Data</Typography>
              <Switch
                checked={liveData}
                onChange={() => setLiveData(!liveData)}
                color="primary"
                sx={{
                  '& .MuiSwitch-track': {
                    background: liveData
                      ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                      : undefined,
                  },
                }}
              />
            </Box>

            {/* Dark Mode Toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {darkMode ? <DarkMode /> : <LightMode />}
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="primary"
              />
            </Box>

            {/* Refresh Button */}
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={loading}
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Controls Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {/* KPI Cards */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {metrics.map((metric, index) => (
                <Grid item xs={12} sm={6} md={3} key={metric.id}>
                  <motion.div variants={itemVariants} whileHover="hover">
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                        position: 'relative',
                        overflow: 'hidden',
                        background: darkMode
                          ? alpha(theme.palette.background.paper, 0.2)
                          : alpha(theme.palette.background.paper, 0.9),
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${alpha(metric.color, 0.2)}`,
                        boxShadow: `0 8px 32px ${alpha(metric.color, 0.1)}`,
                      }}
                    >
                      {/* Animated background */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: `linear-gradient(90deg, ${metric.color} 0%, ${alpha(metric.color, 0.3)} 100%)`,
                          animation: 'shimmer 2s infinite',
                          '@keyframes shimmer': {
                            '0%': { transform: 'translateX(-100%)' },
                            '100%': { transform: 'translateX(100%)' },
                          },
                        }}
                      />

                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: darkMode ? '#cbd5e1' : '#666',
                                mb: 0.5,
                              }}
                            >
                              {metric.title}
                            </Typography>
                            <Typography
                              variant="h3"
                              sx={{
                                fontWeight: 'bold',
                                color: darkMode ? '#f1f5f9' : '#1e293b',
                              }}
                            >
                              {metric.value}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              background: alpha(metric.color, 0.1),
                              color: metric.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {metric.icon}
                          </Box>
                        </Box>

                        {/* Progress Bar */}
                        <Box sx={{ mb: 2 }}>
                          <LinearProgress
                            variant="determinate"
                            value={(metric.current / metric.target) * 100}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              background: alpha(metric.color, 0.1),
                              '& .MuiLinearProgress-bar': {
                                background: `linear-gradient(90deg, ${metric.color} 0%, ${alpha(metric.color, 0.7)} 100%)`,
                                borderRadius: 4,
                              },
                            }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mt: 0.5,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: darkMode ? '#94a3b8' : '#666' }}
                            >
                              Progress
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: darkMode ? '#94a3b8' : '#666' }}
                            >
                              {((metric.current / metric.target) * 100).toFixed(
                                1
                              )}
                              %
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Chip
                            icon={
                              metric.trend === 'up' ? (
                                <ArrowUpward />
                              ) : (
                                <ArrowDownward />
                              )
                            }
                            label={metric.change}
                            size="small"
                            sx={{
                              background: alpha(
                                metric.trend === 'up' ? '#10b981' : '#ef4444',
                                0.1
                              ),
                              color:
                                metric.trend === 'up' ? '#10b981' : '#ef4444',
                              fontWeight: 600,
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: darkMode ? '#94a3b8' : '#666',
                              fontStyle: 'italic',
                            }}
                          >
                            {metric.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Chart Controls */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                background: darkMode
                  ? alpha(theme.palette.background.paper, 0.2)
                  : alpha(theme.palette.background.paper, 0.9),
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(e, newMode) => newMode && setViewMode(newMode)}
                    size="small"
                  >
                    <ToggleButton value="charts">
                      <GridView /> Charts
                    </ToggleButton>
                    <ToggleButton value="table">
                      <TableRows /> Table
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <ToggleButtonGroup
                    value={chartType}
                    exclusive
                    onChange={(e, newType) => newType && setChartType(newType)}
                    size="small"
                  >
                    <ToggleButton value="line">
                      <Timeline /> Line
                    </ToggleButton>
                    <ToggleButton value="bar">
                      <BarChart /> Bar
                    </ToggleButton>
                    <ToggleButton value="area">
                      <ShowChart /> Area
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel
                      sx={{ color: darkMode ? '#cbd5e1' : undefined }}
                    >
                      Time Range
                    </InputLabel>
                    <Select
                      value={timeRange}
                      label="Time Range"
                      onChange={(e) => setTimeRange(e.target.value)}
                      sx={{
                        color: darkMode ? '#f1f5f9' : undefined,
                      }}
                    >
                      <MenuItem value="daily">
                        <ViewDay sx={{ mr: 1 }} /> Daily
                      </MenuItem>
                      <MenuItem value="weekly">
                        <ViewWeek sx={{ mr: 1 }} /> Weekly
                      </MenuItem>
                      <MenuItem value="monthly">
                        <CalendarToday sx={{ mr: 1 }} /> Monthly
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      onClick={() =>
                        setZoomLevel(Math.max(0.5, zoomLevel - 0.1))
                      }
                      size="small"
                    >
                      <ZoomOut />
                    </IconButton>
                    <Typography variant="body2">
                      {Math.round(zoomLevel * 100)}%
                    </Typography>
                    <IconButton
                      onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
                      size="small"
                    >
                      <ZoomIn />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Main Performance Chart */}
          <Grid item xs={12} md={8}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: darkMode
                    ? alpha(theme.palette.background.paper, 0.2)
                    : alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(10px)',
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top left',
                }}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h6"
                      sx={{ color: darkMode ? '#f1f5f9' : undefined }}
                    >
                      Performance Trends Over Time
                    </Typography>
                  }
                  subheader={
                    <Typography
                      variant="body2"
                      sx={{ color: darkMode ? '#94a3b8' : undefined }}
                    >
                      Interactive chart showing multiple metrics
                    </Typography>
                  }
                  action={
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  }
                />
                <Divider />
                <CardContent sx={{ height: 400, position: 'relative' }}>
                  {loading ? (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === 'line' ? (
                        <LineChart
                          data={performanceData}
                          onClick={handleChartClick}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={darkMode ? '#334155' : '#e2e8f0'}
                          />
                          <XAxis
                            dataKey="name"
                            stroke={darkMode ? '#94a3b8' : '#64748b'}
                          />
                          <YAxis
                            stroke={darkMode ? '#94a3b8' : '#64748b'}
                            domain={[0, 100]}
                          />
                          <RechartsTooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="attendance"
                            stroke="#667eea"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 8, onClick: handleChartClick }}
                            animationDuration={1000}
                          />
                          <Line
                            type="monotone"
                            dataKey="grades"
                            stroke="#43e97b"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            animationDuration={1000}
                          />
                          <Line
                            type="monotone"
                            dataKey="engagement"
                            stroke="#f093fb"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            animationDuration={1000}
                          />
                          <Line
                            type="monotone"
                            dataKey="satisfaction"
                            stroke="#ffd166"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            animationDuration={1000}
                          />
                        </LineChart>
                      ) : chartType === 'bar' ? (
                        <RechartsBarChart data={performanceData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={darkMode ? '#334155' : '#e2e8f0'}
                          />
                          <XAxis
                            dataKey="name"
                            stroke={darkMode ? '#94a3b8' : '#64748b'}
                          />
                          <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
                          <RechartsTooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar
                            dataKey="attendance"
                            fill="#667eea"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1000}
                          />
                          <Bar
                            dataKey="grades"
                            fill="#43e97b"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1000}
                          />
                        </RechartsBarChart>
                      ) : (
                        <AreaChart data={performanceData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={darkMode ? '#334155' : '#e2e8f0'}
                          />
                          <XAxis
                            dataKey="name"
                            stroke={darkMode ? '#94a3b8' : '#64748b'}
                          />
                          <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
                          <RechartsTooltip content={<CustomTooltip />} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="attendance"
                            stroke="#667eea"
                            fill="#667eea"
                            fillOpacity={0.3}
                            animationDuration={1000}
                          />
                          <Area
                            type="monotone"
                            dataKey="grades"
                            stroke="#43e97b"
                            fill="#43e97b"
                            fillOpacity={0.3}
                            animationDuration={1000}
                          />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Student Distribution & Live Metrics */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  borderRadius: 3,
                  height: '100%',
                  background: darkMode
                    ? alpha(theme.palette.background.paper, 0.2)
                    : alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(10px)',
                }}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h6"
                      sx={{ color: darkMode ? '#f1f5f9' : undefined }}
                    >
                      Student Distribution
                    </Typography>
                  }
                  subheader={
                    <Typography
                      variant="body2"
                      sx={{ color: darkMode ? '#94a3b8' : undefined }}
                    >
                      By grade level
                    </Typography>
                  }
                />
                <Divider />
                <CardContent sx={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={gradeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        animationDuration={1000}
                      >
                        {gradeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>

                {/* Live Metrics */}
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Bolt sx={{ color: liveData ? '#fbbf24' : '#9ca3af' }} />
                      <Typography
                        variant="h6"
                        sx={{ color: darkMode ? '#f1f5f9' : undefined }}
                      >
                        Live Metrics
                      </Typography>
                    </Box>
                  }
                />
                <Divider />
                <CardContent sx={{ height: 200, overflow: 'auto' }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    {liveMetrics.slice(0, 8).map((metric, index) => (
                      <Paper
                        key={index}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          background: darkMode
                            ? alpha('#1e293b', 0.5)
                            : alpha('#f8fafc', 0.8),
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          animation: liveData ? 'pulse 2s infinite' : undefined,
                          '@keyframes pulse': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.7 },
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: darkMode ? '#cbd5e1' : undefined }}
                        >
                          {metric.time}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Chip
                            label={`${metric.active.toFixed(0)} active`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                          <Chip
                            label={`${metric.sessions.toFixed(0)} sessions`}
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Teacher Performance */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: darkMode
                    ? alpha(theme.palette.background.paper, 0.2)
                    : alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(10px)',
                }}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h6"
                      sx={{ color: darkMode ? '#f1f5f9' : undefined }}
                    >
                      Teacher Performance
                    </Typography>
                  }
                  subheader={
                    <Typography
                      variant="body2"
                      sx={{ color: darkMode ? '#94a3b8' : undefined }}
                    >
                      By subject with improvement scores
                    </Typography>
                  }
                />
                <Divider />
                <CardContent sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={teacherData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? '#334155' : '#e2e8f0'}
                      />
                      <XAxis
                        dataKey="subject"
                        stroke={darkMode ? '#94a3b8' : '#64748b'}
                      />
                      <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar
                        dataKey="score"
                        name="Score (%)"
                        fill="#8884d8"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                      />
                      <Bar
                        dataKey="improvement"
                        name="Improvement (%)"
                        fill="#43e97b"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Weekly Attendance Heatmap */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: darkMode
                    ? alpha(theme.palette.background.paper, 0.2)
                    : alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(10px)',
                }}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h6"
                      sx={{ color: darkMode ? '#f1f5f9' : undefined }}
                    >
                      Weekly Attendance
                    </Typography>
                  }
                  subheader={
                    <Typography
                      variant="body2"
                      sx={{ color: darkMode ? '#94a3b8' : undefined }}
                    >
                      Daily breakdown with categories
                    </Typography>
                  }
                />
                <Divider />
                <CardContent sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? '#334155' : '#e2e8f0'}
                      />
                      <XAxis
                        dataKey="day"
                        stroke={darkMode ? '#94a3b8' : '#64748b'}
                      />
                      <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="present"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                        animationDuration={1000}
                      />
                      <Area
                        type="monotone"
                        dataKey="late"
                        stackId="1"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        fillOpacity={0.6}
                        animationDuration={1000}
                      />
                      <Area
                        type="monotone"
                        dataKey="absent"
                        stackId="1"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.6}
                        animationDuration={1000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Selected Data Point Display */}
          {selectedDataPoint && (
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: darkMode
                      ? alpha(theme.palette.background.paper, 0.3)
                      : alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${alpha('#667eea', 0.3)}`,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    📊 Selected Data Point
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(selectedDataPoint).map(([key, value]) => (
                      <Grid item xs={6} sm={4} md={3} key={key}>
                        <Paper
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            textAlign: 'center',
                            background: alpha('#667eea', 0.1),
                          }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                          >
                            {key}
                          </Typography>
                          <Typography variant="h6" fontWeight="bold">
                            {typeof value === 'number'
                              ? value.toFixed(1)
                              : value}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default AnalyticsPage;
