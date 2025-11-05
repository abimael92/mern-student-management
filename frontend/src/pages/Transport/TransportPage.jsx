import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  Tabs,
  Tab,
  useTheme,
  alpha,
  Fab,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  DirectionsBus,
  Route,
  People,
  Schedule,
  Assignment,
  LocationOn,
  Speed,
  Add,
  FilterList,
  Download,
  Refresh,
  TrendingUp,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import TransportOverview from '../../components/transport/TransportOverview';
import TransportRouteList from '../../components/transport/TransportRouteList';
import TransportVehicleList from '../../components/transport/TransportVehicleList';
import DriverAssignment from '../../components/transport/DriverAssignment';
import TransportSchedule from '../../components/transport/TransportSchedule';
import {
  routes,
  vehicles,
  assignments,
  schedules,
} from '../../utils/mock/mockTransporData';

const TransportPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Enhanced mock data with proper structure for the new components
  const enhancedRoutes = routes.map((route, index) => ({
    ...route,
    id: route.id || index + 1,
    status: 'active',
    students: Math.floor(Math.random() * 30) + 10,
    duration: '45 min',
    distance: '15 km',
    progress: Math.floor(Math.random() * 100),
    departureTime: '07:30 AM',
    stops: route.stops || ['School', 'Stop 1', 'Stop 2', 'Stop 3'],
  }));

  const enhancedVehicles = vehicles.map((vehicle, index) => ({
    ...vehicle,
    id: vehicle.id || index + 1,
    status: vehicle.status || (vehicle.id === 1 ? 'active' : 'maintenance'),
    fuel: Math.floor(Math.random() * 100),
    lastService: '2024-01-10',
    nextService: '2024-02-10',
    capacity: vehicle.capacity || 40,
  }));

  const enhancedAssignments = assignments.map((assignment, index) => ({
    ...assignment,
    id: index + 1,
    driverName:
      assignment.driverName || `Driver ${String.fromCharCode(65 + index)}`,
    vehicle: assignment.vehicle || `BUS-${String(index + 1).padStart(3, '0')}`,
    route: assignment.route || `Route ${String.fromCharCode(65 + index)}`,
  }));

  const enhancedSchedules = schedules.map((schedule, index) => ({
    ...schedule,
    id: index + 1,
    route: schedule.route || `Route ${String.fromCharCode(65 + index)}`,
    time: schedule.time || '07:30 AM',
  }));

  const transportStats = {
    totalRoutes: enhancedRoutes.length,
    activeVehicles: enhancedVehicles.filter((v) => v.status === 'active')
      .length,
    totalStudents: enhancedRoutes.reduce(
      (sum, route) => sum + route.students,
      0
    ),
    onTimeRate: 94.5,
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <Box
      sx={{
        p: 3,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          sx={{
            p: 4,
            mb: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Transport Management
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Monitor routes, vehicles, and schedules in real-time
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Filters
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Export
              </Button>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          {
            label: 'Total Routes',
            value: transportStats.totalRoutes,
            icon: <Route sx={{ fontSize: 32 }} />,
            color: '#667eea',
            change: '+2',
          },
          {
            label: 'Active Vehicles',
            value: transportStats.activeVehicles,
            icon: <DirectionsBus sx={{ fontSize: 32 }} />,
            color: '#43e97b',
            change: '+1',
          },
          {
            label: 'Students Transported',
            value: transportStats.totalStudents,
            icon: <People sx={{ fontSize: 32 }} />,
            color: '#4facfe',
            change: '+15',
          },
          {
            label: 'On-time Rate',
            value: `${transportStats.onTimeRate}%`,
            icon: <Schedule sx={{ fontSize: 32 }} />,
            color: '#f093fb',
            change: '+2.1%',
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <motion.div
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
            >
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.8)} 100%)`,
                  color: 'white',
                  borderRadius: 3,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  cursor: 'pointer',
                }}
              >
                <CardContent>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    {stat.label}
                  </Typography>
                  <Chip
                    label={stat.change}
                    size="small"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Transport Overview - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          }}
        >
          <TransportOverview />
        </Paper>
      </motion.div>

      {/* Main Content - Tabs and Quick Actions */}
      <Grid container spacing={3}>
        {/* Left Column - Quick Actions */}
        <Grid item xs={12} lg={3}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Quick Actions */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                height: 'fit-content',
                position: 'sticky',
                top: 20,
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { icon: <Add />, label: 'Add New Route', color: '#667eea' },
                  {
                    icon: <DirectionsBus />,
                    label: 'Manage Vehicles',
                    color: '#4facfe',
                  },
                  {
                    icon: <Assignment />,
                    label: 'Assign Driver',
                    color: '#f093fb',
                  },
                  {
                    icon: <Schedule />,
                    label: 'Update Schedule',
                    color: '#43e97b',
                  },
                  {
                    icon: <People />,
                    label: 'Student Management',
                    color: '#ff6b6b',
                  },
                  {
                    icon: <LocationOn />,
                    label: 'Track Live Location',
                    color: '#ffd93d',
                  },
                ].map((action, index) => (
                  <motion.div
                    key={action.label}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      startIcon={action.icon}
                      sx={{
                        justifyContent: 'flex-start',
                        p: 2,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${action.color} 0%, ${alpha(action.color, 0.8)} 100%)`,
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 20px ${alpha(action.color, 0.3)}`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {action.label}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Right Column - Detailed Views */}
        <Grid item xs={12} lg={9}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    minHeight: 60,
                    color: 'text.primary',
                    '&.Mui-selected': {
                      color: 'primary.main',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    height: 3,
                    borderRadius: 2,
                  },
                }}
              >
                <Tab icon={<Route />} iconPosition="start" label="Routes" />
                <Tab
                  icon={<DirectionsBus />}
                  iconPosition="start"
                  label="Vehicles"
                />
                <Tab
                  icon={<Assignment />}
                  iconPosition="start"
                  label="Drivers"
                />
                <Tab
                  icon={<Schedule />}
                  iconPosition="start"
                  label="Schedule"
                />
              </Tabs>

              <Box sx={{ mt: 3 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 0 && (
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3,
                          }}
                        >
                          <Typography variant="h6" fontWeight="bold">
                            Route Management
                          </Typography>
                          <Button
                            variant="contained"
                            startIcon={<Add />}
                            sx={{
                              background:
                                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              '&:hover': {
                                background:
                                  'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                              },
                            }}
                          >
                            Add Route
                          </Button>
                        </Box>
                        <TransportRouteList routes={enhancedRoutes} />
                      </Box>
                    )}
                    {activeTab === 1 && (
                      <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          Vehicle Fleet
                        </Typography>
                        <TransportVehicleList vehicles={enhancedVehicles} />
                      </Box>
                    )}
                    {activeTab === 2 && (
                      <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          Driver Assignments
                        </Typography>
                        <DriverAssignment assignments={enhancedAssignments} />
                      </Box>
                    )}
                    {activeTab === 3 && (
                      <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          Transport Schedule
                        </Typography>
                        <TransportSchedule schedules={enhancedSchedules} />
                      </Box>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Live Status Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Paper
          sx={{
            p: 3,
            mt: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Live Transport Status
          </Typography>
          <Grid container spacing={2}>
            {enhancedRoutes.map((route, index) => (
              <Grid item xs={12} sm={6} md={4} key={route.id}>
                <Card
                  sx={{
                    p: 2,
                    borderLeft: `4px solid ${
                      route.status === 'active'
                        ? '#43e97b'
                        : route.status === 'delayed'
                          ? '#ff6b6b'
                          : '#ffd93d'
                    }`,
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {route.name}
                      </Typography>
                      <Chip
                        label={route.status}
                        size="small"
                        color={
                          route.status === 'active'
                            ? 'success'
                            : route.status === 'delayed'
                              ? 'error'
                              : 'warning'
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <People sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {route.students} students
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <Schedule
                        sx={{ fontSize: 16, color: 'text.secondary' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {route.duration} • {route.distance}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={route.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        background: 'rgba(0, 0, 0, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          background:
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: 3,
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1, display: 'block' }}
                    >
                      {route.progress}% completed
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </motion.div>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default TransportPage;
