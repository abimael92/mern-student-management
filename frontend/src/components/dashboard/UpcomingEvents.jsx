import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

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
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [events]);

  return events.map((event) => (
    <Card key={event.id} sx={{ mb: 2, p: 2 }}>
      <Typography variant="h6">{event.title}</Typography>
      <Typography color="textSecondary">{event.category}</Typography>
      <Typography color="primary">
        {timers[event.id] > 0 ? `${timers[event.id]} days left` : 'Today!'}
      </Typography>
    </Card>
  ));
};

export default UpcomingEvents;
