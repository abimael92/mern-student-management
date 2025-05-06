import React from 'react';
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import TeacherCard from './TeacherCard';
import TeacherFilter from './TeacherFilter';
import TeacherDialog from './TeacherDialog';

const TeacherList = ({
  teachers,
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
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Teachers List
      </Typography>

      <TeacherFilter onFilter={onFilter} />

      <Grid container spacing={3} justifyContent="center">
        {teachers.map((teacher) => (
          <Grid item xs={12} sm={6} md={4} key={teacher.teacherNumber}>
            <TeacherCard
              teacher={teacher}
              onEdit={onEdit}
              onDelete={() => onDelete(teacher.teacherNumber)}
              onToggleStatus={() => onToggleStatus(teacher)}
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

      <TeacherDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedStudent(null);
        }}
        teacher={selectedStudent}
        onUpdate={onUpdateStudent}
      />
    </Box>
  );
};

export default TeacherList;
