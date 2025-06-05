import React from 'react';
import { Box, Grid, TextField, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const GPAStudentFilter = ({
  subjectFilter,
  setSubjectFilter,
  courseFilter,
  setCourseFilter,
  teacherFilter,
  setTeacherFilter,
  studentNameFilter,
  setStudentNameFilter,
  semesterFilter,
  setSemesterFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  subjects,
  courses,
  teachers,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Subject Filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Subject"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {subjects.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
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
            onChange={(e) => setCourseFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {courses.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
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
            onChange={(e) => setTeacherFilter(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {teachers.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Student Name Filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Student Name"
            value={studentNameFilter}
            onChange={(e) => setStudentNameFilter(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Semester Filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Semester / Grade"
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Start Date Picker */}
        <Grid item xs={12} sm={3}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>

        {/* End Date Picker */}
        <Grid item xs={12} sm={3}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GPAStudentFilter;
