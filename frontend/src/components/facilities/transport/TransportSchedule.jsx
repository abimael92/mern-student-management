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
  TextField,
  MenuItem,
  Badge,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Schedule,
  Route,
  DirectionsBus,
  Person,
  Notifications,
  Edit,
  Delete,
  Add,
  CheckCircle,
  Warning,
  PlayArrow,
  Pause,
  LocationOn,
  AccessTime,
  CalendarToday,
  FilterList,
  Download,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const TransportSchedule = ({ schedules }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [activeSchedules, setActiveSchedules] = useState([1, 2, 3, 4]);

  // Enhanced schedules with more data
  const enhancedSchedules = schedules.map((schedule, index) => ({
    ...schedule,
    id: index + 1,
    driver: `Driver ${String.fromCharCode(65 + index)}`,
    vehicle: `BUS-${String(index + 1).padStart(3, '0')}`,
    students: Math.floor(Math.random() * 30) + 10,
    status: Math.random() > 0.3 ? 'on_time' : 'delayed',
    delay:
      Math.random() > 0.7 ? `${Math.floor(Math.random() * 15) + 5} min` : null,
    progress: Math.floor(Math.random() * 100),
    type:
      index % 3 === 0 ? 'morning' : index % 3 === 1 ? 'afternoon' : 'evening',
    days: ['Mon', 'Wed', 'Fri'],
    nextStop: `Stop ${Math.floor(Math.random() * 5) + 1}`,
  }));

  const handleToggleActive = (scheduleId) => {
    setActiveSchedules((prev) =>
      prev.includes(scheduleId)
        ? prev.filter((id) => id !== scheduleId)
        : [...prev, scheduleId]
    );
  };

  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setScheduleDialog(true);
  };

  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    setScheduleDialog(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on_time':
        return '#43e97b';
      case 'delayed':
        return '#ff6b6b';
      case 'completed':
        return '#4facfe';
      case 'scheduled':
        return '#667eea';
      default:
        return '#9e9e9e';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on_time':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'delayed':
        return <Warning sx={{ fontSize: 16 }} />;
      case 'completed':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      default:
        return <Schedule sx={{ fontSize: 16 }} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'morning':
        return '#ffd93d';
      case 'afternoon':
        return '#4facfe';
      case 'evening':
        return '#764ba2';
      default:
        return '#667eea';
    }
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

  const filteredSchedules = enhancedSchedules.filter((schedule) => {
    switch (activeTab) {
      case 1:
        return schedule.type === 'morning';
      case 2:
        return schedule.type === 'afternoon';
      case 3:
        return schedule.type === 'evening';
      default:
        return true;
    }
  });

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header with Stats */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Transport Schedule
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and monitor all transport schedules
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              borderColor: alpha('#667eea', 0.3),
              color: '#667eea',
              '&:hover': {
                borderColor: '#667eea',
                background: alpha('#667eea', 0.1),
              },
            }}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            sx={{
              borderColor: alpha('#667eea', 0.3),
              color: '#667eea',
              '&:hover': {
                borderColor: '#667eea',
                background: alpha('#667eea', 0.1),
              },
            }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddSchedule}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            Add Schedule
          </Button>
        </Box>
      </Box>

      {/* Schedule Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            label: 'Total Schedules',
            value: enhancedSchedules.length,
            icon: <Schedule />,
            color: '#667eea',
          },
          {
            label: 'Active Now',
            value: activeSchedules.length,
            icon: <PlayArrow />,
            color: '#43e97b',
          },
          {
            label: 'Delayed',
            value: enhancedSchedules.filter((s) => s.status === 'delayed')
              .length,
            icon: <Warning />,
            color: '#ff6b6b',
          },
          {
            label: 'On Time',
            value: enhancedSchedules.filter((s) => s.status === 'on_time')
              .length,
            icon: <CheckCircle />,
            color: '#4facfe',
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

      {/* Schedule Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              minHeight: 60,
              color: 'text.primary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
            '& .MuiTabs-indicator': {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              height: 3,
            },
          }}
        >
          <Tab icon={<Schedule />} iconPosition="start" label="All Schedules" />
          <Tab icon={<AccessTime />} iconPosition="start" label="Morning" />
          <Tab icon={<AccessTime />} iconPosition="start" label="Afternoon" />
          <Tab icon={<AccessTime />} iconPosition="start" label="Evening" />
        </Tabs>
      </Paper>

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
                Schedule Details
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}
              >
                Route & Vehicle
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.95rem' }}
              >
                Progress
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
              {filteredSchedules.map((schedule, index) => {
                const statusColor = getStatusColor(schedule.status);
                const typeColor = getTypeColor(schedule.type);
                const isActive = activeSchedules.includes(schedule.id);

                return (
                  <motion.tr
                    key={schedule.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={tableRowVariants}
                  >
                    {/* Schedule Details */}
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            background: `linear-gradient(135deg, ${typeColor} 0%, ${alpha(typeColor, 0.7)} 100%)`,
                            color: 'white',
                            width: 40,
                            height: 40,
                          }}
                        >
                          <Schedule />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {schedule.time}
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
                              label={schedule.type}
                              size="small"
                              sx={{
                                background: alpha(typeColor, 0.1),
                                color: typeColor,
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {schedule.days.join(', ')}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Route & Vehicle */}
                    <TableCell>
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Route
                            sx={{ fontSize: 16, color: 'text.secondary' }}
                          />
                          <Typography variant="body2" fontWeight="bold">
                            {schedule.route}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <DirectionsBus
                            sx={{ fontSize: 16, color: 'text.secondary' }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {schedule.vehicle}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Person
                            sx={{ fontSize: 16, color: 'text.secondary' }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {schedule.driver} • {schedule.students} students
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
                          label={schedule.status.replace('_', ' ')}
                          size="small"
                          icon={getStatusIcon(schedule.status)}
                          sx={{
                            background: alpha(statusColor, 0.1),
                            color: statusColor,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                          }}
                        />
                        {schedule.delay && (
                          <Chip
                            label={schedule.delay}
                            size="small"
                            color="error"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </TableCell>

                    {/* Progress */}
                    <TableCell>
                      {isActive ? (
                        <Box sx={{ width: 120 }}>
                          <LinearProgress
                            variant="determinate"
                            value={schedule.progress}
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
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 0.5, display: 'block' }}
                          >
                            {schedule.progress}% • {schedule.nextStop}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          Not active
                        </Typography>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Tooltip
                          title={
                            isActive ? 'Pause Schedule' : 'Activate Schedule'
                          }
                        >
                          <Switch
                            size="small"
                            checked={isActive}
                            onChange={() => handleToggleActive(schedule.id)}
                            color="success"
                          />
                        </Tooltip>
                        <Tooltip title="Edit Schedule">
                          <IconButton
                            size="small"
                            onClick={() => handleEditSchedule(schedule)}
                            sx={{
                              background: alpha('#667eea', 0.1),
                              color: '#667eea',
                              '&:hover': { background: alpha('#667eea', 0.2) },
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Send Notification">
                          <IconButton
                            size="small"
                            sx={{
                              background: alpha('#f093fb', 0.1),
                              color: '#f093fb',
                              '&:hover': { background: alpha('#f093fb', 0.2) },
                            }}
                          >
                            <Notifications />
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

      {/* Empty State */}
      {filteredSchedules.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              p: 6,
              textAlign: 'center',
              background: alpha('#667eea', 0.05),
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Schedule
                sx={{ fontSize: 64, color: alpha('#667eea', 0.3), mb: 2 }}
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No schedules found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {activeTab === 0
                  ? 'No transport schedules have been created yet.'
                  : `No ${['all', 'morning', 'afternoon', 'evening'][activeTab]} schedules found.`}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddSchedule}
                sx={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  },
                }}
              >
                Create First Schedule
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Schedule Dialog */}
      <Dialog
        open={scheduleDialog}
        onClose={() => setScheduleDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          {selectedSchedule ? 'Edit Schedule' : 'Add New Schedule'}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Route"
                defaultValue={selectedSchedule?.route || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                defaultValue={selectedSchedule?.time || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Schedule Type"
                defaultValue={selectedSchedule?.type || 'morning'}
              >
                <MenuItem value="morning">Morning</MenuItem>
                <MenuItem value="afternoon">Afternoon</MenuItem>
                <MenuItem value="evening">Evening</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Days"
                defaultValue={selectedSchedule?.days || []}
                SelectProps={{ multiple: true }}
              >
                <MenuItem value="Mon">Monday</MenuItem>
                <MenuItem value="Tue">Tuesday</MenuItem>
                <MenuItem value="Wed">Wednesday</MenuItem>
                <MenuItem value="Thu">Thursday</MenuItem>
                <MenuItem value="Fri">Friday</MenuItem>
                <MenuItem value="Sat">Saturday</MenuItem>
                <MenuItem value="Sun">Sunday</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setScheduleDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => setScheduleDialog(false)}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            {selectedSchedule ? 'Save Changes' : 'Create Schedule'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransportSchedule;
