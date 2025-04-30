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
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

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

  const handleDelete = async (studentNumber) => {
    try {
      await dispatch(deleteStudent(studentNumber));
      setRefreshTrigger((prev) => prev + 1); // Force refresh after deletion
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  const handleToggleStatus = async (student) => {
    console.log(student);
    try {
      if (!student || !student._id) {
        console.error('Student or student ID not found');
        return;
      }

      await dispatch(updateStudentStatus(student._id, !student.isEnrolled));
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleUpdateStudent = async (updatedStudent) => {
    if (!updatedStudent.studentNumber) {
      console.error('Student number is missing');
      return;
    }

    console.log('Updating student with ID:', updatedStudent.studentNumber); // Log for debugging

    try {
      await dispatch(updateStudent(updatedStudent)); // Make sure updatedStudent has the correct ID
      setDialogOpen(false);
    } catch (error) {
      console.error('Failed to update student:', error);
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
          <Grid item xs={12} sm={6} md={4} key={student.studentNumber}>
            <StudentCard
              student={student || {}} // Safeguard against undefined student
              onEdit={handleEdit}
              onDelete={() => handleDelete(student.studentNumber)}
              onToggleStatus={() => handleToggleStatus(student)}
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
        onUpdate={handleUpdateStudent}
      />
    </Box>
  );
};

export default StudentList;
