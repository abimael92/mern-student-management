import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';

const GradesBarChart = ({ grades }) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={grades}>
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Bar dataKey="grade" fill="#1976d2" />
    </BarChart>
  </ResponsiveContainer>
);

export default GradesBarChart;
