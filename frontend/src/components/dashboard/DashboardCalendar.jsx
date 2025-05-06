import React from 'react';
import { CalendarPicker } from '@mui/lab';
import { Badge, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

const DashboardCalendar = ({ events, onDateSelect }) => {
  const renderDay = (date, selectedDates, pickersDayProps) => {
    const hasEvent = events.some((e) => dayjs(e.date).isSame(date, 'day'));
    return (
      <Badge
        key={date}
        color="primary"
        variant={hasEvent ? 'dot' : 'standard'}
        {...pickersDayProps}
      />
    );
  };

  return (
    <Box>
      <Typography variant="h6">Calendar</Typography>
      <CalendarPicker
        date={dayjs()}
        onChange={onDateSelect}
        renderDay={renderDay}
      />
    </Box>
  );
};

export default DashboardCalendar;
