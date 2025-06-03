import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from '../../redux/actions/coursesActions';

import CourseList from './CourseList';
import CourseForm from './CourseForm';

import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import { Typography, Paper, Grid, Box } from '@mui/material';

const CoursesManager = () => {
  const dispatch = useDispatch();
  const coursesState = useSelector((state) => state.courses || {});
  const { courses = [], loading = false, error = null } = coursesState;

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleAddClick = () => setSelectedCourse(null);
  const handleEditClick = (course) => setSelectedCourse(course);
  const handleDeleteClick = (id) => {
    dispatch(deleteCourse(id));
  };

  const handleSave = async (courseData) => {
    if (selectedCourse) {
      await dispatch(updateCourse({ ...courseData, _id: selectedCourse._id }));
    } else {
      await dispatch(addCourse(courseData));
    }
    setSelectedCourse(null);
    dispatch(fetchCourses()); // refetch after save
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Courses Management
      </Typography>

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box style={{ padding: '20px' }}>
            <CourseForm
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              onSave={handleSave}
              onCancel={() => setSelectedCourse(null)}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box style={{ padding: '20px' }}>
            <CourseList
              courses={courses}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default CoursesManager;
