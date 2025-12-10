import React from 'react';
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

const StudentList = ({
  students,
  isLoading,
  error,
  onFilter,
  onEdit,
  onDelete,
  onToggleStatus,
  dialogOpen,
  selectedStudent,
  setDialogOpen,
  setSelectedStudent,
  onUpdateStudent,
}) => {
  console.log('students list: ', students);

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Student List
      </Typography>

      <StudentFilter onFilter={onFilter} />

      <Grid container spacing={3} justifyContent="center">
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.studentNumber}>
            <StudentCard
              student={student}
              onEdit={onEdit}
              onDelete={() => onDelete(student.studentNumber)}
              onToggleStatus={() => onToggleStatus(student)}
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
        onUpdate={onUpdateStudent}
      />
    </Box>
  );
};

export default StudentList;
