import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to the top
        backgroundColor: '#f0f4f8', // Light background color
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '64px', // Add padding at the top for the header
      }}
    >
      {/* Centered Title and Subheader */}
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '800px',
          zIndex: 1, // Ensure text is above the video
          width: '100%', // Full width
          mb: 6, // Add margin below the header
        }}
      >
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'text.primary',
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            AcademiX School Management
          </Typography>
        </motion.div>

        {/* Centered Subheader */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 4,
            }}
          >
            A modern and intuitive platform to simplify school management.
          </Typography>
        </motion.div>
      </Box>

      {/* Content Section (Paragraphs on Left, Video on Right) */}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '1200px', // Limit width for better readability
          zIndex: 1, // Ensure content is above the video
        }}
      >
        {/* Left Side: Paragraphs */}
        <Box
          sx={{
            width: '50%', // Take up 50% of the width
            paddingRight: '32px', // Add spacing between paragraphs and video
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 3,
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
              }}
            >
              Our platform simplifies school management, from handling student
              records and grades to scheduling classes and meetings. With a
              user-friendly interface and powerful tools, you can focus on
              fostering an environment where students thrive.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 3,
              }}
            >
              Whether you&#39;re an administrator optimizing school operations
              or a teacher enhancing students&#39; learning, our School
              Management System equips you with the tools to succeed. Stay
              organized, save time, and improve outcomes.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 3,
              }}
            >
              Built with modern technologies, our platform ensures that your
              school&#39;s needs are met today and in the future. It&#39;s not
              just a tool—it&#39; your partner in providing the best education
              possible.
            </Typography>
          </motion.div>
        </Box>

        {/* Right Side: Video */}
        <Box
          sx={{
            width: '50%', // Take up 50% of the width
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <video
            src="/assets/school-students.mp4" // Ensure correct path for your video
            alt="School Management"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensure video covers the entire area
              borderRadius: '8px', // Add rounded corners
            }}
            autoPlay
            loop
            muted
          />
          {/* Fallback image if video doesn't load */}
          <img
            src="/assets/school-fallback.jpg" // Add a fallback image
            alt="School Management Fallback"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1, // Place behind the video
            }}
          />
        </Box>
      </Box>

      {/* Animated Button */}
      <Box
        sx={{
          textAlign: 'center',
          width: '100%',
          mt: 6, // Add margin above the button
          zIndex: 1, // Ensure button is above the video
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'scale(1.05)',
              },
              color: 'white',
              fontWeight: 'bold',
              py: 2,
              px: 6,
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s',
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default LandingPage;
