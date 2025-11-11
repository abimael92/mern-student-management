import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AssignmentCompletionChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="subject" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="completed" fill="#4caf50" />
      <Bar dataKey="pending" fill="#f44336" />
    </BarChart>
  </ResponsiveContainer>
);

export default AssignmentCompletionChart;
