// ===== ./frontend/src/components/fees/QuickFeeActions.jsx =====
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Add,
  Send,
  Download,
  Notifications,
  Receipt,
  Payment,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const QuickFeeActions = () => {
  const quickActions = [
    {
      icon: <Add />,
      label: 'Add Fee Record',
      description: 'Create new fee entry',
      color: '#667eea',
    },
    {
      icon: <Payment />,
      label: 'Record Payment',
      description: 'Mark payment as received',
      color: '#4facfe',
    },
    {
      icon: <Send />,
      label: 'Send Reminders',
      description: 'Notify about due payments',
      color: '#f093fb',
    },
    {
      icon: <Download />,
      label: 'Export Report',
      description: 'Download fee statements',
      color: '#43e97b',
    },
  ];

  const recentActivities = [
    {
      action: 'Payment received from Alice Johnson',
      time: '2 hours ago',
      amount: '$500',
    },
    {
      action: 'Fee reminder sent to Bob Smith',
      time: '4 hours ago',
      amount: '-$500',
    },
    {
      action: 'Partial payment recorded for Charlie Brown',
      time: '1 day ago',
      amount: '$250',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Quick Actions Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Receipt />
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    fullWidth
                    startIcon={action.icon}
                    sx={{
                      justifyContent: 'flex-start',
                      color: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      py: 1.5,
                      mb: 1,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" fontWeight="bold">
                        {action.label}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {action.description}
                      </Typography>
                    </Box>
                  </Button>
                </motion.div>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Notifications />
              Recent Activity
            </Typography>
            <List dense>
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background:
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight="medium">
                          {activity.action}
                        </Typography>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={
                              activity.amount.startsWith('-')
                                ? 'error.main'
                                : 'success.main'
                            }
                          >
                            {activity.amount}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </motion.div>
              ))}
            </List>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default QuickFeeActions;
