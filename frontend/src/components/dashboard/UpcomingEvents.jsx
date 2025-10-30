import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Event, Schedule } from '@mui/icons-material';

const UpcomingEvents = ({ events }) => {
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(
        events.reduce(
          (acc, event) => ({
            ...acc,
            [event.id]: dayjs(event.date).diff(dayjs(), 'day'),
          }),
          {}
        )
      );
    }, 60000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%)',
        boxShadow: '0 10px 30px rgba(161, 196, 253, 0.3)',
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Event color="primary" />
        Upcoming Events
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                borderLeft: `4px solid ${event.color}`,
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                '&:hover': {
                  transform: 'translateX(4px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  mb: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {event.title}
                </Typography>
                <Chip
                  label={event.category}
                  size="small"
                  sx={{
                    background: event.color,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography
                  color="primary"
                  sx={{
                    fontWeight: 'bold',
                    background:
                      timers[event.id] <= 1
                        ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)'
                        : 'inherit',
                    color: timers[event.id] <= 1 ? 'white' : 'inherit',
                    px: timers[event.id] <= 1 ? 1 : 0,
                    borderRadius: timers[event.id] <= 1 ? 1 : 0,
                  }}
                >
                  {timers[event.id] > 0
                    ? `${timers[event.id]} days left`
                    : timers[event.id] === 0
                      ? 'Tomorrow!'
                      : 'Today!'}
                </Typography>
              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Card>
  );
};

export default UpcomingEvents;
