import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const CourseList = ({ courses }) => (
  <TableContainer component={Paper}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Course Code</TableCell>
          <TableCell>Course Name</TableCell>
          <TableCell>Instructor</TableCell>
          <TableCell>Semester</TableCell>
          <TableCell>Grade</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {courses.map((course, index) => (
          <TableRow key={index}>
            <TableCell>{course.code}</TableCell>
            <TableCell>{course.name}</TableCell>
            <TableCell>{course.instructor}</TableCell>
            <TableCell>{course.semester}</TableCell>
            <TableCell>{course.grade}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CourseList;
