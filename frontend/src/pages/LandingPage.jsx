import React from 'react';
import {
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  People,
  TrendingUp,
  Dashboard,
  Security,
  RocketLaunch,
} from '@mui/icons-material';

const LandingPage = () => {
  // Features data for the features section
  const features = [
    {
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      title: 'Smart Dashboard',
      description:
        'Real-time insights and analytics for better decision making',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'Student Management',
      description: 'Comprehensive student profiles and progress tracking',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Performance Analytics',
      description: 'Advanced analytics to track academic performance',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security for your data protection',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  // Statistics data for the stats section
  const stats = [
    { number: '50K+', label: 'Students' },
    { number: '500+', label: 'Schools' },
    { number: '98%', label: 'Satisfaction' },
    { number: '24/7', label: 'Support' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        // Uncomment for gradient background:
        // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements - Uncomment for decorative background */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
          zIndex: 0,
        }}
      /> */}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* ===== HERO SECTION ===== */}
        {/* Centered Header Section */}
        <Box
          sx={{
            textAlign: 'center',
            width: '100%',
            pt: 8,
            pb: 4,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
              }}
            >
              AcademiX School Management
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                lineHeight: 1.6,
              }}
            >
              A modern and intuitive platform to simplify school management and
              enhance learning experiences.
            </Typography>
          </motion.div>
        </Box>

        {/* Main Content Grid - Left: Text, Right: Video & Stats */}
        <Grid
          container
          spacing={6}
          sx={{
            minHeight: '60vh',
            alignItems: 'center',
            pb: 8,
          }}
        >
          {/* ===== LEFT COLUMN - TEXT CONTENT ===== */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  pr: { md: 4 },
                }}
              >
                {/* Content paragraphs */}
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                  }}
                >
                  A modern, intuitive platform that simplifies school
                  administration, enhances learning experiences, and drives
                  academic excellence through cutting-edge technology.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                  }}
                >
                  Empowering educators, administrators, and students with an
                  intuitive and efficient platform to manage academic progress,
                  streamline communication, and enhance learning experiences.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                  }}
                >
                  Our platform simplifies school management, from handling
                  student records and grades to scheduling classes and meetings.
                  With a user-friendly interface and powerful tools, you can
                  focus on fostering an environment where students thrive.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                  }}
                >
                  Whether you&apos;re an administrator optimizing school
                  operations or a teacher enhancing students&apos; learning, our
                  School Management System equips you with the tools to succeed.
                  Stay organized, save time, and improve outcomes.
                </Typography>

                {/* CTA Button */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    width: '100%',
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ width: '100%' }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={<RocketLaunch />}
                      sx={{
                        background:
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        px: 4,
                        py: 2.5,
                        borderRadius: 3,
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                        '&:hover': {
                          boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                        minHeight: '60px',
                      }}
                    >
                      Get Started
                    </Button>
                  </motion.div>

                  {/* Uncomment for secondary button */}
                  {/* <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: '#667eea',
                        color: '#667eea',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        '&:hover': {
                          borderColor: '#764ba2',
                          background: 'rgba(102, 126, 234, 0.04)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Watch Demo
                    </Button>
                  </motion.div> */}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* ===== RIGHT COLUMN - VIDEO & STATS ===== */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                {/* Video Section */}
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 35px 60px rgba(0, 0, 0, 0.2)',
                    },
                    transition: 'all 0.4s ease',
                    mb: 4,
                  }}
                >
                  <video
                    src="/assets/school-students.mp4"
                    alt="School Management Demo"
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                    autoPlay
                    loop
                    muted
                  />

                  {/* Fallback image if video doesn't load */}
                  <img
                    src="/assets/school-fallback.jpg"
                    alt="School Management Fallback"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: -1,
                    }}
                  />

                  {/* Uncomment for play button overlay */}
                  {/* <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        'linear-gradient(45deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          color: '#667eea',
                          borderRadius: '50%',
                          width: 80,
                          height: 80,
                          minWidth: 'auto',
                          '&:hover': {
                            background: 'white',
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <Typography variant="h4">▶</Typography>
                      </Button>
                    </motion.div>
                  </Box> */}
                </Box>

                {/* Statistics Grid */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                  }}
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    >
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          background: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: 3,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 'bold',
                            background:
                              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 1,
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={600}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* ===== FEATURES SECTION ===== */}
        <Box sx={{ py: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Why Choose AcademiX?
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
            >
              Designed to meet the evolving needs of modern educational
              institutions
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      border: 'none',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          background: feature.color,
                          width: 80,
                          height: 80,
                          borderRadius: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          color: 'white',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
