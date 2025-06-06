import React, { useState } from 'react';
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
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useSelector } from 'react-redux';

const colors = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#413ea0',
  '#0088FE',
  '#00C49F',
  '#FFBB28',
];

// Indexed fallback grade arrays
const fallbackGrades = [
  [85, 88, 90, 92],
  [78, 81, 83, 85],
  [90, 89, 87, 88],
  [80, 82, 84, 86],
  [95, 96, 94, 97],
];

const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

const SubjectTrendChart = () => {
  const subjects = useSelector((state) => state.subjects?.subjects || []);
  const subjectNames = subjects.map((s) => s.name);
  const [selectedSubjects, setSelectedSubjects] = useState(subjectNames);

  const data = terms.map((term, index) => {
    const entry = { term };

    selectedSubjects.forEach((subjectName, i) => {
      const realSubject = subjects.find((s) => s.name === subjectName);
      const fallback = fallbackGrades[i] ?? [60, 62, 64, 66];
      entry[subjectName] =
        realSubject?.gradeTrend?.[index]?.grade ?? fallback[index] ?? null;
    });

    return entry;
  });

  const handleChange = (event) => {
    setSelectedSubjects(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        GPA Trend Line Chart
      </Typography>

      <FormControl sx={{ mb: 3, width: 300 }}>
        <InputLabel id="select-subjects-label">Select Subjects</InputLabel>
        <Select
          labelId="select-subjects-label"
          multiple
          value={selectedSubjects}
          onChange={handleChange}
          input={<OutlinedInput label="Select Subjects" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {subjectNames.map((subject) => (
            <MenuItem key={subject} value={subject}>
              <Checkbox checked={selectedSubjects.includes(subject)} />
              <ListItemText primary={subject} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="term" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          {selectedSubjects.map((subjectName, i) => (
            <Line
              key={subjectName}
              type="monotone"
              dataKey={subjectName}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SubjectTrendChart;
