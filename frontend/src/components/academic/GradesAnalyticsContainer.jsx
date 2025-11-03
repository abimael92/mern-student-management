import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Fab,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  School,
  Dashboard,
  TrendingUp,
  People,
  Class,
  MenuBook,
  Room,
  Schedule,
  Analytics,
  Add,
  FilterList,
  Download,
  Share,
  Notifications,
  RocketLaunch,
} from '@mui/icons-material';

import GpaSummaryCards from '../../components/academic/GpaSummaryCards';
import GPAManager from '../../components/academic/GPAManager';
import SubjectsPerformanceOverview from '../../components/academic/SubjectsPerformanceOverview';
import SubjectsStatusView from '../../components/academic/SubjectsStatusView';
import GradeHistory from '../../components/academic/GradeHistory';

import { gradeHistory } from '../../utils/mock/AcademicsPage';

const AcademicsPage = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);

  const handleChange = (e, newValue) => setTab(newValue);

  // Enhanced academic statistics
  const academicStats = {
    totalStudents: 1247,
    activeTeachers: 84,
    ongoingClasses: 56,
    availableRooms: 32,
    completionRate: 87,
    averageGPA: 3.6,
  };

  // Quick actions with corresponding tab indices
  const quickActions = [
    {
      icon: <Add />,
      label: 'Quick GPA Analysis',
      color: '#667eea',
      tabIndex: 0,
    },
    {
      icon: <Analytics />,
      label: 'Generate Report',
      color: '#f093fb',
      tabIndex: 4,
    },
    {
      icon: <People />,
      label: 'Student Overview',
      color: '#4facfe',
      tabIndex: 3,
    },
    {
      icon: <TrendingUp />,
      label: 'View Charts',
      color: '#43e97b',
      tabIndex: 2,
    },
  ];

  // Recent activities feed
  const recentActivities = [
    {
      action: 'GPA analysis completed for Semester 1',
      time: '2 hours ago',
      type: 'analysis',
    },
    {
      action: '15 students identified for academic support',
      time: '4 hours ago',
      type: 'support',
    },
    {
      action: 'Performance report generated for Math department',
      time: '1 day ago',
      type: 'report',
    },
    {
      action: 'Grade trends updated for all courses',
      time: '2 days ago',
      type: 'update',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              p: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 4,
              color: 'white',
              boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                Academics Dashboard
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  maxWidth: '600px',
                }}
              >
                Academic performance insights for administrators. Includes GPA,
                performance charts, at-risk students, and export features.
              </Typography>
            </Box>
            <Box
              sx={{ display: 'flex', gap: 2, position: 'relative', zIndex: 1 }}
            >
              <Button
                variant="contained"
                startIcon={<Download />}
                sx={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Export Report
              </Button>
              <Button
                variant="contained"
                startIcon={<Share />}
                sx={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Share
              </Button>
            </Box>
          </Box>
        </motion.div>

        {/* Enhanced Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              {
                label: 'Total Students',
                value: academicStats.totalStudents,
                icon: <People sx={{ fontSize: 32 }} />,
                color: '#667eea',
                change: '+5.2%',
              },
              {
                label: 'Active Teachers',
                value: academicStats.activeTeachers,
                icon: <School sx={{ fontSize: 32 }} />,
                color: '#f093fb',
                change: '+2.1%',
              },
              {
                label: 'Ongoing Classes',
                value: academicStats.ongoingClasses,
                icon: <Class sx={{ fontSize: 32 }} />,
                color: '#4facfe',
                change: '+8.7%',
              },
              {
                label: 'Completion Rate',
                value: `${academicStats.completionRate}%`,
                icon: <TrendingUp sx={{ fontSize: 32 }} />,
                color: '#43e97b',
                change: '+1.2%',
              },
              {
                label: 'Average GPA',
                value: academicStats.averageGPA,
                icon: <Analytics sx={{ fontSize: 32 }} />,
                color: '#ff9a9e',
                change: '+0.3',
              },
              {
                label: 'Available Rooms',
                value: academicStats.availableRooms,
                icon: <Room sx={{ fontSize: 32 }} />,
                color: '#a8edea',
                change: '+3.4%',
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={stat.label}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.8)} 100%)`,
                      color: 'white',
                      borderRadius: 3,
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                  >
                    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 2,
                        }}
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
                          fontSize: '0.75rem',
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Main Content Area */}
        <Grid container spacing={4}>
          {/* Left Column - Navigation & Quick Actions */}
          <Grid item xs={12} lg={3}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Quick Actions */}
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  color="primary"
                >
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.label}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        fullWidth
                        startIcon={action.icon}
                        onClick={() => setTab(action.tabIndex)}
                        sx={{
                          justifyContent: 'flex-start',
                          p: 2,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${action.color} 0%, ${alpha(action.color, 0.8)} 100%)`,
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          fontSize: '1rem',
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

              {/* Recent Activities */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  color="primary"
                >
                  Recent Activities
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background: 'rgba(0, 0, 0, 0.02)',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                          '&:hover': {
                            background: 'rgba(0, 0, 0, 0.04)',
                            transform: 'translateX(4px)',
                          },
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          sx={{ lineHeight: 1.4 }}
                        >
                          {activity.action}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 1,
                          }}
                        >
                          <Chip
                            label={activity.type}
                            size="small"
                            color={
                              activity.type === 'analysis'
                                ? 'primary'
                                : activity.type === 'support'
                                  ? 'success'
                                  : activity.type === 'report'
                                    ? 'warning'
                                    : 'info'
                            }
                            sx={{ fontWeight: 'bold' }}
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight="medium"
                          >
                            {activity.time}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Right Column - Main Content */}
          <Grid item xs={12} lg={9}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Enhanced Tabs Navigation */}
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Tabs
                    value={tab}
                    onChange={handleChange}
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
                    <Tab label="GPA Summary" />
                    <Tab label="Grades Table" />
                    <Tab label="Performance Charts" />
                    <Tab label="At-Risk Students" />
                    <Tab label="Export Data" />
                    <Tab label="Overview" />
                  </Tabs>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      sx={{
                        background:
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        '&:hover': {
                          background:
                            'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                        },
                      }}
                    >
                      <FilterList />
                    </IconButton>
                    <IconButton
                      sx={{
                        background:
                          'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white',
                        '&:hover': {
                          background:
                            'linear-gradient(135deg, #e184f0 0%, #e34c5c 100%)',
                        },
                      }}
                    >
                      <Notifications />
                    </IconButton>
                  </Box>
                </Box>

                {/* Tab Content with Enhanced Styling */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ mt: 2 }}>
                      <TabPanel value={tab} index={0}>
                        <Section
                          title="GPA Summary Cards"
                          desc="High-level indicators of GPA and student progress."
                        >
                          <GpaSummaryCards />
                        </Section>
                      </TabPanel>

                      <TabPanel value={tab} index={1}>
                        <Section
                          title="Grades Table"
                          desc="Filter, edit, and manage grade records."
                        >
                          <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <GPAManager />
                          </Paper>
                        </Section>
                      </TabPanel>

                      <TabPanel value={tab} index={2}>
                        <Section
                          title="Performance Charts"
                          desc="Trends and subject performance comparisons."
                        >
                          <SubjectsPerformanceOverview />
                        </Section>
                      </TabPanel>

                      <TabPanel value={tab} index={3}>
                        <Section
                          title="At-Risk Students"
                          desc="Students with low GPA for intervention planning."
                        >
                          <Paper sx={{ p: 3, borderRadius: 2, minHeight: 200 }}>
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              textAlign="center"
                            >
                              At-Risk Students Analysis
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              textAlign="center"
                              sx={{ mt: 2 }}
                            >
                              Student intervention planning interface coming
                              soon...
                            </Typography>
                          </Paper>
                        </Section>
                      </TabPanel>

                      <TabPanel value={tab} index={4}>
                        <Section
                          title="Export Data"
                          desc="Download filtered data to PDF or Excel."
                        >
                          <Box
                            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
                          >
                            <Button variant="contained" size="large">
                              Export as PDF
                            </Button>
                            <Button variant="outlined" size="large">
                              Export as Excel
                            </Button>
                            <Button variant="outlined" size="large">
                              Generate Report
                            </Button>
                          </Box>
                        </Section>
                      </TabPanel>

                      <TabPanel value={tab} index={5}>
                        <Section title="Academics Overview">
                          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                            <SubjectsStatusView />
                          </Paper>
                          <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6">Grades History</Typography>
                            <GradeHistory history={gradeHistory} />
                          </Paper>
                        </Section>
                      </TabPanel>
                    </Box>
                  </motion.div>
                </AnimatePresence>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

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
          <RocketLaunch />
        </Fab>
      </Container>
    </Box>
  );
};

/* === Small reusable wrapper for sections === */
const Section = ({ title, desc, children }) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
      {title}
    </Typography>
    {desc && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {desc}
      </Typography>
    )}
    {children}
  </Box>
);

/* === TabPanel Component === */
const TabPanel = ({ children, value, index }) => {
  return (
    <Box role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </Box>
  );
};

export default AcademicsPage;
