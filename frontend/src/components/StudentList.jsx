import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStudents,
  updateStudentStatus,
  deleteStudent,
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

  const [filteredStudents, setFilteredStudents] = useState(students);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  const handleFilter = (query) => {
    setFilteredStudents(
      students.filter((student) =>
        `${student.firstName} ${student.lastName}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    );
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleDelete = (studentNumber) => {
    dispatch(deleteStudent(studentNumber));
  };

  const handleToggleStatus = (studentNumber) => {
    const student = students.find((s) => s.studentNumber === studentNumber);
    dispatch(updateStudentStatus(studentNumber, !student.isEnrolled));
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Student List
      </Typography>

      <StudentFilter onFilter={handleFilter} />

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredStudents.map((student) => (
            <Grid item key={student.studentNumber}>
              <StudentCard
                student={student}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        variant="contained"
        onClick={() => setDialogOpen(true)}
        sx={{ mt: 4 }}
      >
        Add New Student
      </Button>

      <StudentDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={(studentData) => {
          if (selectedStudent) {
            dispatch(updateStudent(selectedStudent.studentNumber, studentData));
          } else {
            dispatch(addStudent(studentData));
          }
        }}
        student={selectedStudent}
      />
    </Box>
  );
};

export default StudentList;
