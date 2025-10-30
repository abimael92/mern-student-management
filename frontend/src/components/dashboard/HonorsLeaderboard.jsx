import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { School, EmojiEvents } from '@mui/icons-material';

const HonorsLeaderboard = () => {
  const topStudents = [
    { name: 'Sarah Johnson', grade: 'A+', score: 98, avatar: '/avatars/1.jpg' },
    { name: 'Michael Chen', grade: 'A', score: 95, avatar: '/avatars/2.jpg' },
    { name: 'Emma Davis', grade: 'A', score: 94, avatar: '/avatars/3.jpg' },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          height: '100%',
          p: 3,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          color: 'white',
          boxShadow: '0 10px 30px rgba(67, 233, 123, 0.3)',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <School />
              Honors Leaderboard
            </Typography>
            <EmojiEvents sx={{ fontSize: 32, opacity: 0.8 }} />
          </Box>

          <List sx={{ p: 0 }}>
            {topStudents.map((student, index) => (
              <motion.div
                key={student.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ListItem
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateX(4px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ListItemAvatar>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar src={student.avatar} />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -2,
                          right: -2,
                          background:
                            index === 0
                              ? '#ffd700'
                              : index === 1
                                ? '#c0c0c0'
                                : '#cd7f32',
                          color: 'white',
                          borderRadius: '50%',
                          width: 20,
                          height: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 'bold',
                        }}
                      >
                        {index + 1}
                      </Box>
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="bold">
                        {student.name}
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                          {student.grade} • {student.score}%
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HonorsLeaderboard;
