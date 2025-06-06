import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, TextField, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fetchSubjects } from '../../redux/actions/subjectsActions';
import { fetchCourses } from '../../redux/actions/coursesActions';
import { fetchTeachers } from '../../redux/actions/teacherActions';

const GPAStudentFilter = ({ filters, onFilterChange }) => {
  const dispatch = useDispatch();

  // Get data directly from Redux store with proper initial state
  const subjects = useSelector((state) => state.subjects?.subjects || []);
  const courses = useSelector((state) => state.courses?.courses || []);
  const teachers = useSelector((state) => state.teachers?.teachers || []);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchCourses());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const {
    subjectFilter = '',
    courseFilter = '',
    teacherFilter = '',
    studentNameFilter = '',
    semesterFilter = '',
    startDate,
    endDate,
  } = filters;

  const updateFilter = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value === undefined ? '' : value,
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Subject Filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Subject"
            value={subjectFilter}
            onChange={(e) => updateFilter('subjectFilter', e.target.value)}
            fullWidth
          >
            <MenuItem value="">All Subjects</MenuItem>+{' '}
            {subjects.map((subject) => (
              <MenuItem key={subject._id} value={subject._id}>
                {subject.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Course Filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Course"
            value={courseFilter}
            onChange={(e) => updateFilter('courseFilter', e.target.value)}
            fullWidth
          >
            <MenuItem value="">All Courses</MenuItem>+{' '}
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Teacher Filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Teacher"
            value={teacherFilter}
            onChange={(e) => updateFilter('teacherFilter', e.target.value)}
            fullWidth
          >
            <MenuItem value="">All Teachers</MenuItem>+{' '}
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {`${teacher.firstName} ${teacher.lastName}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Other filters remain the same */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Student Name"
            value={studentNameFilter}
            onChange={(e) => updateFilter('studentNameFilter', e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Semester / Grade"
            value={semesterFilter}
            onChange={(e) => updateFilter('semesterFilter', e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newDate) => updateFilter('startDate', newDate)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newDate) => updateFilter('endDate', newDate)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GPAStudentFilter;
