import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import TeacherCard from './TeacherCard';
import TeacherFilter from './TeacherFilter';
import TeacherDialog from './TeacherDialog';

const TeacherList = ({
  teachers,
  loading,
  error,
  filter,
  onFilterChange,
  onDelete,
  onStatusChange,
}) => {
  console.log('teachers list: ', teachers);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenDialog(true);
  };

  const handleAddTeacher = () => {
    setSelectedTeacher(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTeacher(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <TeacherFilter filter={filter} onFilterChange={onFilterChange} />

      <Button variant="contained" onClick={handleAddTeacher} sx={{ mb: 3 }}>
        Add Teacher
      </Button>

      {teachers.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No teachers found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {Array.isArray(teachers) &&
            teachers.filter(Boolean).map((teacher) => (
              <Grid
                item
                key={teacher._id || teacher.teacherNumber || Math.random()}
                xs={12}
                sm={6}
                md={4}
              >
                <TeacherCard
                  teacher={teacher}
                  onEdit={handleEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              </Grid>
            ))}
        </Grid>
      )}

      <TeacherDialog
        open={openDialog}
        onClose={handleCloseDialog}
        teacher={selectedTeacher}
      />
    </Box>
  );
};

export default TeacherList;
