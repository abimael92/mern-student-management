import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from '@mui/material';

const GPAStudentList = ({
  students,
  subjects,
  subjectFilter,
  studentNameFilter,
}) => {
  const [orderBy, setOrderBy] = useState('studentName');
  const [order, setOrder] = useState('asc');
  const [selectedRow, setSelectedRow] = useState(null);

  const getSubject = (id) => subjects.find((s) => s.id === id) || {};

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const rows = students.flatMap((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    if (
      studentNameFilter &&
      !fullName.includes(studentNameFilter.toLowerCase())
    )
      return [];

    const subs =
      Array.isArray(student.subjects) && student.subjects.length > 0
        ? student.subjects
        : [null];

    return subs
      .filter((subId) => !subjectFilter || subId === subjectFilter)
      .map((subId) => {
        const subject = subId ? getSubject(subId) : {};
        return {
          id: `${student._id}-${subId || 'none'}`,
          studentName:
            `${student.firstName} ${student.lastName}`.trim() || 'No Name',
          teacher: subject.teacher || 'N/A',
          subjectName: subject.name || 'None',
          gpa: '-', // Placeholder
        };
      });
  });

  const sortedRows = [...rows].sort((a, b) => {
    const aVal = (a[orderBy] || '').toString().toLowerCase();
    const bVal = (b[orderBy] || '').toString().toLowerCase();
    return order === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const handleRowClick = (id) => {
    console.log('Row clicked:', id);
    setSelectedRow(id === selectedRow ? null : id);
  };

  return (
    <TableContainer component={Paper} sx={{ width: '100%', mt: 4 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#1976d2' }}>
          <TableRow>
            {['studentName', 'teacher', 'subjectName', 'gpa'].map((field) => (
              <TableCell key={field} sx={{ color: 'white' }}>
                <TableSortLabel
                  active={orderBy === field}
                  direction={orderBy === field ? order : 'asc'}
                  onClick={() => handleSort(field)}
                  sx={{ color: 'white' }}
                >
                  {field === 'studentName'
                    ? 'Student'
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row, index) => {
            const isSelected = selectedRow === row.id;
            return (
              <TableRow
                key={row.id}
                hover
                tabIndex={-1}
                onClick={() => handleRowClick(row.id)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? 'rgba(25, 118, 210, 0.3) !important'
                    : index % 2 === 0
                      ? '#f5f5f5 !important'
                      : '#e0e0e0 !important',
                  '&:hover': {
                    backgroundColor: isSelected
                      ? 'rgba(25, 118, 210, 0.7) !important'
                      : 'rgba(255, 255, 153, 0.5) !important',
                  },
                }}
              >
                <TableCell>{row.studentName}</TableCell>
                <TableCell>{row.teacher}</TableCell>
                <TableCell>{row.subjectName}</TableCell>
                <TableCell>{row.gpa}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GPAStudentList;
