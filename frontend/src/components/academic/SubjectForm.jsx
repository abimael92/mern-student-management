import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const SubjectForm = ({ selectedSubject, onSave, teachers, students }) => {
  const [subjectData, setSubjectData] = useState({
    name: '',
    code: '',
    description: '',
    classLevel: '',
    teacher: '',
    students: [],
    weeklyHours: 0,
  });

  useEffect(() => {
    if (selectedSubject) {
      console.log('Selected Subject ID:', selectedSubject._id);
      setSubjectData({
        name: selectedSubject.name || '',
        code: selectedSubject.code || '',
        description: selectedSubject.description || '',
        classLevel: selectedSubject.classLevel || '',
        teacher: selectedSubject.teacher?._id || '',
        students: selectedSubject.students?.map((s) => s._id) || [],
        weeklyHours: selectedSubject.weeklyHours || 0,
      });
    }
  }, [selectedSubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStudentSelect = (e) => {
    setSubjectData((prev) => ({
      ...prev,
      students: Array.from(e.target.selectedOptions, (option) => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSubject) {
      onSave(subjectData);
    } else {
      try {
        if (!subjectData.name || !subjectData.code) {
          throw new Error('Name and Code are required');
        }

        const dataToSave = {
          ...subjectData,
          weeklyHours: Number(subjectData.weeklyHours) || 0,
          teacher: subjectData.teacher || null, // Convert empty string to null
          students: Array.isArray(subjectData.students)
            ? subjectData.students.filter((id) => id) // Remove empty strings
            : [],
        };

        await onSave(dataToSave);
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {selectedSubject && (
            <TextField
              label="Subject Code"
              name="code"
              value={subjectData.code}
              fullWidth
              disabled
            />
          )}
        </Grid>
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
                {teacher.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            SelectProps={{ multiple: true }}
            label="Students"
            name="students"
            value={subjectData.students}
            onChange={handleStudentSelect}
            fullWidth
          >
            {students.map((student) => (
              <MenuItem key={student._id} value={student._id}>
                {student.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {selectedSubject ? 'Update' : 'Add'} Subject
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SubjectForm;
