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
  Tooltip,
  Card,
  CardContent,
  Grid,
  Button,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider,
  Badge,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  DirectionsBus,
  Route,
  Schedule,
  Phone,
  Email,
  Edit,
  Delete,
  Add,
  CheckCircle,
  Warning,
  Star,
  LocationOn,
  MoreVert,
  SwapHoriz,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const DriverAssignment = ({ assignments }) => {
  const theme = useTheme();
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [assignDialog, setAssignDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    driverName: '',
    vehicle: '',
    route: '',
    schedule: '',
  });

  // Enhanced assignments with more data
  const enhancedAssignments = assignments.map((assignment, index) => ({
    ...assignment,
    id: index + 1,
    driverImage: `/api/placeholder/40/40?text=${assignment.driverName.charAt(0)}`,
    phone: '+1 (555) 123-4567',
    email: `${assignment.driverName.toLowerCase().replace(' ', '.')}@school.com`,
    rating: (Math.random() * 2 + 3).toFixed(1), // 3-5 stars
    experience: `${Math.floor(Math.random() * 10) + 1} years`,
    status: Math.random() > 0.2 ? 'active' : 'on_break',
    currentLocation: 'In Transit',
    nextStop: `Stop ${Math.floor(Math.random() * 5) + 1}`,
    progress: Math.floor(Math.random() * 100),
  }));

  const availableDrivers = [
    { name: 'John Smith', id: 1 },
    { name: 'Maria Garcia', id: 2 },
    { name: 'David Johnson', id: 3 },
  ];

  const availableVehicles = [
    { number: 'BUS-001', id: 1 },
    { number: 'BUS-002', id: 2 },
    { number: 'VAN-001', id: 3 },
  ];

  const availableRoutes = [
    { name: 'Route A - Morning', id: 1 },
    { name: 'Route B - Afternoon', id: 2 },
    { name: 'Route C - Special', id: 3 },
  ];

  const handleAssignDriver = () => {
    setAssignDialog(true);
  };

  const handleEditAssignment = (assignment) => {
    setSelectedDriver(assignment);
    setNewAssignment({
      driverName: assignment.driverName,
      vehicle: assignment.vehicle,
      route: assignment.route,
      schedule: 'Morning Shift',
    });
    setEditDialog(true);
  };

  const handleSaveAssignment = () => {
    // Here you would typically save to backend
    setAssignDialog(false);
    setEditDialog(false);
    setNewAssignment({ driverName: '', vehicle: '', route: '', schedule: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#43e97b';
      case 'on_break':
        return '#ffd93d';
      case 'off_duty':
        return '#9e9e9e';
      default:
        return '#667eea';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'on_break':
        return <Schedule sx={{ fontSize: 16 }} />;
      default:
        return <Person sx={{ fontSize: 16 }} />;
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
      {/* Header with Stats */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Driver Assignments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage driver assignments and schedules
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAssignDriver}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          Assign Driver
        </Button>
      </Box>

      {/* Assignment Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            label: 'Total Assignments',
            value: enhancedAssignments.length,
            icon: <Person />,
            color: '#667eea',
          },
          {
            label: 'Active Drivers',
            value: enhancedAssignments.filter((a) => a.status === 'active')
              .length,
            icon: <CheckCircle />,
            color: '#43e97b',
          },
          {
            label: 'On Break',
            value: enhancedAssignments.filter((a) => a.status === 'on_break')
              .length,
            icon: <Schedule />,
            color: '#ffd93d',
          },
          {
            label: 'Avg Rating',
            value: (
              enhancedAssignments.reduce(
                (sum, a) => sum + parseFloat(a.rating),
                0
              ) / enhancedAssignments.length
            ).toFixed(1),
            icon: <Star />,
            color: '#f093fb',
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  p: 2,
                  textAlign: 'center',
                  background: alpha(stat.color, 0.1),
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ p: 1 }}>
                  <Avatar
                    sx={{
                      background: stat.color,
                      color: 'white',
                      width: 40,
                      height: 40,
                      mx: 'auto',
                      mb: 1,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" color={stat.color}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Assignments List */}
      <AnimatePresence>
        {enhancedAssignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
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
                borderLeft: `4px solid ${getStatusColor(assignment.status)}`,
                overflow: 'visible',
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Grid container spacing={2} alignItems="center">
                  {/* Driver Info */}
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Badge
                        color={
                          assignment.status === 'active' ? 'success' : 'warning'
                        }
                        variant="dot"
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            background: `linear-gradient(135deg, ${getStatusColor(assignment.status)} 0%, ${alpha(getStatusColor(assignment.status), 0.7)} 100%)`,
                          }}
                        >
                          {assignment.driverName.charAt(0)}
                        </Avatar>
                      </Badge>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {assignment.driverName}
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
                            label={assignment.status.replace('_', ' ')}
                            size="small"
                            icon={getStatusIcon(assignment.status)}
                            sx={{
                              background: alpha(
                                getStatusColor(assignment.status),
                                0.1
                              ),
                              color: getStatusColor(assignment.status),
                              fontWeight: 'bold',
                            }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <Star sx={{ fontSize: 16, color: '#ffd93d' }} />
                            <Typography variant="caption" fontWeight="bold">
                              {assignment.rating}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Assignment Details */}
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <DirectionsBus
                          sx={{ fontSize: 16, color: 'text.secondary' }}
                        />
                        <Typography variant="body2" fontWeight="bold">
                          {assignment.vehicle}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Route sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {assignment.route}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Schedule
                          sx={{ fontSize: 16, color: 'text.secondary' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {assignment.experience} experience
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Live Status */}
                  <Grid item xs={12} md={2}>
                    {assignment.status === 'active' && (
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {assignment.currentLocation}
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight="bold"
                          color="primary"
                        >
                          Next: {assignment.nextStop}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={assignment.progress}
                          sx={{
                            mt: 1,
                            height: 6,
                            borderRadius: 3,
                            background: alpha('#667eea', 0.2),
                            '& .MuiLinearProgress-bar': {
                              background:
                                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    )}
                  </Grid>

                  {/* Actions */}
                  <Grid item xs={12} md={2}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                      }}
                    >
                      <Tooltip title="Contact Driver">
                        <IconButton
                          size="small"
                          sx={{
                            background: alpha('#4facfe', 0.1),
                            color: '#4facfe',
                            '&:hover': { background: alpha('#4facfe', 0.2) },
                          }}
                        >
                          <Phone />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Assignment">
                        <IconButton
                          size="small"
                          onClick={() => handleEditAssignment(assignment)}
                          sx={{
                            background: alpha('#667eea', 0.1),
                            color: '#667eea',
                            '&:hover': { background: alpha('#667eea', 0.2) },
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reassign Driver">
                        <IconButton
                          size="small"
                          sx={{
                            background: alpha('#f093fb', 0.1),
                            color: '#f093fb',
                            '&:hover': { background: alpha('#f093fb', 0.2) },
                          }}
                        >
                          <SwapHoriz />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>

                {/* Contact Info */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    mt: 2,
                    pt: 2,
                    borderTop: `1px solid ${alpha('#000', 0.1)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {assignment.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {assignment.email}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Assign Driver Dialog */}
      <Dialog
        open={assignDialog}
        onClose={() => setAssignDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          Assign New Driver
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Select Driver"
                value={newAssignment.driverName}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    driverName: e.target.value,
                  })
                }
              >
                {availableDrivers.map((driver) => (
                  <MenuItem key={driver.id} value={driver.name}>
                    {driver.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Select Vehicle"
                value={newAssignment.vehicle}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    vehicle: e.target.value,
                  })
                }
              >
                {availableVehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.number}>
                    {vehicle.number}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Select Route"
                value={newAssignment.route}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, route: e.target.value })
                }
              >
                {availableRoutes.map((route) => (
                  <MenuItem key={route.id} value={route.name}>
                    {route.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Schedule"
                value={newAssignment.schedule}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    schedule: e.target.value,
                  })
                }
              >
                <MenuItem value="Morning Shift">
                  Morning Shift (6:00 AM - 2:00 PM)
                </MenuItem>
                <MenuItem value="Afternoon Shift">
                  Afternoon Shift (2:00 PM - 10:00 PM)
                </MenuItem>
                <MenuItem value="Full Day">
                  Full Day (6:00 AM - 10:00 PM)
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setAssignDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSaveAssignment}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            Assign Driver
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Assignment Dialog */}
      <Dialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          Edit Assignment
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {/* Similar form as assign dialog but pre-filled */}
          <Typography variant="body1" gutterBottom>
            Edit assignment for {selectedDriver?.driverName}
          </Typography>
          {/* Form fields would go here */}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setEditDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSaveAssignment}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DriverAssignment;
