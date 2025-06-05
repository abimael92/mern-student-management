// GPAStudentFilter.jsx
import React from 'react';
import { Box, Grid, TextField, MenuItem } from '@mui/material';

const GPAStudentFilter = ({
  subjectFilter,
  setSubjectFilter,
  courseFilter,
  setCourseFilter,
  studentNameFilter,
  setStudentNameFilter,
  subjects,
  courses,
}) => {
  const filteredCourses = courses.filter(
    (course) => subjectFilter && course.subjectId === subjectFilter
  );

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Subject"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {subjects.map((s) => (
              <MenuItem key={`subject-${s.id}`} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {subjectFilter && (
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Course"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              fullWidth
            >
              <MenuItem value="">All</MenuItem>
              {filteredCourses.map((c) => (
                <MenuItem key={`course-${c.id}`} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Student Name"
            value={studentNameFilter}
            onChange={(e) => setStudentNameFilter(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GPAStudentFilter;
