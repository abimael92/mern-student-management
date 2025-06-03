import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const initialGrades = [
  {
    id: 1,
    student: 'Alice',
    subject: 'Algebra',
    grade: 85,
    date: '2025-05-01',
  },
  { id: 2, student: 'Bob', subject: 'Geometry', grade: 90, date: '2025-05-02' },
  {
    id: 3,
    student: 'Alice',
    subject: 'Geometry',
    grade: 78,
    date: '2025-04-28',
  },
];

const GradesAnalyticsPage = () => {
  const [filter, setFilter] = useState('');
  const filteredGrades = initialGrades.filter(
    (g) =>
      g.student.toLowerCase().includes(filter.toLowerCase()) ||
      g.subject.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Grades Analytics
      </Typography>
      <TextField
        label="Filter by student or subject"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2, width: '100%' }}
      />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGrades.map(({ id, student, subject, grade, date }) => (
              <TableRow key={id}>
                <TableCell>{student}</TableCell>
                <TableCell>{subject}</TableCell>
                <TableCell>{grade}</TableCell>
                <TableCell>{date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default GradesAnalyticsPage;
