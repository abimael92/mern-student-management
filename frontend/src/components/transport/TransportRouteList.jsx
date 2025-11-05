import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  IconButton,
  Typography,
  Avatar,
  LinearProgress,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Button,
  useTheme,
  alpha,
  Collapse,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  Schedule,
  People,
  DirectionsBus,
  ExpandMore,
  ExpandLess,
  PlayArrow,
  Pause,
  Edit,
  Delete,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const TransportRouteList = ({ routes }) => {
  const theme = useTheme();
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [activeRoutes, setActiveRoutes] = useState([1, 3]);

  const handleToggleExpand = (routeId) => {
    setExpandedRoute(expandedRoute === routeId ? null : routeId);
  };

  const handleToggleActive = (routeId) => {
    setActiveRoutes((prev) =>
      prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId]
    );
  };

  const getRouteStatus = (route) => {
    if (!activeRoutes.includes(route.id)) return 'inactive';
    if (route.progress > 90) return 'completed';
    if (route.progress < 30) return 'starting';
    return 'active';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#43e97b';
      case 'completed':
        return '#4facfe';
      case 'starting':
        return '#ffd93d';
      case 'inactive':
        return '#9e9e9e';
      default:
        return '#667eea';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <PlayArrow sx={{ fontSize: 16 }} />;
      case 'completed':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'starting':
        return <Warning sx={{ fontSize: 16 }} />;
      case 'inactive':
        return <Pause sx={{ fontSize: 16 }} />;
      default:
        return <DirectionsBus sx={{ fontSize: 16 }} />;
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
    hover: {
      y: -2,
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Route Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              textAlign: 'center',
              background: alpha('#667eea', 0.1),
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="#667eea">
              {routes.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Routes
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              textAlign: 'center',
              background: alpha('#43e97b', 0.1),
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="#43e97b">
              {routes.filter((r) => activeRoutes.includes(r.id)).length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Active Routes
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              textAlign: 'center',
              background: alpha('#4facfe', 0.1),
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="#4facfe">
              {routes.reduce((sum, route) => sum + (route.students || 0), 0)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Students
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              textAlign: 'center',
              background: alpha('#f093fb', 0.1),
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="#f093fb">
              {Math.round(
                routes.reduce((sum, route) => sum + (route.progress || 0), 0) /
                  routes.length
              )}
              %
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Avg Progress
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Routes List */}
      <AnimatePresence>
        {routes.map((route, index) => {
          const status = getRouteStatus(route);
          const statusColor = getStatusColor(status);
          const isExpanded = expandedRoute === route.id;
          const isActive = activeRoutes.includes(route.id);

          return (
            <motion.div
              key={route.id}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={listItemVariants}
              layout
            >
              <Card
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  borderLeft: `4px solid ${statusColor}`,
                  overflow: 'visible',
                  '&:hover': {
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                  {/* Route Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          background: `linear-gradient(135deg, ${statusColor} 0%, ${alpha(statusColor, 0.7)} 100%)`,
                          color: 'white',
                        }}
                      >
                        <DirectionsBus />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {route.name}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          <Chip
                            label={status}
                            size="small"
                            icon={getStatusIcon(status)}
                            sx={{
                              background: alpha(statusColor, 0.1),
                              color: statusColor,
                              fontWeight: 'bold',
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {route.distance} • {route.duration}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Tooltip
                        title={isActive ? 'Pause Route' : 'Activate Route'}
                      >
                        <IconButton
                          onClick={() => handleToggleActive(route.id)}
                          sx={{
                            background: alpha(
                              isActive ? '#43e97b' : '#9e9e9e',
                              0.1
                            ),
                            color: isActive ? '#43e97b' : '#9e9e9e',
                            '&:hover': {
                              background: alpha(
                                isActive ? '#43e97b' : '#9e9e9e',
                                0.2
                              ),
                            },
                          }}
                        >
                          {isActive ? <Pause /> : <PlayArrow />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Route">
                        <IconButton
                          sx={{
                            background: alpha('#667eea', 0.1),
                            color: '#667eea',
                            '&:hover': { background: alpha('#667eea', 0.2) },
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <IconButton
                        onClick={() => handleToggleExpand(route.id)}
                        sx={{
                          transform: isExpanded
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <ExpandMore />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Route Progress */}
                  {isActive && (
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Route Progress
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color={statusColor}
                        >
                          {route.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={route.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          background: alpha(statusColor, 0.2),
                          '& .MuiLinearProgress-bar': {
                            background: `linear-gradient(135deg, ${statusColor} 0%, ${alpha(statusColor, 0.7)} 100%)`,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  )}

                  {/* Quick Info */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <People sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {route.students} students
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn
                        sx={{ fontSize: 16, color: 'text.secondary' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {route.stops.length} stops
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule
                        sx={{ fontSize: 16, color: 'text.secondary' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {route.departureTime}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Expanded Details */}
                  <Collapse in={isExpanded}>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Route Stops
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {route.stops.map((stop, index) => (
                          <Chip
                            key={index}
                            label={`${index + 1}. ${stop}`}
                            size="small"
                            variant={index === 0 ? 'filled' : 'outlined'}
                            color={index === 0 ? 'primary' : 'default'}
                          />
                        ))}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Edit />}
                          sx={{ borderRadius: 2 }}
                        >
                          Edit Route
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<People />}
                          sx={{ borderRadius: 2 }}
                        >
                          Manage Students
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<Delete />}
                          sx={{ borderRadius: 2, ml: 'auto' }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Box>
  );
};

export default TransportRouteList;
