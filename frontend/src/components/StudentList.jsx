import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStudents,
  updateStudentStatus,
  deleteStudent,
  addStudent,
  updateStudent,
} from '../redux/actions/studentActions';
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import StudentCard from './StudentCard';
import StudentFilter from './StudentFilter';
import StudentDialog from './StudentDialog';

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, isLoading, error } = useSelector((state) => state.students);

  const [filterQuery, setFilterQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    if (!students || !students.length) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students]);

  const filtered = useMemo(() => {
    if (!Array.isArray(students)) return [];
    if (!filterQuery.trim()) return students;
    return students.filter((student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(filterQuery.toLowerCase())
    );
  }, [students, filterQuery]);

  const handleFilter = (query) => setFilterQuery(query);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleDelete = (studentNumber) => {
    dispatch(deleteStudent(studentNumber));
  };

  const handleToggleStatus = (studentNumber) => {
    const student = students?.find((s) => s.studentNumber === studentNumber);
    if (student) {
      dispatch(updateStudentStatus(student._id, !student.isEnrolled));
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Student List
      </Typography>

      <StudentFilter onFilter={handleFilter} />

      <Grid container spacing={3} justifyContent="center">
        {filtered.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student._id}>
            <StudentCard
              student={student}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        onClick={() => {
          setSelectedStudent(null);
          setDialogOpen(true);
        }}
        sx={{ mt: 4 }}
      >
        Add New Student
      </Button>

      <StudentDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
    </Box>
  );
};

export default StudentList;
