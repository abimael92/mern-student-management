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
  Button,
} from '@mui/material';
import GradesChart from './GradesBarChart';
import TrendComparisonChart from './TrendComparisonChart';

const GPAStudentList = ({
  students,
  subjects,
  subjectFilter,
  studentNameFilter,
  courses,
}) => {
  const [orderBy, setOrderBy] = useState('studentName');
  const [order, setOrder] = useState('asc');
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [showTrend, setShowTrend] = useState(false);

  const getSubject = (id) => subjects.find((s) => s.id === id) || {};

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const rows = students.flatMap((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    if (
      studentNameFilter &&
      !fullName.includes(studentNameFilter.toLowerCase())
    )
      return [];
    const subs =
      Array.isArray(student.subjects) && student.subjects.length > 0
        ? student.subjects
        : [null];

    return subs
      .filter((subId) => !subjectFilter || subId === subjectFilter)
      .map((subId) => {
        const subject = subId ? getSubject(subId) : {};
        return {
          id: `${student._id}-${subId || 'none'}`,
          student,
          subject,
          studentName:
            `${student.firstName} ${student.lastName}`.trim() || 'No Name',
          teacher: subject.teacher || 'N/A',
          subjectName: subject.name || 'None',
          gpa: '-', // placeholder
        };
      });
  });

  const sortedRows = [...rows].sort((a, b) => {
    const aVal = (a[orderBy] || '').toString().toLowerCase();
    const bVal = (b[orderBy] || '').toString().toLowerCase();
    return order === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const handleRowClick = (row) => {
    const isSame = selectedRow === row.id;
    setSelectedRow(isSame ? null : row.id);
    setSelectedData(isSame ? null : row);
    setShowTrend(false);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '100%', mt: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              {['studentName', 'teacher', 'subjectName', 'gpa'].map((field) => (
                <TableCell key={field} sx={{ color: 'white' }}>
                  <TableSortLabel
                    active={orderBy === field}
                    direction={orderBy === field ? order : 'asc'}
                    onClick={() => handleSort(field)}
                    sx={{ color: 'white' }}
                  >
                    {field === 'studentName'
                      ? 'Student'
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows.map((row, index) => {
              const isSelected = selectedRow === row.id;
              return (
                <TableRow
                  key={row.id}
                  hover
                  tabIndex={-1}
                  onClick={() => handleRowClick(row)}
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
                  <TableCell>{row.studentName}</TableCell>
                  <TableCell>{row.teacher}</TableCell>
                  <TableCell>{row.subjectName}</TableCell>
                  <TableCell>{row.gpa}</TableCell>
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
            <Typography variant="h6">
              {selectedData.student.firstName} {selectedData.student.lastName}
            </Typography>
            <Typography variant="subtitle1">
              Subject: {selectedData.subject.name || 'None'}
            </Typography>

            {/* Course grades */}
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(
                  courses?.filter((c) =>
                    (selectedData.subject?.courses || []).includes(c.id)
                  ) || []
                ).map((course) => {
                  const grade =
                    selectedData.student.grades?.find(
                      (g) => g.courseId === course.id
                    )?.score ?? 'N/A';
                  return (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{grade}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Current Grades Chart */}
            <Box sx={{ mt: 4 }}>
              <GradesChart
                grades={(
                  courses?.filter((c) =>
                    (selectedData.subject?.courses || []).includes(c.id)
                  ) || []
                )
                  .map((course) => {
                    const score = selectedData.student.grades?.find(
                      (g) => g.courseId === course.id
                    )?.score;
                    return score != null
                      ? { name: course.name, grade: score }
                      : null;
                  })
                  .filter(Boolean)}
              />
            </Box>

            {/* Trend toggle */}
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setShowTrend(!showTrend)}
            >
              {showTrend ? 'Hide' : 'Show'} Grade Trend
            </Button>

            <Collapse in={showTrend} timeout="auto" unmountOnExit>
              <TrendComparisonChart
                student={selectedData.student}
                subject={selectedData.subject}
              />
            </Collapse>
          </Box>
        )}
      </Collapse>
    </>
  );
};

export default GPAStudentList;
