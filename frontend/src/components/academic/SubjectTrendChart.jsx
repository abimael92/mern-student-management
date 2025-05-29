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
  const terms = mockSubjects[0].gradeTrend.map((entry) => entry.term);

  const data = terms.map((term, i) => {
    const entry = { term };
    mockSubjects.forEach((subject) => {
      entry[subject.name] = subject.gradeTrend[i].grade;
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="term" />
        <YAxis />
        <Tooltip />
        <Legend />
        {mockSubjects.map((subject) => (
          <Line
            key={subject.name}
            type="monotone"
            dataKey={subject.name}
            stroke="#8884d8"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SubjectTrendChart;
