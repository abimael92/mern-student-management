import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchClasses,
  addClass,
  updateClass,
  deleteClass,
} from '../../redux/actions/classesActions';
import { fetchCourses } from '../../redux/actions/coursesActions';
import { fetchTeachers } from '../../redux/actions/teacherActions';
import { fetchRooms } from '../../redux/actions/roomsActions';
import { fetchStudents } from '../../redux/actions/studentActions';

import ClassList from './ClassList';
import ClassForm from './ClassForm';

import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import { Typography, Grid, Box, Button } from '@mui/material';

const ClassesManager = () => {
  const dispatch = useDispatch();
  const {
    classes = [],
    loading,
    error,
  } = useSelector((state) => state.classes || {});
  const [editingClass, setEditingClass] = useState(null);

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchCourses());
    dispatch(fetchTeachers());
    dispatch(fetchRooms());
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleSave = async (data) => {
    if (editingClass) {
      await dispatch(updateClass({ ...data, _id: editingClass._id }));
    } else {
      await dispatch(addClass(data));
    }
    setEditingClass(null);
    dispatch(fetchClasses());
  };

  const handleDelete = (id) => {
    dispatch(deleteClass(id)).then(() => dispatch(fetchClasses()));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Classes Management
      </Typography>
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}
      <Box mb={2}>
        <Button variant="contained" onClick={() => setEditingClass(null)}>
          New Class
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ClassList
            classes={classes}
            onEdit={setEditingClass}
            onDelete={handleDelete}
          />
        </Grid>
        <Grid item xs={12}>
          <ClassForm
            selectedClass={editingClass}
            onSave={handleSave}
            onCancel={() => setEditingClass(null)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassesManager;
