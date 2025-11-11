import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TableSortLabel,
  Paper,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const CourseList = ({ courses, onEdit, onDelete }) => {
  const teachers = useSelector((state) => state.teachers.teachers || []);
  const subjects = useSelector((state) => state.subjects.subjects || []);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('code');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedCourses = [...courses].sort((a, b) => {
    // Handle sorting for instructor and subject by their names
    let aValue = '';
    let bValue = '';

    if (orderBy === 'instructor') {
      const aInstructorId =
        a.instructor && typeof a.instructor === 'object'
          ? a.instructor._id
          : a.instructor;
      const bInstructorId =
        b.instructor && typeof b.instructor === 'object'
          ? b.instructor._id
          : b.instructor;
      const aInstructor = teachers.find((t) => t._id === aInstructorId);
      const bInstructor = teachers.find((t) => t._id === bInstructorId);
      aValue = aInstructor
        ? `${aInstructor.firstName} ${aInstructor.lastName}`.toLowerCase()
        : '';
      bValue = bInstructor
        ? `${bInstructor.firstName} ${bInstructor.lastName}`.toLowerCase()
        : '';
    } else if (orderBy === 'subject') {
      const aSubjectId =
        a.subjectId && typeof a.subjectId === 'object'
          ? a.subjectId._id
          : a.subjectId;
      const bSubjectId =
        b.subjectId && typeof b.subjectId === 'object'
          ? b.subjectId._id
          : b.subjectId;
      const aSubject = subjects.find((s) => s._id === aSubjectId);
      const bSubject = subjects.find((s) => s._id === bSubjectId);
      aValue = aSubject ? aSubject.name.toLowerCase() : '';
      bValue = bSubject ? bSubject.name.toLowerCase() : '';
    } else {
      aValue = a[orderBy]?.toString().toLowerCase() || '';
      bValue = b[orderBy]?.toString().toLowerCase() || '';
    }

    return order === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
          <TableRow>
            {['courseCode', 'name', 'subject', 'semester'].map((header) => (
              <TableCell key={header}>
                <TableSortLabel
                  active={orderBy === header}
                  direction={orderBy === header ? order : 'asc'}
                  onClick={() => handleSort(header)}
                >
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableSortLabel>
              </TableCell>
            ))}

            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCourses.map((course, index) => {
            const subjectId =
              course.subject && typeof course.subject === 'object'
                ? course.subject._id
                : course.subject;
            const subject = subjects.find((s) => s._id === subjectId);
            const subjectName = subject ? subject.name : '—';

            const semesterName = course.semester?.name || '—';

            return (
              <TableRow
                key={course._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#e0e0e0',
                }}
              >
                <TableCell>{course.courseCode}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{subjectName}</TableCell>
                <TableCell>{semesterName}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(course)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(course._id)}
                    color="secondary"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseList;
