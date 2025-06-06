import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../../redux/actions/studentActions';
import { fetchSubjects } from '../../redux/actions/subjectsActions';
import { fetchCourses } from '../../redux/actions/coursesActions';
import { fetchTeachers } from '../../redux/actions/teacherActions';
import GPAStudentFilter from './GPAStudentFilter';
import GPAStudentList from './GPAStudentList';
import { Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

const GPAStudentsManager = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students) || [];
  const subjects = useSelector((state) => state.subjects.subjects) || [];
  const courses = useSelector((state) => state.courses.courses) || [];
  const teachers = useSelector((state) => state.teachers.teachers) || [];

  // All filters state here
  const [filters, setFilters] = useState({
    subjectFilter: '',
    courseFilter: '',
    teacherFilter: '',
    studentNameFilter: '',
    semesterFilter: '',
    startDate: null,
    endDate: null,
  });

  const {
    subjectFilter,
    courseFilter,
    teacherFilter,
    studentNameFilter,
    semesterFilter,
    startDate,
    endDate,
  } = filters;

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchCourses());
    dispatch(fetchTeachers());
  }, [dispatch]);

  // Memoized filter change handler to prevent infinite loops
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Filtering logic
  const filteredStudents = students.filter((student) => {
    const matchesSubject = subjectFilter
      ? student.subjects?.includes(subjectFilter)
      : true;

    const matchesCourse = courseFilter
      ? (() => {
          const courseSubjects = subjects
            .filter((s) => s.courseId === courseFilter)
            .map((s) => s.id);
          return student.subjects?.some((id) => courseSubjects.includes(id));
        })()
      : true;

    const matchesTeacher = teacherFilter
      ? (() => {
          const teacherSubjectIds = subjects
            .filter((s) => s.teacherId === teacherFilter)
            .map((s) => s.id);
          return student.subjects?.some((id) => teacherSubjectIds.includes(id));
        })()
      : true;

    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const matchesName = studentNameFilter
      ? fullName.includes(studentNameFilter.toLowerCase())
      : true;

    const matchesSemester = semesterFilter
      ? student.semester?.toLowerCase().includes(semesterFilter.toLowerCase())
      : true;

    const matchesDate =
      startDate || endDate
        ? (() => {
            const date = dayjs(student.date);
            const afterStart = startDate
              ? date.isAfter(dayjs(startDate).subtract(1, 'day'))
              : true;
            const beforeEnd = endDate
              ? date.isBefore(dayjs(endDate).add(1, 'day'))
              : true;
            return afterStart && beforeEnd;
          })()
        : true;

    return (
      matchesSubject &&
      matchesCourse &&
      matchesTeacher &&
      matchesName &&
      matchesSemester &&
      matchesDate
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        GPA Student Manager
      </Typography>
      <GPAStudentFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        subjects={subjects}
        courses={courses}
        teachers={teachers}
      />
      <GPAStudentList
        students={filteredStudents}
        subjects={subjects}
        courses={courses}
        teachers={teachers}
        teacherFilter={teacherFilter}
      />
    </Box>
  );
};

export default GPAStudentsManager;
