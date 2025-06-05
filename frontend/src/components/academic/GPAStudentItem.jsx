import React from 'react';
import { TableRow, TableCell } from '@mui/material';

const StudentItem = ({ student, courses }) => {
  return (
    <TableRow>
      <TableCell>{student.name}</TableCell>
      {courses.map((course) => {
        const grade = student.grades.find((g) => g.courseId === course.id);
        return (
          <TableCell key={course.id}>{grade ? grade.score : 'N/A'}</TableCell>
        );
      })}
    </TableRow>
  );
};

export default StudentItem;
