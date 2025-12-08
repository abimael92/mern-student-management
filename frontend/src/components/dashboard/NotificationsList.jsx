import React from 'react';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Typography,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const NotificationsList = ({ notifications }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'success':
        return <CheckCircleIcon color="success" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        boxShadow: '0 10px 30px rgba(252, 182, 159, 0.3)',
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <NotificationsActiveIcon color="primary" />
        Notifications
      </Typography>
      <List sx={{ p: 0 }}>
        {notifications.map((notif, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <ListItem
              sx={{
                p: 2,
                mb: 1,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
                  transform: 'translateX(4px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ListItemIcon>
                <Badge color="error" variant="dot">
                  {getIcon(notif.type)}
                </Badge>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight="medium">
                    {notif.message}
                  </Typography>
                }
                secondary={
                  // SOLUTION 1: Add component="div" to the Typography
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="div" // ← This fixes the issue!
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mt: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background:
                            notif.type === 'warning'
                              ? '#ff6b6b'
                              : notif.type === 'success'
                                ? '#51cf66'
                                : '#339af0',
                        }}
                      />
                      {notif.time}
                    </Box>
                  </Typography>
                }
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Card>
  );
};

export default NotificationsList;
