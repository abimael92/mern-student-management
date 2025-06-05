import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
} from '@mui/material';

const GPAStudentItem = ({
  student,
  subjectId,
  subject,
  teacher,
  courses,
  courseFilter,
}) => {
  const [open, setOpen] = useState(false);

  const studentGrades = student.grades || [];

  const filteredCourses = courseFilter
    ? courses.filter((c) => c.id === courseFilter)
    : courses;

  const total = filteredCourses.reduce((acc, c) => {
    const grade = studentGrades.find((g) => g.courseId === c.id);
    return acc + (grade?.score || 0);
  }, 0);

  const avg = filteredCourses.length
    ? (total / filteredCourses.length).toFixed(2)
    : 'N/A';

  return (
    <>
      <TableRow
        hover
        onClick={() => setOpen((prev) => !prev)}
        style={{ cursor: 'pointer' }}
      >
        <TableCell>{student.name}</TableCell>
        <TableCell>{teacher}</TableCell>
        <TableCell>{subject.name || 'N/A'}</TableCell>
        <TableCell>{avg}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} sx={{ p: 0, border: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1">Grades:</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCourses.map((course) => {
                    const grade = studentGrades.find(
                      (g) => g.courseId === course.id
                    );
                    return (
                      <TableRow key={course.id}>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{grade ? grade.score : 'N/A'}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default GPAStudentItem;
