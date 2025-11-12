import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: 'linear-gradient(to right, #4c6ef5, #9b4d96, #f72585)', // Improved gradient
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          style={{ fontWeight: 800, marginBottom: '24px' }}
        >
          Welcome to School Management System
        </Typography>
        <Typography
          variant="h6"
          style={{ marginBottom: '32px', maxWidth: '600px', margin: '0 auto' }}
        >
          Manage students, grades, and more with ease. A complete solution for
          organizing and tracking student progress with a modern, user-friendly
          interface.
        </Typography>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/login')}
            style={{
              padding: '12px 32px',
              fontSize: '1.2rem',
              borderRadius: '50px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default HeroSection;
