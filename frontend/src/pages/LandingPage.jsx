import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <Container
      maxWidth="lg"
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 px-6 py-12"
    >
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Typography
          variant="h2"
          className="text-white font-extrabold tracking-tight mb-4"
        >
          School Management System
        </Typography>
      </motion.div>

      {/* Description Sections */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        className="max-w-3xl"
      >
        <Typography variant="h5" className="text-white leading-relaxed mb-6">
          Empowering educators, administrators, and students with an intuitive
          and efficient platform to manage academic progress, streamline
          communication, and enhance learning experiences.
        </Typography>
        <Typography variant="h6" className="text-white leading-relaxed mb-6">
          Our platform simplifies school management, from handling student
          records and grades to scheduling classes and meetings. With a
          user-friendly interface and powerful tools, you can focus on fostering
          an environment where students thrive.
        </Typography>
        <Typography variant="h6" className="text-white leading-relaxed mb-6">
          Whether you're an administrator optimizing school operations or a
          teacher enhancing students' learning, our School Management System
          equips you with the tools to succeed. Stay organized, save time, and
          improve outcomes.
        </Typography>
        <Typography variant="h6" className="text-white leading-relaxed mb-8">
          Built with modern technologies, our platform ensures that your
          school’s needs are met today and in the future. It's not just a
          tool—it's your partner in providing the best education possible.
        </Typography>
      </motion.div>

      {/* Animated Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      >
        <Button
          variant="contained"
          size="large"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Button>
      </motion.div>
    </Container>
  );
};

export default LandingPage;
