import React, { useState } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  School,
  EmojiEvents,
  Star,
  CalendarToday,
  FilterList,
  Download,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';

const GradeHistory = ({ history }) => {
  const theme = useTheme();
  const [expandedSemester, setExpandedSemester] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [filterGrade, setFilterGrade] = useState('all');

  // Enhanced mock data with more details
  const enhancedHistory = history.map((item, index) => ({
    ...item,
    id: index,
    date: new Date(2024, 11 - index, 15), // Dynamic dates
    teacher: `Prof. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Davis'][index % 5]}`,
    credits: 3,
    status:
      item.grade >= 90
        ? 'excellent'
        : item.grade >= 80
          ? 'good'
          : item.grade >= 70
            ? 'average'
            : 'needs_improvement',
    trend: index % 3 === 0 ? 'up' : index % 3 === 1 ? 'down' : 'stable',
    assignments: Math.floor(Math.random() * 8) + 3,
    attendance: Math.floor(Math.random() * 20) + 80,
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return '#43e97b';
      case 'good':
        return '#4facfe';
      case 'average':
        return '#ffd166';
      case 'needs_improvement':
        return '#ff6b6b';
      default:
        return '#667eea';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <EmojiEvents />;
      case 'good':
        return <Star />;
      case 'average':
        return <School />;
      case 'needs_improvement':
        return <TrendingDown />;
      default:
        return <School />;
    }
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return '#43e97b';
    if (grade >= 80) return '#4facfe';
    if (grade >= 70) return '#ffd166';
    return '#ff6b6b';
  };

  const handleSemesterClick = (semesterId) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
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
    <Box>
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
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
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Academic History & Grades
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Comprehensive overview of your academic performance across
                semesters
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Download Transcript">
                <IconButton sx={{ color: 'white' }}>
                  <Download />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filter Grades">
                <IconButton sx={{ color: 'white' }}>
                  <FilterList />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(67, 233, 123, 0.3)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {enhancedHistory.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Semesters
                    </Typography>
                  </Box>
                  <CalendarToday sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {Math.round(
                        enhancedHistory.reduce(
                          (acc, item) => acc + item.grade,
                          0
                        ) / enhancedHistory.length
                      )}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Average Grade
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(255, 154, 158, 0.3)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {
                        enhancedHistory.filter((item) => item.grade >= 90)
                          .length
                      }
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      A Grades
                    </Typography>
                  </Box>
                  <Star sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(168, 237, 234, 0.3)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {enhancedHistory.reduce(
                        (acc, item) => acc + item.credits,
                        0
                      )}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Credits
                    </Typography>
                  </Box>
                  <School sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Enhanced Grade History List */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
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
          <Typography variant="h6" fontWeight="bold">
            Semester Grade History
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip label="All Semesters" variant="outlined" />
            <Chip label="Sort by Date" variant="outlined" />
          </Box>
        </Box>

        <List sx={{ p: 0 }}>
          <AnimatePresence>
            {enhancedHistory.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    borderLeft: `4px solid ${getStatusColor(item.status)}`,
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSemesterClick(item.id)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            background: getStatusColor(item.status),
                            width: 48,
                            height: 48,
                          }}
                        >
                          {getStatusIcon(item.status)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {item.semester}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.date.toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric',
                            })}{' '}
                            • {item.teacher}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ color: getGradeColor(item.grade) }}
                          >
                            {item.grade}%
                          </Typography>
                          <Chip
                            label={item.status.replace('_', ' ')}
                            size="small"
                            sx={{
                              background: getStatusColor(item.status),
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          />
                        </Box>
                        <IconButton size="small">
                          {expandedSemester === item.id ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </IconButton>
                      </Box>
                    </Box>

                    <AnimatePresence>
                      {expandedSemester === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Divider sx={{ my: 2 }} />
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Typography
                                variant="subtitle2"
                                gutterBottom
                                fontWeight="bold"
                              >
                                Performance Details
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Credits Earned:
                                  </Typography>
                                  <Typography variant="body2" fontWeight="bold">
                                    {item.credits}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Assignments Completed:
                                  </Typography>
                                  <Typography variant="body2" fontWeight="bold">
                                    {item.assignments}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Attendance Rate:
                                  </Typography>
                                  <Typography variant="body2" fontWeight="bold">
                                    {item.attendance}%
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography
                                variant="subtitle2"
                                gutterBottom
                                fontWeight="bold"
                              >
                                Performance Trend
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  mb: 1,
                                }}
                              >
                                <TrendingUp
                                  sx={{
                                    color:
                                      item.trend === 'up'
                                        ? '#43e97b'
                                        : item.trend === 'down'
                                          ? '#ff6b6b'
                                          : '#ffd166',
                                    transform:
                                      item.trend === 'down'
                                        ? 'rotate(180deg)'
                                        : 'none',
                                  }}
                                />
                                <Typography variant="body2">
                                  {item.trend === 'up'
                                    ? 'Improving'
                                    : item.trend === 'down'
                                      ? 'Needs Attention'
                                      : 'Stable'}
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={item.grade}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  background: 'rgba(0, 0, 0, 0.1)',
                                  '& .MuiLinearProgress-bar': {
                                    background: getGradeColor(item.grade),
                                    borderRadius: 4,
                                  },
                                }}
                              />
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  mt: 1,
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  0%
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Target: 80%
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  100%
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </Paper>
    </Box>
  );
};

export default GradeHistory;
