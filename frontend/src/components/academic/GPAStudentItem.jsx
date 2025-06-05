// GPAStudentItem.jsx
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
  const displayedCourses = courseFilter
    ? courses.filter((c) => c.id === courseFilter)
    : courses;

  const totalScore = displayedCourses.reduce((sum, course) => {
    const gradeObj = studentGrades.find((g) => g.courseId === course.id);
    return sum + (gradeObj ? gradeObj.score : 0);
  }, 0);

  const avgScore = displayedCourses.length
    ? (totalScore / displayedCourses.length).toFixed(2)
    : 'N/A';

  return (
    <>
      <TableRow hover>
        <TableCell>{student.name}</TableCell>
        <TableCell>{teacher}</TableCell>
        <TableCell>{subject.name}</TableCell>
        <TableCell
          onClick={() => setOpen((prev) => !prev)}
          style={{ cursor: 'pointer' }}
        >
          {avgScore}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} sx={{ p: 0, border: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Grades per Course:
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedCourses.map((course) => {
                    const gradeObj = studentGrades.find(
                      (g) => g.courseId === course.id
                    );
                    return (
                      <TableRow key={course.id}>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>
                          {gradeObj ? gradeObj.score : 'N/A'}
                        </TableCell>
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
