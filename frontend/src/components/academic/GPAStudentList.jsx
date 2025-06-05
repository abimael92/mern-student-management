import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StudentItem from './GPAStudentItem';

const StudentList = ({ students = [], subjects = [] }) => {
  const [expandedSubject, setExpandedSubject] = useState(null);

  const handleAccordionChange = (subjectId) => {
    setExpandedSubject((prev) => (prev === subjectId ? null : subjectId));
  };

  return (
    <Box sx={{ overflowX: 'auto', p: 2 }}>
      {(subjects || []).map((subject) => (
        <Accordion
          key={subject.id ?? subject.name}
          expanded={expandedSubject === subject.id}
          onChange={() => handleAccordionChange(subject.id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {subject.name ?? 'Unnamed Subject'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    {(subject.courses || []).map((course) => (
                      <TableCell key={course.id ?? course.name}>
                        {course.name ?? 'Unnamed Course'}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(students || [])
                    .filter(
                      (student) =>
                        Array.isArray(student.subjects) &&
                        student.subjects.includes(subject.id)
                    )
                    .map((student) => (
                      <StudentItem
                        key={student.id ?? student.name}
                        student={student}
                        courses={subject.courses || []}
                      />
                    ))}
                </TableBody>
              </Table>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default StudentList;
