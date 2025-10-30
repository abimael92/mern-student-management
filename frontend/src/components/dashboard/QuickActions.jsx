import React from 'react';
import { Button, Box, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddchartIcon from '@mui/icons-material/Addchart';
import SchoolIcon from '@mui/icons-material/School';

const QuickActions = ({ onEnroll, onNotify }) => (
  <Card
    sx={{
      p: 3,
      borderRadius: 4,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <AddchartIcon />
        Quick Actions
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<PersonAddIcon />}
            onClick={onEnroll}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Enroll Student
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<NotificationsIcon />}
            onClick={onNotify}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Send Notice
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<SchoolIcon />}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Add Course
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddchartIcon />}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Generate Report
          </Button>
        </motion.div>
      </Box>
    </CardContent>
  </Card>
);

export default QuickActions;
