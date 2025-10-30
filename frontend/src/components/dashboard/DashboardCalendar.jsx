import React from 'react';
import { Card, CardContent, Badge, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from '@mui/icons-material';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DashboardCalendar = ({ events, onDateSelect }) => {
  const calendarEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.date),
    end: new Date(event.date),
    allDay: true,
  }));

  const eventStyleGetter = (event) => {
    const backgroundColor = event.title.includes('Exam')
      ? '#667eea'
      : event.title.includes('Meeting')
        ? '#f093fb'
        : '#4facfe';
    return {
      style: {
        backgroundColor,
        borderRadius: '8px',
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
      },
    };
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #0f8680 0%, #55f4ec 100%)',
          boxShadow: '0 10px 30px rgba(168, 237, 234, 0.3)',
          height: '400px',
        }}
      >
        <CardContent sx={{ p: 0, height: '100%' }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Event color="primary" />
            Calendar
          </Typography>
          <Box sx={{ height: 'calc(100% - 40px)' }}>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={onDateSelect}
              views={['month']}
              popup
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardCalendar;
