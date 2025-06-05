// GPAStudentList.jsx
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  Collapse,
  Typography,
} from '@mui/material';
import GPAStudentItem from './GPAStudentItem';

const GPAStudentList = ({
  students,
  subjects,
  courses,
  subjectFilter,
  courseFilter,
}) => {
  const getSubject = (id) => subjects.find((s) => s.id === id);
  const getTeacher = (subjectId) => getSubject(subjectId)?.teacher ?? 'N/A';

  return (
    <Paper sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => {
            const subjectsToShow = subjectFilter
              ? (student.subjects || []).filter((sid) => sid === subjectFilter)
              : student.subjects || [];

            return subjectsToShow.map((subId) => (
              <GPAStudentItem
                key={`${student.id}-${subId}`}
                student={student}
                subjectId={subId}
                subject={getSubject(subId)}
                teacher={getTeacher(subId)}
                courses={courses.filter((c) => c.subjectId === subId)}
                courseFilter={courseFilter}
              />
            ));
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default GPAStudentList;
