import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Paper,
  Tooltip,
  Chip,
  Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ClassList = ({ classes = [], onEdit, onDelete }) => {
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const sorted = [...classes].sort((a, b) => {
    const getValue = (item) => {
      if (orderBy === 'teacher') return item.teacher?.firstName || '';
      if (orderBy === 'course') return item.course?.name || '';
      if (orderBy === 'room') return item.room?.name || '';
      if (orderBy === 'schedule') {
        // Sort by first schedule day if exists
        return item.schedule?.[0]?.day || '';
      }
      return item[orderBy] || '';
    };

    const aVal = getValue(a).toString().toLowerCase();
    const bVal = getValue(b).toString().toLowerCase();

    return order === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  // Format schedule for display
  const formatSchedule = (schedule) => {
    if (!schedule) return 'No schedule';

    // Handle array format (from your schema)
    if (Array.isArray(schedule)) {
      return schedule.map((slot) => (
        <Chip
          key={`${slot.day}-${slot.startTime}`}
          label={`${slot.day} ${slot.startTime}-${slot.endTime}`}
          size="small"
          sx={{ m: 0.5 }}
        />
      ));
    }

    // Handle object format (fallback)
    if (typeof schedule === 'object') {
      return Object.entries(schedule)
        .filter(([key]) => !['_id', 'active'].includes(key))
        .map(([day, time]) => (
          <Chip
            key={day}
            label={`${day}: ${time}`}
            size="small"
            sx={{ m: 0.5 }}
          />
        ));
    }

    return 'Invalid schedule format';
  };

  console.log('Classes:', classes);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', mt: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#1976d2' }}>
          <TableRow>
            {[
              'name',
              'code',
              'course',
              'teacher',
              'room',
              'schedule',
              'students',
            ].map((f) => (
              <TableCell key={f} sx={{ color: 'white', fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === f}
                  direction={orderBy === f ? order : 'asc'}
                  onClick={() => handleSort(f)}
                  sx={{
                    color: 'white',
                    '& .MuiTableSortLabel-icon': { color: 'white !important' },
                  }}
                >
                  {f === 'students'
                    ? 'Students'
                    : f.charAt(0).toUpperCase() + f.slice(1)}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((cls) => (
            <TableRow key={cls._id}>
              <TableCell>{cls.name || 'N/A'}</TableCell>
              <TableCell>{cls.code || 'N/A'}</TableCell>
              <TableCell>{cls.course?.name || 'N/A'}</TableCell>
              <TableCell>
                {cls.teacher
                  ? `${cls.teacher.firstName} ${cls.teacher.lastName}`
                  : 'N/A'}
              </TableCell>
              <TableCell>{cls.room?.name || 'N/A'}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {formatSchedule(cls.schedule)}
                </Box>
              </TableCell>
              <TableCell>
                {cls.students?.filter((s) => s.status === 'active').length || 0}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onEdit(cls)}
                  color="primary"
                  size="small"
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(cls._id)}
                  color="secondary"
                  size="small"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassList;
