import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Collapse,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';

const GPAStudentList = ({
  students,
  subjects,
  subjectFilter,
  studentNameFilter,
  courses,
  teachers, // make sure this prop is passed
}) => {
  const [orderBy, setOrderBy] = useState('studentName');
  const [order, setOrder] = useState('asc');
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const getSubject = (id) => subjects.find((s) => s.id === id) || {};

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return (
      !studentNameFilter || fullName.includes(studentNameFilter.toLowerCase())
    );
  });

  const filteredSubjects = subjectFilter
    ? subjects.filter((sub) => sub.id === subjectFilter)
    : subjects;

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const aName = `${a.firstName} ${a.lastName}`.toLowerCase();
    const bName = `${b.firstName} ${b.lastName}`.toLowerCase();
    return order === 'asc'
      ? aName.localeCompare(bName)
      : bName.localeCompare(aName);
  });

  const handleRowClick = (student) => {
    const isSame = selectedRow === student._id;
    setSelectedRow(isSame ? null : student._id);
    setSelectedData(isSame ? null : student);
  };

  // Get one random teacher to assign to subjects temporarily
  const fallbackTeacher =
    teachers && teachers.length > 0
      ? teachers[Math.floor(Math.random() * teachers.length)].name
      : 'Temp Teacher';

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '100%', mt: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>
                <TableSortLabel
                  active={orderBy === 'studentName'}
                  direction={orderBy === 'studentName' ? order : 'asc'}
                  onClick={() => handleSort('studentName')}
                  sx={{ color: 'white' }}
                >
                  Student
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'white' }}>Teacher</TableCell>
              {filteredSubjects.map((subject) => (
                <TableCell
                  key={subject.id}
                  sx={{ color: 'white', minWidth: 120 }}
                >
                  {subject.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStudents.map((student, index) => {
              const isSelected = selectedRow === student._id;
              return (
                <TableRow
                  key={student._id}
                  hover
                  tabIndex={-1}
                  onClick={() => handleRowClick(student)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: isSelected
                      ? 'rgba(25, 118, 210, 0.3) !important'
                      : index % 2 === 0
                        ? '#f5f5f5 !important'
                        : '#e0e0e0 !important',
                    '&:hover': {
                      backgroundColor: isSelected
                        ? 'rgba(25, 118, 210, 0.7) !important'
                        : 'rgba(255, 255, 153, 0.5) !important',
                    },
                  }}
                >
                  <TableCell>
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>
                    {/** Uncomment when subject.teacher is available */}
                    {/* {subject.teacher || 'N/A'} */}
                    {fallbackTeacher}
                  </TableCell>
                  {filteredSubjects.map((subject) => {
                    const hasSubject =
                      Array.isArray(student.subjects) &&
                      student.subjects.includes(subject.id);

                    if (!hasSubject) {
                      return (
                        <Tooltip title="Not for this student">
                          <TableCell key={subject.id}>-</TableCell>
                        </Tooltip>
                      );
                    }

                    const subjectCourses = subject.courses || [];
                    const gradesForSubject = student.grades
                      ? student.grades.filter((g) =>
                          subjectCourses.includes(g.courseId)
                        )
                      : [];

                    let displayGrade = '-';
                    if (gradesForSubject.length > 0) {
                      const total = gradesForSubject.reduce(
                        (acc, g) => acc + (g.score || 0),
                        0
                      );
                      const avg = total / gradesForSubject.length;
                      displayGrade = avg.toFixed(1);
                    }

                    return (
                      <TableCell key={subject.id}>{displayGrade}</TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Collapse in={!!selectedData} timeout="auto" unmountOnExit>
        {selectedData && (
          <Box
            sx={{
              p: 3,
              mt: 2,
              backgroundColor: '#fafafa',
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {selectedData.firstName} {selectedData.lastName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {/* Subject: {selectedData.subject?.name || 'None'} */}
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(
                  courses?.filter((course) =>
                    selectedData.subject?.courses?.includes(course.id)
                  ) || []
                ).map((course) => {
                  const grade =
                    selectedData.grades?.find((g) => g.courseId === course.id)
                      ?.score ?? 'N/A';
                  return (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{grade}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        )}
      </Collapse>
    </>
  );
};

export default GPAStudentList;
