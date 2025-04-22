import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const scrollToSection = () => {
    const section = document.getElementById('features');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f4f8',
        position: 'relative',
        overflow: 'hidden',
        pt: '64px',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1200px',
          width: '100%',
          mx: 'auto',
          px: 3,
          zIndex: 1,
        }}
      >
        {/* Text Section */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: 'center', md: 'left' },
            mb: { xs: 4, md: 0 },
            pr: { md: 4 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              AcademiX School Management
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Typography variant="h5" sx={{ color: 'text.secondary', mb: 4 }}>
              A modern and intuitive platform to simplify school management.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              Empowering educators and administrators with tools to enhance
              academic performance and school operations.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Manage records, schedules, and communication efficiently — all in
              one place.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              onClick={scrollToSection}
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'scale(1.05)',
                },
                color: 'white',
                fontWeight: 'bold',
                px: 5,
                py: 1.5,
                borderRadius: '8px',
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Box>

        {/* Video Section */}
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 3,
          }}
        >
          <video
            src="/assets/school-students.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(0.5px)',
            }}
          />
        </Box>
      </Box>

      {/* Features Anchor Target */}
      <Box id="features" sx={{ mt: 10 }} />
    </Box>
  );
};

export default LandingPage;
