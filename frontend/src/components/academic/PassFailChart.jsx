import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { mockSubjects } from '../../utils/mock/mockSubjectsData';

const PassFailChart = ({ subjects }) => {
  const pieData = mockSubjects.map((subject) => ({
    name: subject.name,
    pass: subject.passed, // Number of students passed
    fail: subject.failed, // Number of students failed
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        {pieData.map((subject, index) => (
          <Pie
            key={index}
            data={[
              { name: 'Passed', value: subject.pass },
              { name: 'Failed', value: subject.fail },
            ]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            <Cell fill="#4caf50" />
            <Cell fill="#f44336" />
          </Pie>
        ))}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PassFailChart;
