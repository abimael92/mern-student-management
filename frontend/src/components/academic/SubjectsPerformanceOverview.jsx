import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  School,
  Analytics,
  FilterList,
  Download,
  Refresh,
  Star,
  EmojiEvents,
  Warning,
} from '@mui/icons-material';
import SubjectTrendChart from './SubjectTrendChart';
import PassFailChart from './PassFailChart';
import { mockSubjects } from '../../utils/mock/mockSubjectsData';

const SubjectsPerformanceOverview = () => {
  const theme = useTheme();
  const subjects = mockSubjects;
  const grades = useSelector((state) => state.grades.allGrades || []);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [viewMode, setViewMode] = useState('charts');

  const subjectStats = useMemo(() => {
    return subjects.map((subj) => {
      const subjectGrades = grades.filter((g) => g.subjectId === subj._id);
      const avgGrade = subjectGrades.length
        ? Math.round(
            subjectGrades.reduce((a, b) => a + b.score, 0) /
              subjectGrades.length
          )
        : 0;
      const passed = subjectGrades.filter((g) => g.score >= 50).length;
      const failed = subjectGrades.length - passed;
      const passRate = subjectGrades.length
        ? (passed / subjectGrades.length) * 100
        : 0;

      return {
        ...subj,
        avgGrade,
        passed,
        failed,
        total: subjectGrades.length,
        passRate,
        gradeTrend: subj.gradeTrend,
        status:
          passRate >= 80
            ? 'excellent'
            : passRate >= 60
              ? 'good'
              : 'needs_attention',
      };
    });
  }, [grades, subjects]);

  // Filter subjects based on semester
  const filteredSubjects = useMemo(() => {
    if (selectedSemester === 'all') return subjectStats;
    return subjectStats.filter((subj) => subj.semester === selectedSemester);
  }, [subjectStats, selectedSemester]);

  // Get top performing and struggling subjects
  const topSubjects = useMemo(() => {
    return [...filteredSubjects]
      .sort((a, b) => b.passRate - a.passRate)
      .slice(0, 3);
  }, [filteredSubjects]);

  const strugglingSubjects = useMemo(() => {
    return [...filteredSubjects]
      .sort((a, b) => a.passRate - b.passRate)
      .slice(0, 3);
  }, [filteredSubjects]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return '#43e97b';
      case 'good':
        return '#4facfe';
      case 'needs_attention':
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
        return <TrendingUp />;
      case 'needs_attention':
        return <Warning />;
      default:
        return <School />;
    }
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
      {/* Enhanced Header with Controls */}
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
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Subjects Performance Overview
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Comprehensive analysis of subject performance and student
                achievement
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel sx={{ color: 'white' }}>Semester</InputLabel>
                <Select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  label="Semester"
                  sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                  }}
                >
                  <MenuItem value="all">All Semesters</MenuItem>
                  <MenuItem value="fall-2024">Fall 2024</MenuItem>
                  <MenuItem value="spring-2024">Spring 2024</MenuItem>
                  <MenuItem value="winter-2024">Winter 2024</MenuItem>
                </Select>
              </FormControl>

              <Stack direction="row" spacing={1}>
                <Tooltip title="Chart View">
                  <IconButton
                    onClick={() => setViewMode('charts')}
                    sx={{
                      background:
                        viewMode === 'charts'
                          ? 'rgba(255, 255, 255, 0.2)'
                          : 'transparent',
                      color: 'white',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.1)' },
                    }}
                  >
                    <Analytics />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download Report">
                  <IconButton
                    sx={{
                      color: 'white',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.1)' },
                    }}
                  >
                    <Download />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Refresh Data">
                  <IconButton
                    sx={{
                      color: 'white',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.1)' },
                    }}
                  >
                    <Refresh />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Quick Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
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
                      {filteredSubjects.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Subjects
                    </Typography>
                  </Box>
                  <School sx={{ fontSize: 40, opacity: 0.8 }} />
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
                        filteredSubjects.reduce(
                          (acc, subj) => acc + subj.passRate,
                          0
                        ) / filteredSubjects.length
                      )}
                      %
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Avg Pass Rate
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
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
                      {topSubjects.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Top Performers
                    </Typography>
                  </Box>
                  <Star sx={{ fontSize: 40, opacity: 0.8 }} />
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
                      {strugglingSubjects.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Need Attention
                    </Typography>
                  </Box>
                  <Warning sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <AnimatePresence mode="wait">
        {viewMode === 'charts' ? (
          <motion.div
            key="charts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background:
                        'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Subject Performance Trends
                    </Typography>
                    <SubjectTrendChart subjects={filteredSubjects} />
                  </Paper>
                </motion.div>
              </Grid>

              <Grid item xs={12} lg={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background:
                        'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Pass/Fail Distribution
                    </Typography>
                    <PassFailChart subjects={filteredSubjects} />
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        ) : (
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Subject Summary View */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Subject Performance Summary
              </Typography>
              <Grid container spacing={2}>
                {filteredSubjects.map((subject, index) => (
                  <Grid item xs={12} sm={6} md={4} key={subject._id}>
                    <motion.div
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      variants={cardVariants}
                    >
                      <Card
                        sx={{
                          p: 2,
                          borderLeft: `4px solid ${getStatusColor(subject.status)}`,
                          '&:hover': {
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                          },
                          transition: 'all 0.3s ease',
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
                              {subject.name}
                            </Typography>
                            <Chip
                              icon={getStatusIcon(subject.status)}
                              label={subject.status.replace('_', ' ')}
                              size="small"
                              sx={{
                                background: getStatusColor(subject.status),
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Avg Grade:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {subject.avgGrade}%
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Pass Rate:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {subject.passRate.toFixed(1)}%
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Students:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {subject.total}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SubjectsPerformanceOverview;
