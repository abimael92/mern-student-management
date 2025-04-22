import React, { useState, useEffect } from 'react';
import { useStudents } from '../../features/hooks/useStudents';
import { useAuth } from '../../features/hooks/';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Snackbar,
  Grid,
} from '@mui/material';
import StudentCard from '../../components/students/StudentCard';
import StudentFilter from '../../components/students/StudentFilter';
import StudentDialog from '../../components/students/StudentDialog';

const StudentsPage = () => {
  const { students, loading, error, refreshStudents } = useStudents();
  const { authState } = useAuth();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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

  // Initialize and fetch students
  useEffect(() => {
    const loadStudents = async () => {
      try {
        await getStudents({ page: 1, limit: 10 });
      } catch (err) {
        showSnackbar('Failed to load students', 'error');
      }
    };
    loadStudents();
  }, [getStudents]);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId);
      showSnackbar('Student deleted successfully');
      await getStudents({ page: 1, limit: 10 }); // Refresh list
    } catch (err) {
      showSnackbar('Failed to delete student', 'error');
    }
  };

  const handleToggleStatus = async (studentId) => {
    try {
      await toggleStudentStatus(studentId);
      showSnackbar('Status updated successfully');
      await getStudents({ page: 1, limit: 10 }); // Refresh list
    } catch (err) {
      showSnackbar('Failed to update status', 'error');
    }
  };

  const handleSaveStudent = async (studentData) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, studentData);
        showSnackbar('Student updated successfully');
      } else {
        await createStudent(studentData);
        showSnackbar('Student added successfully');
      }
      setDialogOpen(false);
      setSelectedStudent(null);
      await getStudents({ page: 1, limit: 10 }); // Refresh list
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
              <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
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

export default StudentsPage;
