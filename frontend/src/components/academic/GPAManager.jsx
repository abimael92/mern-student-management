import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchStudents } from '../../redux/actions/studentActions';
import { fetchSubjects } from '../../redux/actions/subjectsActions';
import { fetchCourses } from '../../redux/actions/coursesActions';

import StudentFilter from './GPAStudentFilter';
import StudentList from './GPAStudentList';

import { Typography, Box } from '@mui/material';

const StudentsManager = () => {
  const dispatch = useDispatch();

  // Added students selector here
  const students = useSelector((state) => state.students.students) || [];
  const subjects = useSelector((state) => state.subjects.subjects) || [];
  const courses = useSelector((state) => state.courses.courses) || [];

  const [courseFilter, setCourseFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [studentNameFilter, setStudentNameFilter] = useState('');
  const [dateRangeFilter, setDateRangeFilter] = useState('');

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredStudents = students.filter((student) => {
    const courseIdStr = student.courseId?.toString();
    const matchesCourse = courseFilter ? courseIdStr === courseFilter : true;

    // Assuming student.subjects is array of subject IDs (string or number)
    const subjectsIdsStr = (student.subjects || []).map((id) => id.toString());
    const matchesSubject = subjectFilter
      ? subjectsIdsStr.includes(subjectFilter)
      : true;

    const matchesName = studentNameFilter
      ? student.name.toLowerCase().includes(studentNameFilter.toLowerCase())
      : true;

    // TODO: implement date filtering if your student has date field
    return matchesCourse && matchesSubject && matchesName;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student Management
      </Typography>
      <StudentFilter
        courseFilter={courseFilter}
        setCourseFilter={setCourseFilter}
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        studentNameFilter={studentNameFilter}
        setStudentNameFilter={setStudentNameFilter}
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        courses={courses}
        subjects={subjects}
      />
      <StudentList students={filteredStudents} subjects={subjects} />
    </Box>
  );
};

export default StudentsManager;
