import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from '../../../redux/actions/coursesActions';

import { fetchSubjects } from '../../../redux/actions/subjectsActions';

import CourseList from './CourseList';
import CourseForm from './CourseForm';

import LoadingSpinner from '../../common/LoadingSpinner';
import ErrorAlert from '../../common/ErrorAlert';
import { Typography, Paper, Grid, Box } from '@mui/material';

import SubjectFilter from '../../subject/SubjectFilter'; // <--- import

const CoursesManager = () => {
  const dispatch = useDispatch();
  const coursesState = useSelector((state) => state.courses || {});
  const { courses = [], loading = false, error = null } = coursesState;

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [subjectFilter, setSubjectFilter] = useState('');

  const filteredCourses = subjectFilter
    ? courses.filter(
        (c) =>
          c.subjectId === subjectFilter || c.subjectId?._id === subjectFilter
      )
    : courses;

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleAddClick = () => setSelectedCourse(null);
  const handleEditClick = (course) => setSelectedCourse(course);
  const handleSave = async (courseData) => {
    if (selectedCourse) {
      await dispatch(updateCourse({ ...courseData, _id: selectedCourse._id }));
    } else {
      await dispatch(addCourse(courseData));
    }
    setSelectedCourse(null);
    dispatch(fetchCourses());
    dispatch(fetchSubjects()); // <---- add this to refresh subjects after course change
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteCourse(id)).then(() => {
      dispatch(fetchSubjects()); // refresh subjects after delete
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Courses Management
      </Typography>

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: 300 }}>
            <SubjectFilter
              subjectFilter={subjectFilter}
              onChange={setSubjectFilter}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box style={{ padding: '20px' }}>
            <CourseList
              courses={filteredCourses}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box style={{ padding: '20px' }}>
            <CourseForm
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              onSave={handleSave}
              onCancel={() => setSelectedCourse(null)}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default CoursesManager;
