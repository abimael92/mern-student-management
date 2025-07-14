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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ClassList = ({ classes = [], onEdit, onDelete }) => {
  const [orderBy, setOrderBy] = useState('schedule');
  const [order, setOrder] = useState('asc');

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const sorted = [...classes].sort((a, b) => {
    const getValue = (item) => {
      if (orderBy === 'teacher') return item.teacher?.name || '';
      if (orderBy === 'course') return item.course?.name || '';
      if (orderBy === 'room') return item.room?.name || '';
      return item[orderBy] || '';
    };

    const aVal = getValue(a).toString().toLowerCase();
    const bVal = getValue(b).toString().toLowerCase();

    return order === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#1976d2' }}>
          <TableRow>
            {['schedule', 'course', 'teacher', 'room', 'students'].map((f) => (
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
                    ? 'Student Count'
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
          {sorted.map((cls, i) => {
            console.log(cls);
            return (
              <TableRow key={cls._id}>
                <TableCell>{cls.schedule}</TableCell>
                <TableCell>{cls.course?.name || 'N/A'}</TableCell>
                <TableCell>
                  {cls.teacher
                    ? `${cls.teacher.firstName} ${cls.teacher.lastName}`
                    : 'N/A'}
                </TableCell>
                <TableCell>{cls.room?.name || 'N/A'}</TableCell>
                <TableCell>
                  {Array.isArray(cls.students) ? cls.students.length : 0}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(cls)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(cls._id)}
                    color="secondary"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassList;
