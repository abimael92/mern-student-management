import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Grid, Paper } from '@mui/material';
import SubjectTrendChart from './SubjectTrendChart';
import PassFailChart from './PassFailChart';
import { mockSubjects } from '../../utils/mock/mockSubjectsData';

const SubjectsPerformanceOverview = () => {
  const subjects = mockSubjects; // Using mock data
  const grades = useSelector((state) => state.grades.allGrades || []);

  const subjectStats = useMemo(() => {
    return subjects.map((subj) => {
      const subjectGrades = grades.filter((g) => g.subjectId === subj._id);
      const avgGrade = subjectGrades.length
        ? Math.round(
            subjectGrades.reduce((a, b) => a + b.score, 0) /
              subjectGrades.length
          )
        : 0;
      const passed = subjectGrades.filter((g) => g.score >= 50).length;
      const failed = subjectGrades.length - passed;

      return {
        ...subj,
        avgGrade,
        passed,
        failed,
        total: subjectGrades.length,
        gradeTrend: subj.gradeTrend, // Passing gradeTrend here
      };
    });
  }, [grades, subjects]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <SubjectTrendChart subjects={subjectStats} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <PassFailChart subjects={subjectStats} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubjectsPerformanceOverview;
