// ===== ./frontend/src/components/attendance/AttendanceCalendarView.jsx =====
import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Today,
  EventAvailable,
  EventBusy,
  Schedule,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
} from 'date-fns';

// Mock data - replace with your API data
import { attendanceRecords } from '../../utils/mock/mockAttendanceData';

const AttendanceCalendarView = ({ onDateSelect, selectedDate }) => {
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calculate attendance data for each day
  const calendarData = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return days.map((day) => {
      const dayRecords = attendanceRecords.filter((record) =>
        isSameDay(new Date(record.date), day)
      );

      const presentCount = dayRecords.filter(
        (r) => r.status === 'Present'
      ).length;
      const absentCount = dayRecords.filter(
        (r) => r.status === 'Absent'
      ).length;
      const lateCount = dayRecords.filter((r) => r.status === 'Late').length;
      const totalCount = dayRecords.length;

      let status = 'no-data';
      let percentage = 0;

      if (totalCount > 0) {
        percentage = (presentCount / totalCount) * 100;
        if (percentage >= 90) status = 'excellent';
        else if (percentage >= 80) status = 'good';
        else if (percentage >= 70) status = 'fair';
        else status = 'poor';
      }

      return {
        date: day,
        isCurrentMonth: isSameMonth(day, currentMonth),
        isToday: isToday(day),
        isSelected: selectedDate && isSameDay(day, selectedDate),
        records: dayRecords,
        stats: {
          present: presentCount,
          absent: absentCount,
          late: lateCount,
          total: totalCount,
          percentage,
        },
        status,
      };
    });
  }, [currentMonth, selectedDate]);

  const navigateMonth = (direction) => {
    setCurrentMonth(
      direction === 'next'
        ? addMonths(currentMonth, 1)
        : subMonths(currentMonth, 1)
    );
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const handleDateClick = (dayData) => {
    if (onDateSelect && dayData.isCurrentMonth) {
      onDateSelect(dayData.date);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return theme.palette.success.main;
      case 'good':
        return theme.palette.info.main;
      case 'fair':
        return theme.palette.warning.main;
      case 'poor':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[300];
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <EventAvailable sx={{ fontSize: 16 }} />;
      case 'good':
        return <EventAvailable sx={{ fontSize: 16 }} />;
      case 'fair':
        return <Schedule sx={{ fontSize: 16 }} />;
      case 'poor':
        return <EventBusy sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'excellent':
        return 'Excellent';
      case 'good':
        return 'Good';
      case 'fair':
        return 'Fair';
      case 'poor':
        return 'Poor';
      default:
        return 'No Data';
    }
  };

  // Calendar header with month navigation
  const CalendarHeader = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {format(currentMonth, 'MMMM yyyy')}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          onClick={goToToday}
          size="small"
          sx={{
            background: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <Today />
        </IconButton>
        <IconButton
          onClick={() => navigateMonth('prev')}
          size="small"
          sx={{
            background: alpha(theme.palette.grey[500], 0.1),
            '&:hover': {
              background: alpha(theme.palette.grey[500], 0.2),
            },
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={() => navigateMonth('next')}
          size="small"
          sx={{
            background: alpha(theme.palette.grey[500], 0.1),
            '&:hover': {
              background: alpha(theme.palette.grey[500], 0.2),
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );

  // Day names header
  const DayNames = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 1,
          mb: 2,
        }}
      >
        {dayNames.map((day) => (
          <Typography
            key={day}
            variant="caption"
            fontWeight="bold"
            color="text.secondary"
            textAlign="center"
            sx={{ py: 1 }}
          >
            {day}
          </Typography>
        ))}
      </Box>
    );
  };

  // Individual day cell
  const DayCell = ({ dayData }) => {
    const { date, isCurrentMonth, isToday, isSelected, stats, status } =
      dayData;

    return (
      <motion.div
        whileHover={{ scale: isCurrentMonth ? 1.05 : 1 }}
        whileTap={{ scale: isCurrentMonth ? 0.95 : 1 }}
      >
        <Tooltip
          title={
            stats.total > 0 ? (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  {format(date, 'MMMM d, yyyy')}
                </Typography>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
                >
                  <Chip
                    label={`Present: ${stats.present}`}
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                  <Chip
                    label={`Absent: ${stats.absent}`}
                    size="small"
                    color="error"
                    variant="outlined"
                  />
                  <Chip
                    label={`Late: ${stats.late}`}
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                  <Typography variant="caption">
                    Attendance: {stats.percentage.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
            ) : (
              `No attendance data for ${format(date, 'MMMM d, yyyy')}`
            )
          }
          arrow
        >
          <Paper
            onClick={() => handleDateClick(dayData)}
            sx={{
              aspectRatio: '1',
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isCurrentMonth ? 'pointer' : 'default',
              background: isSelected
                ? `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.main}40)`
                : isToday
                  ? `linear-gradient(135deg, ${theme.palette.secondary.main}15, ${theme.palette.secondary.main}25)`
                  : 'background.paper',
              border: isSelected
                ? `2px solid ${theme.palette.primary.main}`
                : isToday
                  ? `2px solid ${theme.palette.secondary.main}`
                  : `1px solid ${theme.palette.divider}`,
              opacity: isCurrentMonth ? 1 : 0.4,
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': isCurrentMonth
                ? {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.primary.main}20)`,
                    borderColor: theme.palette.primary.main,
                  }
                : {},
            }}
          >
            {/* Status indicator bar */}
            {stats.total > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: getStatusColor(status),
                }}
              />
            )}

            {/* Date number */}
            <Typography
              variant="body2"
              fontWeight={isToday ? 'bold' : 'normal'}
              color={isToday ? 'secondary.main' : 'text.primary'}
              sx={{ mb: 0.5 }}
            >
              {format(date, 'd')}
            </Typography>

            {/* Attendance summary */}
            {stats.total > 0 ? (
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 0.5,
                  }}
                >
                  {getStatusIcon(status)}
                  <Typography variant="caption" fontWeight="bold">
                    {stats.percentage.toFixed(0)}%
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ lineHeight: 1 }}
                >
                  {stats.present}/{stats.total}
                </Typography>
              </Box>
            ) : isCurrentMonth ? (
              <Typography variant="caption" color="text.secondary">
                No data
              </Typography>
            ) : null}
          </Paper>
        </Tooltip>
      </motion.div>
    );
  };

  // Calendar grid
  const CalendarGrid = () => (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}
    >
      <AnimatePresence>
        {calendarData.map((dayData, index) => (
          <motion.div
            key={dayData.date.toISOString()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.01 }}
          >
            <DayCell dayData={dayData} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );

  // Legend for attendance status
  const CalendarLegend = () => {
    const statuses = [
      { status: 'excellent', label: 'Excellent (90-100%)' },
      { status: 'good', label: 'Good (80-89%)' },
      { status: 'fair', label: 'Fair (70-79%)' },
      { status: 'poor', label: 'Poor (<70%)' },
      { status: 'no-data', label: 'No Data' },
    ];

    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mt: 3,
          pt: 2,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {statuses.map(({ status, label }) => (
          <Box
            key={status}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background:
                  status === 'no-data'
                    ? theme.palette.grey[300]
                    : getStatusColor(status),
                border:
                  status === 'no-data'
                    ? `1px solid ${theme.palette.grey[400]}`
                    : 'none',
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  // Selected date details panel
  const SelectedDateDetails = () => {
    if (!selectedDate) return null;

    const selectedDayData = calendarData.find(
      (day) => day.date && selectedDate && isSameDay(day.date, selectedDate)
    );

    if (!selectedDayData || selectedDayData.stats.total === 0) {
      return (
        <Paper
          sx={{
            p: 3,
            mt: 3,
            background: `linear-gradient(135deg, ${theme.palette.grey[50]}, ${theme.palette.grey[100]})`,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {format(selectedDate, 'MMMM d, yyyy')}
          </Typography>
          <Typography color="text.secondary">
            No attendance data available for this date.
          </Typography>
        </Paper>
      );
    }

    const { stats, records } = selectedDayData;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          sx={{
            p: 3,
            mt: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.primary.main}15)`,
            borderRadius: 2,
            border: `1px solid ${theme.palette.primary.main}20`,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {format(selectedDate, 'MMMM d, yyyy')} - Attendance Summary
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {stats.present}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Present
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main" fontWeight="bold">
                {stats.absent}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Absent
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {stats.late}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Late
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main" fontWeight="bold">
                {stats.percentage.toFixed(1)}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Attendance Rate
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label={`Total Students: ${stats.total}`}
              variant="outlined"
              size="small"
            />
            <Chip
              label={getStatusLabel(selectedDayData.status)}
              color={
                selectedDayData.status === 'excellent'
                  ? 'success'
                  : selectedDayData.status === 'good'
                    ? 'info'
                    : selectedDayData.status === 'fair'
                      ? 'warning'
                      : 'error'
              }
              size="small"
            />
          </Box>
        </Paper>
      </motion.div>
    );
  };

  return (
    <Box>
      <CalendarHeader />
      <DayNames />
      <CalendarGrid />
      <CalendarLegend />
      <SelectedDateDetails />
    </Box>
  );
};

export default AttendanceCalendarView;
