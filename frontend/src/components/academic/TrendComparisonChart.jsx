import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const TrendComparisonChart = ({ student, subject }) => {
  // Mock data across 4 semesters
  const semesters = ['Fall 2022', 'Spring 2023', 'Fall 2023', 'Current'];
  const subjectCourses = subject?.courses || [];

  const data = semesters.map((sem) => {
    const scores = subjectCourses.map((courseId) => {
      const gradeObj = student.grades?.find((g) => g.courseId === courseId);
      return gradeObj?.score ?? Math.floor(Math.random() * 41) + 60; // random fallback
    });
    const avg = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
    return { semester: sem, avgGrade: avg };
  });

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="semester" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="avgGrade"
          stroke="#1976d2"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendComparisonChart;
