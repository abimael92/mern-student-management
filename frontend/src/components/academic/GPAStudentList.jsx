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
  Collapse,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import GradesBarChart from './GradesBarChart';

const GPAStudentList = ({ students, subjects, courses }) => {
  const [orderBy, setOrderBy] = useState('studentName');
  const [order, setOrder] = useState('asc');
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState('');

  const getSubject = (id) => subjects.find((s) => s.id === id) || {};

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const handleRowClick = (row) => {
    const isSame = selectedRow === row.id;
    setSelectedRow(isSame ? null : row.id);
    setSelectedData(isSame ? null : row);
  };

  const rows = students.flatMap((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const subs =
      Array.isArray(student.subjects) && student.subjects.length
        ? student.subjects
        : [null];
    return subs
      .filter((subId) => !subjectFilter || subId === subjectFilter)
      .map((subId) => {
        const subject = subId ? getSubject(subId) : {};
        return {
          id: `${student._id}-${subId || 'none'}`,
          student,
          subject,
          studentName: fullName,
          teacher: subject.teacher || 'N/A',
          subjectName: subject.name || 'No Subject',
          gpa: '-',
        };
      });
  });

  const sortedRows = [...rows].sort((a, b) => {
    const aVal = a[orderBy]?.toString().toLowerCase() || '';
    const bVal = b[orderBy]?.toString().toLowerCase() || '';
    return order === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  return (
    <>
      <Box sx={{ mt: 2, mb: 2, display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Subject</InputLabel>
          <Select
            value={subjectFilter}
            label="Subject"
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <MenuItem value="">All Subjects</MenuItem>
            {subjects.map((subj) => (
              <MenuItem key={subj.id} value={subj.id}>
                {subj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
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
            {sortedRows.map((row, idx) => {
              const isSelected = selectedRow === row.id;
              return (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => handleRowClick(row)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: isSelected
                      ? 'rgba(25,118,210,0.3)'
                      : idx % 2
                        ? '#f5f5f5'
                        : '#eaeaea',
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

      <Collapse in={!!selectedData} timeout="auto" unmountOnExit>
        {selectedData && (
          <Box sx={{ p: 3, mt: 2, bgcolor: '#fafafa', borderRadius: 1 }}>
            <Typography variant="h6">
              {selectedData.student.firstName} {selectedData.student.lastName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Subject: {selectedData.subject.name || 'None'}
            </Typography>

            <GradesBarChart
              grades={(courses || [])
                .filter((c) =>
                  (selectedData.subject?.courses || []).includes(c.id)
                )
                .map((course) => {
                  const found = selectedData.student.grades?.find(
                    (g) => g.courseId === course.id
                  );
                  return {
                    name: course.name,
                    grade: found?.score ?? Math.floor(Math.random() * 41) + 60, // mock fallback
                  };
                })}
            />
          </Box>
        )}
      </Collapse>
    </>
  );
};

export default GPAStudentList;
