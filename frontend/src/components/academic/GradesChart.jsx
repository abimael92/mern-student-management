// GradesChart.js
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const GradesChart = ({ grades }) => (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={grades}>
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Bar dataKey="grade" fill="#1976d2" />
    </BarChart>
  </ResponsiveContainer>
);

export default GradesChart;
