import React, { useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGrades } from '../../redux/actions/gradesActions';

const GradesAnalyticsPage = () => {
  const dispatch = useDispatch();
  const { grades, loading, error } = useSelector((state) => state.grades);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);

  const filteredGrades =
    grades?.filter((g) => {
      const student = g?.student?.name || '';
      const subject = g?.subject?.name || '';
      return (
        student.toLowerCase().includes(filter.toLowerCase()) ||
        subject.toLowerCase().includes(filter.toLowerCase())
      );
    }) || [];

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

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
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
              {filteredGrades.map((g) => (
                <TableRow key={g._id || g.id}>
                  <TableCell>{g?.student?.name || 'N/A'}</TableCell>
                  <TableCell>{g?.subject?.name || 'N/A'}</TableCell>
                  <TableCell>{g?.grade ?? 'N/A'}</TableCell>
                  <TableCell>{g?.date || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default GradesAnalyticsPage;
