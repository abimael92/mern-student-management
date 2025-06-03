import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableSortLabel,
  IconButton,
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
    const aField = (a[orderBy] || '').toString().toLowerCase();
    const bField = (b[orderBy] || '').toString().toLowerCase();
    return order === 'asc'
      ? aField.localeCompare(bField)
      : bField.localeCompare(aField);
  });

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'white' }}>
                <TableSortLabel
                  active={orderBy === 'description'}
                  direction={orderBy === 'description' ? order : 'asc'}
                  onClick={() => handleSort('description')}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'white' }}>Linked Courses</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
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
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.description || '—'}</TableCell>
                <TableCell>
                  {subject.courses?.length > 0
                    ? subject.courses.map((c) => c.name).join(', ')
                    : 'Missing'}
                </TableCell>
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
    </Paper>
  );
};

export default SubjectList;
