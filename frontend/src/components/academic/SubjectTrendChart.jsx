import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { mockSubjects } from '../../utils/mock/mockSubjectsData';

const SubjectTrendChart = ({ subjects }) => {
  const data = mockSubjects.map((subject) => ({
    name: subject.name,
    gradeTrend: subject.gradeTrend, // Assuming `gradeTrend` is an array of grades over time
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="gradeTrend" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SubjectTrendChart;
