import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const SubjectForm = ({ selectedSubject, setSelectedSubject, onSave }) => {
  const teachers = useSelector((state) => state.teachers.teachers || []);
  const students = useSelector((state) => state.students.students || []);
  const courses = useSelector((state) => state.courses.courses || []); // <-- use courses from store

  const [subjectData, setSubjectData] = useState({
    name: '',
    code: '',
    description: '',
    classLevel: '',
    teacher: '',
    students: [],
    weeklyHours: 0,
    availableCourses: [], // <-- will hold course IDs, not strings
  });

  useEffect(() => {
    if (selectedSubject) {
      setSubjectData({
        name: selectedSubject.name || '',
        code: selectedSubject.code || '',
        description: selectedSubject.description || '',
        classLevel: selectedSubject.classLevel || '',
        teacher: selectedSubject.teacher?._id || '',
        students: selectedSubject.students?.map((s) => s._id) || [],
        weeklyHours: selectedSubject.weeklyHours || 0,
        availableCourses:
          selectedSubject.availableCourses?.map((c) =>
            typeof c === 'object' ? c._id : c
          ) || [],
      });
    }
  }, [selectedSubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentSelect = (e) => {
    const { value } = e.target;
    setSubjectData((prev) => ({
      ...prev,
      students: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleAvailableCoursesChange = (event) => {
    const {
      target: { value },
    } = event;
    setSubjectData((prev) => ({
      ...prev,
      availableCourses: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectData.name) {
      console.error('Name is required');
      return;
    }

    const dataToSave = {
      ...subjectData,
      weeklyHours: Number(subjectData.weeklyHours) || 0,
      teacher: subjectData.teacher || null,
      students: Array.isArray(subjectData.students)
        ? subjectData.students.filter((id) => id)
        : [],
      availableCourses: Array.isArray(subjectData.availableCourses)
        ? subjectData.availableCourses.filter((id) => id)
        : [],
    };

    try {
      await onSave(dataToSave);
      onCancel();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const onCancel = (e) => {
    if (e) e.preventDefault();
    setSubjectData({
      name: '',
      code: '',
      description: '',
      classLevel: '',
      teacher: '',
      students: [],
      weeklyHours: 0,
      availableCourses: [],
    });
    setSelectedSubject(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {selectedSubject && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Subject Code"
              name="code"
              value={subjectData.code}
              fullWidth
              disabled
            />
          </Grid>
        )}
        <Grid item xs={12} md={12}>
          <TextField
            label="Subject Name"
            name="name"
            value={subjectData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={subjectData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Class Level"
            name="classLevel"
            value={subjectData.classLevel}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Weekly Hours"
            name="weeklyHours"
            type="number"
            value={subjectData.weeklyHours}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Teacher"
            name="teacher"
            value={subjectData.teacher}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {`${teacher.firstName} ${teacher.lastName}`.trim()}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Students"
            name="students"
            value={subjectData.students}
            onChange={handleStudentSelect}
            SelectProps={{
              multiple: true,
              renderValue: (selected) =>
                students
                  .filter((s) => selected.includes(s._id))
                  .map((s) => `${s.firstName} ${s.lastName}`)
                  .join(', '),
            }}
            fullWidth
          >
            {students.map((student) => (
              <MenuItem key={student._id} value={student._id}>
                {`${student.firstName} ${student.lastName}`.trim()}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            label="Available Courses"
            name="availableCourses"
            value={subjectData.availableCourses}
            onChange={handleAvailableCoursesChange}
            SelectProps={{
              multiple: true,
              renderValue: (selected) =>
                courses
                  .filter((c) => selected.includes(c._id))
                  .map((c) => c.name)
                  .join(', '),
            }}
            fullWidth
          >
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button onClick={onCancel} variant="contained" color="secondary">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                {selectedSubject ? 'Update' : 'Add'} Subject
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SubjectForm;
