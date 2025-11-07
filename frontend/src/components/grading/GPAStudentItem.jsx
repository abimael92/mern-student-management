import React from 'react';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

const GPAStudentItem = ({ student, subject, courses }) => {
  const subjectCourses = courses.filter((course) =>
    subject?.courses?.includes(course.id)
  );

  return (
    <>
      <Typography variant="h6">
        {student.firstName} {student.lastName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {subject?.name || 'No Subject'}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjectCourses.map((course) => {
            const grade =
              student.grades?.find((g) => g.courseId === course.id)?.score ??
              'N/A';
            return (
              <TableRow key={course.id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{grade}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default GPAStudentItem;
