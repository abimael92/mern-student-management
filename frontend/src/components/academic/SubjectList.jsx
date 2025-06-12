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

const SubjectList = ({ subjects = [], onEdit, onDelete }) => {
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const sortedSubjects = [...subjects].sort((a, b) => {
    const aVal = (a[orderBy] || '').toString().toLowerCase();
    const bVal = (b[orderBy] || '').toString().toLowerCase();
    return order === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#1976d2' }}>
          <TableRow>
            {['subjectCode', 'name', 'description', 'creditValue'].map(
              (field) => (
                <TableCell
                  key={field}
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    fontSize: '0.95rem',
                  }}
                >
                  <TableSortLabel
                    active={orderBy === field}
                    direction={orderBy === field ? order : 'asc'}
                    onClick={() => handleSort(field)}
                    sx={{
                      color: 'white',
                      '&.Mui-active': {
                        color: 'white',
                      },
                      '& .MuiTableSortLabel-icon': {
                        color: 'white !important',
                      },
                    }}
                  >
                    {field === 'creditValue'
                      ? 'Credits'
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </TableSortLabel>
                </TableCell>
              )
            )}
            <TableCell
              sx={{
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                fontSize: '0.95rem',
              }}
            >
              Department
            </TableCell>
            <TableCell
              sx={{
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                fontSize: '0.95rem',
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSubjects.map((subject, index) => (
            <TableRow
              key={subject._id}
              sx={{
                backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#e0e0e0',
              }}
            >
              <TableCell>{subject.subjectCode}</TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{subject.description}</TableCell>
              <TableCell>{subject.creditValue}</TableCell>
              <TableCell>{subject.department?.name || '—'}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(subject)}>
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => onDelete(subject._id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectList;
