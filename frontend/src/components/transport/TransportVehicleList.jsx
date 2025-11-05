import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
  TableContainer,
  Paper,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  DirectionsBus,
  LocalGasStation,
  Build,
  CheckCircle,
  Warning,
  Edit,
  Delete,
  PlayArrow,
  Pause,
  Person,
  Groups, // This replaces People
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const TransportVehicleList = ({ vehicles }) => {
  const theme = useTheme();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [actionDialog, setActionDialog] = useState(null);
  const [activeVehicles, setActiveVehicles] = useState([1, 2]);

  const handleToggleActive = (vehicleId) => {
    setActiveVehicles((prev) =>
      prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const handleMaintenance = (vehicle) => {
    setActionDialog({
      type: 'maintenance',
      vehicle,
      title: 'Schedule Maintenance',
      message: `Schedule maintenance for ${vehicle.number}?`,
    });
  };

  const handleAssignDriver = (vehicle) => {
    setActionDialog({
      type: 'assign',
      vehicle,
      title: 'Assign Driver',
      message: `Assign a driver to ${vehicle.number}?`,
    });
  };

  const closeDialog = () => {
    setActionDialog(null);
  };

  const getStatusColor = (vehicle) => {
    if (!activeVehicles.includes(vehicle.id)) return '#9e9e9e';
    if (vehicle.status === 'maintenance') return '#ff6b6b';
    if (vehicle.fuel < 20) return '#ffd93d';
    return '#43e97b';
  };

  const getStatusIcon = (vehicle) => {
    if (!activeVehicles.includes(vehicle.id))
      return <Pause sx={{ fontSize: 16 }} />;
    if (vehicle.status === 'maintenance')
      return <Build sx={{ fontSize: 16 }} />;
    if (vehicle.fuel < 20) return <Warning sx={{ fontSize: 16 }} />;
    return <CheckCircle sx={{ fontSize: 16 }} />;
  };

  const getStatusText = (vehicle) => {
    if (!activeVehicles.includes(vehicle.id)) return 'Inactive';
    if (vehicle.status === 'maintenance') return 'Maintenance';
    if (vehicle.fuel < 20) return 'Low Fuel';
    return 'Active';
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.01,
      backgroundColor: alpha(theme.palette.primary.main, 0.02),
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Vehicle Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            label: 'Total Vehicles',
            value: vehicles.length,
            icon: <DirectionsBus />,
            color: '#667eea',
          },
          {
            label: 'Active Now',
            value: activeVehicles.length,
            icon: <PlayArrow />,
            color: '#43e97b',
          },
          {
            label: 'In Maintenance',
            value: vehicles.filter((v) => v.status === 'maintenance').length,
            icon: <Build />,
            color: '#ff6b6b',
          },
          {
            label: 'Low Fuel',
            value: vehicles.filter((v) => v.fuel < 20).length,
            icon: <LocalGasStation />,
            color: '#ffd93d',
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

      {/* Enhanced Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              <TableCell
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}
              >
                Vehicle
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}
              >
                Fuel Level
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}
              >
                Capacity
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}
              >
                Maintenance
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {vehicles.map((vehicle, index) => {
                const statusColor = getStatusColor(vehicle);
                const statusText = getStatusText(vehicle);
                const isActive = activeVehicles.includes(vehicle.id);

                return (
                  <motion.tr
                    key={vehicle.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={tableRowVariants}
                  >
                    {/* Vehicle Info */}
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            background: `linear-gradient(135deg, ${statusColor} 0%, ${alpha(statusColor, 0.7)} 100%)`,
                            color: 'white',
                            width: 40,
                            height: 40,
                          }}
                        >
                          <DirectionsBus />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {vehicle.number}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {vehicle.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: statusColor,
                            flexShrink: 0,
                          }}
                        />
                        <Chip
                          label={statusText}
                          size="small"
                          icon={getStatusIcon(vehicle)}
                          sx={{
                            background: alpha(statusColor, 0.1),
                            color: statusColor,
                            fontWeight: 'bold',
                            border: `1px solid ${alpha(statusColor, 0.3)}`,
                          }}
                        />
                        <Tooltip title={isActive ? 'Deactivate' : 'Activate'}>
                          <Switch
                            size="small"
                            checked={isActive}
                            onChange={() => handleToggleActive(vehicle.id)}
                            color="success"
                          />
                        </Tooltip>
                      </Box>
                    </TableCell>

                    {/* Fuel Level */}
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <Tooltip title={`${vehicle.fuel}% Fuel`}>
                          <Box sx={{ width: 80 }}>
                            <LinearProgress
                              variant="determinate"
                              value={vehicle.fuel}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                background: alpha(
                                  vehicle.fuel < 20
                                    ? '#ffd93d'
                                    : vehicle.fuel < 50
                                      ? '#4facfe'
                                      : '#43e97b',
                                  0.2
                                ),
                                '& .MuiLinearProgress-bar': {
                                  background: `linear-gradient(135deg, ${
                                    vehicle.fuel < 20
                                      ? '#ffd93d'
                                      : vehicle.fuel < 50
                                        ? '#4facfe'
                                        : '#43e97b'
                                  } 0%, ${alpha(
                                    vehicle.fuel < 20
                                      ? '#ffd93d'
                                      : vehicle.fuel < 50
                                        ? '#4facfe'
                                        : '#43e97b',
                                    0.7
                                  )} 100%)`,
                                  borderRadius: 4,
                                },
                              }}
                            />
                          </Box>
                        </Tooltip>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color={
                            vehicle.fuel < 20
                              ? '#ff6b6b'
                              : vehicle.fuel < 50
                                ? '#ffd93d'
                                : '#43e97b'
                          }
                        >
                          {vehicle.fuel}%
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Capacity */}
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Groups
                          sx={{ fontSize: 16, color: 'text.secondary' }}
                        />
                        <Typography variant="body2" fontWeight="bold">
                          {vehicle.capacity} seats
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {Math.floor(Math.random() * vehicle.capacity)} occupied
                      </Typography>
                    </TableCell>

                    {/* Maintenance */}
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {vehicle.lastService}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Last service
                        </Typography>
                        {vehicle.nextService && (
                          <>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color="primary"
                              sx={{ mt: 0.5 }}
                            >
                              {vehicle.nextService}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Next service
                            </Typography>
                          </>
                        )}
                      </Box>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Tooltip title="Assign Driver">
                          <IconButton
                            size="small"
                            onClick={() => handleAssignDriver(vehicle)}
                            sx={{
                              background: alpha('#4facfe', 0.1),
                              color: '#4facfe',
                              '&:hover': { background: alpha('#4facfe', 0.2) },
                            }}
                          >
                            <Person />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Schedule Maintenance">
                          <IconButton
                            size="small"
                            onClick={() => handleMaintenance(vehicle)}
                            sx={{
                              background: alpha('#ffd93d', 0.1),
                              color: '#ffd93d',
                              '&:hover': { background: alpha('#ffd93d', 0.2) },
                            }}
                          >
                            <Build />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Vehicle">
                          <IconButton
                            size="small"
                            sx={{
                              background: alpha('#667eea', 0.1),
                              color: '#667eea',
                              '&:hover': { background: alpha('#667eea', 0.2) },
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Dialog */}
      <Dialog
        open={!!actionDialog}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
      >
        {actionDialog && (
          <>
            <DialogTitle
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            >
              {actionDialog.title}
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <Typography variant="body1" gutterBottom>
                {actionDialog.message}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mt: 2,
                  p: 2,
                  background: alpha('#667eea', 0.1),
                  borderRadius: 2,
                }}
              >
                <Avatar sx={{ background: '#667eea' }}>
                  <DirectionsBus />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {actionDialog.vehicle.number}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Vehicle ID: {actionDialog.vehicle.id}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 1 }}>
              <Button onClick={closeDialog} variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={closeDialog}
                variant="contained"
                sx={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  },
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default TransportVehicleList;
