import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../../redux/actions/studentActions';
import { fetchSubjects } from '../../redux/actions/subjectsActions';
import { fetchCourses } from '../../redux/actions/coursesActions';
import { fetchTeachers } from '../../redux/actions/teacherActions'; // Added
import GPAStudentFilter from './GPAStudentFilter';
import GPAStudentList from './GPAStudentList';
import { Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

const GPAStudentsManager = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students) || [];
  const subjects = useSelector((state) => state.subjects.subjects) || [];
  const courses = useSelector((state) => state.courses.courses) || [];
  const teachers = useSelector((state) => state.teachers.teachers) || []; // Added

  const [subjectFilter, setSubjectFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState(''); // Added
  const [studentNameFilter, setStudentNameFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchCourses());
    dispatch(fetchTeachers()); // Added
  }, [dispatch]);

  useEffect(() => {
    if (!subjectFilter) setCourseFilter('');
  }, [subjectFilter]);

  const filteredStudents = students.filter((student) => {
    // Filter by Subject
    const matchesSubject = subjectFilter
      ? student.subjects?.includes(subjectFilter)
      : true;

    // Filter by Course
    const matchesCourse = courseFilter
      ? (() => {
          const courseSubjects = subjects
            .filter((s) => s.courseId === courseFilter)
            .map((s) => s.id);
          return student.subjects?.some((id) => courseSubjects.includes(id));
        })()
      : true;

    // Filter by Teacher (assuming each subject has a teacherId, check if student has a subject taught by selected teacher)
    const matchesTeacher = teacherFilter
      ? (() => {
          const teacherSubjectIds = subjects
            .filter((s) => s.teacherId === teacherFilter)
            .map((s) => s.id);
          return student.subjects?.some((id) => teacherSubjectIds.includes(id));
        })()
      : true;

    // Filter by Student Name
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const matchesName = studentNameFilter
      ? fullName.includes(studentNameFilter.toLowerCase())
      : true;

    // Filter by Semester
    const matchesSemester = semesterFilter
      ? student.semester?.toLowerCase().includes(semesterFilter.toLowerCase())
      : true;

    // Filter by Date
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
      matchesTeacher && // Added
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
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        courseFilter={courseFilter}
        setCourseFilter={setCourseFilter}
        teacherFilter={teacherFilter} // Added
        setTeacherFilter={setTeacherFilter} // Added
        studentNameFilter={studentNameFilter}
        setStudentNameFilter={setStudentNameFilter}
        semesterFilter={semesterFilter}
        setSemesterFilter={setSemesterFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        subjects={subjects}
        courses={courses}
        teachers={teachers} // Added
      />
      <GPAStudentList
        students={filteredStudents}
        subjects={subjects}
        subjectFilter={subjectFilter}
        courseFilter={courseFilter}
        teacherFilter={teacherFilter} // Added if needed in list
        courses={courses}
        teachers={teachers} // Added if needed in list
      />
    </Box>
  );
};

export default GPAStudentsManager;
