import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Tooltip as MuiTooltip,
  useTheme,
  alpha,
  Switch,
  FormControlLabel,
  Stack,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Analytics,
  FilterList,
  Download,
  Refresh,
  ShowChart,
  BarChart,
  Timeline,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const colors = [
  '#667eea',
  '#f093fb',
  '#4facfe',
  '#43e97b',
  '#ff9a9e',
  '#a8edea',
  '#fad0c4',
  '#ffd1ff',
  '#a1c4fd',
  '#c2e9fb',
  '#d4fc79',
  '#96e6a1',
];

const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

const SubjectTrendChart = () => {
  const theme = useTheme();
  const subjects = useSelector((state) => state.subjects?.subjects || []);
  const subjectNames = subjects.map((s) => s.name);
  const [selectedSubjects, setSelectedSubjects] = useState(
    subjectNames.slice(0, 4)
  );
  const [chartType, setChartType] = useState('line');
  const [showArea, setShowArea] = useState(false);
  const [animated, setAnimated] = useState(true);

  // Enhanced data with trends and performance indicators
  const chartData = terms.map((term, index) => {
    const entry = { term };

    selectedSubjects.forEach((subjectName, i) => {
      const realSubject = subjects.find((s) => s.name === subjectName);
      const baseGrade = realSubject?.baseGrade || 75;
      const trend = realSubject?.trend || 'up';
      const variation = realSubject?.variation || 5;

      // Generate realistic grade progression
      let grade;
      if (realSubject?.gradeTrend?.[index]?.grade) {
        grade = realSubject.gradeTrend[index].grade;
      } else {
        const trendMultiplier = trend === 'up' ? index : -index;
        const randomVariation = (Math.random() - 0.5) * variation * 2;
        grade = Math.min(
          100,
          Math.max(60, baseGrade + trendMultiplier * 2 + randomVariation)
        );
      }

      entry[subjectName] = Math.round(grade);
    });

    return entry;
  });

  // Calculate average performance for each subject
  const subjectPerformance = selectedSubjects.map((subjectName) => {
    const grades = chartData.map((item) => item[subjectName]);
    const average = grades.reduce((a, b) => a + b, 0) / grades.length;
    const trend = grades[grades.length - 1] > grades[0] ? 'up' : 'down';

    return {
      name: subjectName,
      average: Math.round(average),
      trend,
      improvement: Math.round(grades[grades.length - 1] - grades[0]),
      color: colors[selectedSubjects.indexOf(subjectName) % colors.length],
    };
  });

  const handleSubjectChange = (event) => {
    setSelectedSubjects(event.target.value);
  };

  const handleChartTypeChange = (newType) => {
    setChartType(newType);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{
            p: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Box
              key={entry.dataKey}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: entry.color,
                }}
              />
              <Typography variant="body2">
                <strong>{entry.dataKey}:</strong> {entry.value}%
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (chartType === 'area' || showArea) {
      return (
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis dataKey="term" tick={{ fill: theme.palette.text.primary }} />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: theme.palette.text.primary }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {selectedSubjects.map((subjectName, i) => (
            <Area
              key={subjectName}
              type="monotone"
              dataKey={subjectName}
              stroke={colors[i % colors.length]}
              fill={alpha(colors[i % colors.length], 0.3)}
              strokeWidth={2}
              isAnimationActive={animated}
            />
          ))}
        </ComposedChart>
      );
    } else {
      return (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis dataKey="term" tick={{ fill: theme.palette.text.primary }} />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: theme.palette.text.primary }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {selectedSubjects.map((subjectName, i) => (
            <Line
              key={subjectName}
              type="monotone"
              dataKey={subjectName}
              stroke={colors[i % colors.length]}
              strokeWidth={3}
              dot={{ fill: colors[i % colors.length], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              isAnimationActive={animated}
            />
          ))}
        </LineChart>
      );
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
                Subject Performance Trends
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Track academic progress and identify performance patterns across
                subjects
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <MuiTooltip title="Download Chart">
                <IconButton sx={{ color: 'white' }}>
                  <Download />
                </IconButton>
              </MuiTooltip>
              <MuiTooltip title="Refresh Data">
                <IconButton sx={{ color: 'white' }}>
                  <Refresh />
                </IconButton>
              </MuiTooltip>
            </Stack>
          </Box>
        </Paper>
      </motion.div>

      <Grid container spacing={3}>
        {/* Controls Panel */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={0}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                height: 'fit-content',
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Chart Controls
              </Typography>

              {/* Subject Selection */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="select-subjects-label">
                  Select Subjects
                </InputLabel>
                <Select
                  labelId="select-subjects-label"
                  multiple
                  value={selectedSubjects}
                  onChange={handleSubjectChange}
                  input={<OutlinedInput label="Select Subjects" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          size="small"
                          sx={{
                            background:
                              colors[
                                subjectNames.indexOf(value) % colors.length
                              ],
                            color: 'white',
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {subjectNames.map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      <Checkbox checked={selectedSubjects.includes(subject)} />
                      <ListItemText primary={subject} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Chart Type Selection */}
              <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                Chart Type
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                <IconButton
                  onClick={() => handleChartTypeChange('line')}
                  sx={{
                    background:
                      chartType === 'line' ? '#667eea' : 'transparent',
                    color: chartType === 'line' ? 'white' : 'text.primary',
                    '&:hover': {
                      background:
                        chartType === 'line'
                          ? '#5a6fd8'
                          : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <Timeline />
                </IconButton>
                <IconButton
                  onClick={() => handleChartTypeChange('area')}
                  sx={{
                    background:
                      chartType === 'area' ? '#667eea' : 'transparent',
                    color: chartType === 'area' ? 'white' : 'text.primary',
                    '&:hover': {
                      background:
                        chartType === 'area'
                          ? '#5a6fd8'
                          : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ShowChart />
                </IconButton>
              </Stack>

              {/* Chart Options */}
              <FormControlLabel
                control={
                  <Switch
                    checked={showArea}
                    onChange={(e) => setShowArea(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Area Fill"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={animated}
                    onChange={(e) => setAnimated(e.target.checked)}
                    color="primary"
                  />
                }
                label="Animated Transitions"
              />
            </Paper>
          </motion.div>

          {/* Performance Summary */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={1}
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
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Performance Summary
              </Typography>
              <Stack spacing={2}>
                {subjectPerformance.map((subject, index) => (
                  <Box
                    key={subject.name}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 2,
                      background: 'rgba(0, 0, 0, 0.02)',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: subject.color,
                        }}
                      />
                      <Typography variant="body2" fontWeight="medium">
                        {subject.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" fontWeight="bold">
                        {subject.average}%
                      </Typography>
                      {subject.trend === 'up' ? (
                        <TrendingUp sx={{ color: '#43e97b', fontSize: 18 }} />
                      ) : (
                        <TrendingDown sx={{ color: '#ff6b6b', fontSize: 18 }} />
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </motion.div>
        </Grid>

        {/* Main Chart */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={2}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                height: '100%',
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
                  Academic Performance Trends
                </Typography>
                <Chip
                  icon={<Analytics />}
                  label={`${selectedSubjects.length} Subjects`}
                  variant="outlined"
                />
              </Box>

              <ResponsiveContainer width="100%" height={400}>
                {renderChart()}
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubjectTrendChart;
