/**
 * Wrapper that applies the original app's design patterns:
 * gradient background, motion, gradient title typography, consistent spacing.
 * Use for all non-admin role pages so they match the old visual language.
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

const PageWrapper = ({ title, children, noPadding }) => {
  return (
    <Box
      sx={{
        p: noPadding ? 0 : 3,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100%',
        borderRadius: 2,
      }}
    >
      {title && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>
        </motion.div>
      )}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </Box>
  );
};

export default PageWrapper;
