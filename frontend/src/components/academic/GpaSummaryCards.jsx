import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Person,
  School,
  EmojiEvents,
  Star,
  ShowChart,
} from '@mui/icons-material';

const GpaSummaryCards = () => {
  const theme = useTheme();

  // Enhanced mock data with trends and icons
  const cardsData = [
    {
      title: 'School Average GPA',
      value: 3.62,
      change: '+0.08',
      trend: 'up',
      icon: <EmojiEvents sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Overall academic performance',
      previous: 3.54,
    },
    {
      title: 'Most Improved Student',
      value: 'Ana Lopez',
      change: '+0.45',
      trend: 'up',
      icon: <Person sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'GPA improvement this semester',
      subject: 'Mathematics',
    },
    {
      title: 'Most Challenging Subject',
      value: 'Organic Chemistry',
      change: '-0.12',
      trend: 'down',
      icon: <School sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Average subject GPA',
      avgScore: 2.89,
    },
    {
      title: 'Top Performing Class',
      value: '12th Grade Science',
      change: '+0.23',
      trend: 'up',
      icon: <Star sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'Class average GPA',
      classAvg: 3.78,
    },
    {
      title: 'Attendance Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #ff7c81 0%, #fb8cd8 100%)',
      description: 'Overall student attendance',
      previousMonth: '92.1%',
    },
    {
      title: 'Graduation Rate',
      value: '96.8%',
      change: '+1.4%',
      trend: 'up',
      icon: <ShowChart sx={{ fontSize: 32 }} />,
      color: 'linear-gradient(135deg, #72d1cc 0%, #ee4a7e 100%)',
      description: 'Projected graduation rate',
      previousYear: '95.4%',
    },
  ];

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
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <Grid container spacing={3}>
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={card.title}>
          <motion.div
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <Paper
              sx={{
                p: 3,
                height: '100%',
                background: card.color,
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              {/* Background pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                {/* Header with icon and trend */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Chip
                    label={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <TrendingUp
                          sx={{
                            fontSize: 16,
                            transform:
                              card.trend === 'down' ? 'rotate(180deg)' : 'none',
                          }}
                        />
                        {card.change}
                      </Box>
                    }
                    size="small"
                    sx={{
                      background:
                        card.trend === 'up'
                          ? 'rgba(76, 175, 80, 0.9)'
                          : 'rgba(244, 67, 54, 0.9)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>

                {/* Main value */}
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    mb: 1,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  {typeof card.value === 'number'
                    ? card.value.toFixed(2)
                    : card.value}
                </Typography>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    opacity: 0.9,
                    fontWeight: 600,
                  }}
                >
                  {card.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    opacity: 0.8,
                    fontSize: '0.875rem',
                  }}
                >
                  {card.description}
                </Typography>

                {/* Additional info */}
                {card.subject && (
                  <Chip
                    label={`Excelling in ${card.subject}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      color: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      fontSize: '0.7rem',
                    }}
                  />
                )}

                {card.avgScore && (
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.8,
                      fontStyle: 'italic',
                    }}
                  >
                    Avg. Score: {card.avgScore}
                  </Typography>
                )}

                {card.classAvg && (
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.8,
                      fontStyle: 'italic',
                    }}
                  >
                    Class Average: {card.classAvg}
                  </Typography>
                )}

                {/* Progress indicator for some cards */}
                {(card.title === 'Attendance Rate' ||
                  card.title === 'Graduation Rate') && (
                  <Box sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        height: 4,
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0.8)',
                          width:
                            card.title === 'Attendance Rate' ? '94%' : '96%',
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default GpaSummaryCards;
