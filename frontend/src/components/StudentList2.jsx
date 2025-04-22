import React, { useState, useEffect } from 'react';
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
  Snackbar,
} from '@mui/material';
import StudentCard from './students/StudentCard';
import StudentFilter from './students/StudentFilter';
import StudentDialog from './students/StudentDialog';

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, isLoading, error } = useSelector((state) => state.students);
  const { currentUser } = useAuth(); // Get current user info
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [filteredStudents, setFilteredStudents] = useState(students);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students with error handling
  useEffect(() => {
    const loadStudents = async () => {
      try {
        await dispatch(fetchStudents());
      } catch (err) {
        showSnackbar('Failed to load students', 'error');
      }
    };
    loadStudents();
  }, [dispatch]);

  // Update filtered students when students data changes
  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

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

  const handleDelete = async (studentNumber) => {
    try {
      await dispatch(deleteStudent(studentNumber));
      showSnackbar('Student deleted successfully');
    } catch (err) {
      showSnackbar('Failed to delete student', 'error');
    }
  };

  const handleToggleStatus = async (studentNumber) => {
    try {
      const student = students.find((s) => s.studentNumber === studentNumber);
      await dispatch(updateStudentStatus(studentNumber, !student.isEnrolled));
      showSnackbar('Status updated successfully');
    } catch (err) {
      showSnackbar('Failed to update status', 'error');
    }
  };

  const handleSaveStudent = async (studentData) => {
    try {
      if (selectedStudent) {
        await dispatch(
          updateStudent(selectedStudent.studentNumber, studentData)
        );
        showSnackbar('Student updated successfully');
      } else {
        await dispatch(addStudent(studentData));
        showSnackbar('Student added successfully');
      }
      setDialogOpen(false);
      setSelectedStudent(null);
    } catch (err) {
      showSnackbar(err.message || 'Operation failed', 'error');
    }
  };

  // Check user permissions
  const canEdit = currentUser?.roles?.some((r) =>
    ['admin', 'registrar', 'teacher'].includes(r)
  );
  const canDelete = currentUser?.roles?.includes('admin');
  const canCreate = currentUser?.roles?.some((r) =>
    ['admin', 'registrar'].includes(r)
  );
  const canToggleStatus = currentUser?.roles?.some((r) =>
    ['admin', 'registrar'].includes(r)
  );

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Student Management
      </Typography>

      <StudentFilter onFilter={handleFilter} />

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {filteredStudents.map((student) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={student.studentNumber}
              >
                <StudentCard
                  student={student}
                  onEdit={canEdit ? handleEdit : null}
                  onDelete={canDelete ? handleDelete : null}
                  onToggleStatus={canToggleStatus ? handleToggleStatus : null}
                />
              </Grid>
            ))}
          </Grid>

          {filteredStudents.length === 0 && (
            <Typography variant="body1" textAlign="center" mt={4}>
              No students found
            </Typography>
          )}
        </>
      )}

      {canCreate && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedStudent(null);
              setDialogOpen(true);
            }}
            size="large"
          >
            Add New Student
          </Button>
        </Box>
      )}

      <StudentDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedStudent(null);
        }}
        onSave={handleSaveStudent}
        student={selectedStudent}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentList;
