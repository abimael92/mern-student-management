// GPAStudentsManager.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../../redux/actions/studentActions';
import { fetchSubjects } from '../../redux/actions/subjectsActions';
import { fetchCourses } from '../../redux/actions/coursesActions';
import GPAStudentFilter from './GPAStudentFilter';
import GPAStudentList from './GPAStudentList';
import { Typography, Box } from '@mui/material';

const GPAStudentsManager = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students) || [];
  const subjects = useSelector((state) => state.subjects.subjects) || [];
  const courses = useSelector((state) => state.courses.courses) || [];

  const [subjectFilter, setSubjectFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [studentNameFilter, setStudentNameFilter] = useState('');

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredStudents = students.filter((student) => {
    const matchesSubject = subjectFilter
      ? student.subjects?.includes(subjectFilter)
      : true;
    const matchesName = studentNameFilter
      ? student.name.toLowerCase().includes(studentNameFilter.toLowerCase())
      : true;
    return matchesSubject && matchesName;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        GPA Student Manager
      </Typography>
      <GPAStudentFilter
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        courseFilter={courseFilter}
        setCourseFilter={setCourseFilter}
        studentNameFilter={studentNameFilter}
        setStudentNameFilter={setStudentNameFilter}
        subjects={subjects}
        courses={courses}
      />
      <GPAStudentList
        students={filteredStudents}
        subjects={subjects}
        courses={courses}
        subjectFilter={subjectFilter}
        courseFilter={courseFilter}
      />
    </Box>
  );
};

export default GPAStudentsManager;
