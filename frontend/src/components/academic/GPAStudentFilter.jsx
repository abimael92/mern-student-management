import React from 'react';
import { Box, Grid, TextField, MenuItem } from '@mui/material';

const StudentFilter = ({
  courseFilter,
  setCourseFilter,
  subjectFilter,
  setSubjectFilter,
  studentNameFilter,
  setStudentNameFilter,
  dateRangeFilter,
  setDateRangeFilter,
  courses = [],
  subjects = [],
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Course"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {(courses || []).map((course) => (
              <MenuItem
                key={course.id ?? course.name}
                value={course.id != null ? course.id.toString() : ''}
              >
                {course.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Subject"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {(subjects || []).map((subject) => (
              <MenuItem
                key={subject.id ?? subject.name}
                value={subject.id != null ? subject.id.toString() : ''}
              >
                {subject.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Student Name"
            value={studentNameFilter}
            onChange={(e) => setStudentNameFilter(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Date"
            type="date"
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentFilter;
