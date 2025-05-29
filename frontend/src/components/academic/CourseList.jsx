import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CourseList = ({ courses, onEdit, onDelete }) => (
  <TableContainer component={Paper}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Code</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Instructor</TableCell>
          <TableCell>Semester</TableCell>
          <TableCell>Grade</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id || course._id || course.code}>
            <TableCell>{course.code}</TableCell>
            <TableCell>{course.name}</TableCell>
            <TableCell>{course.instructor?.name || '-'}</TableCell>
            <TableCell>{course.semester}</TableCell>
            <TableCell>{course.grade}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(course)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(course._id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CourseList;
