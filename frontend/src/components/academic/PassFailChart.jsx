import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const COLORS = ['#4caf50', '#f44336']; // green pass, red fail
const PASS_GRADE = 60;

const getRandomGrade = () => Math.floor(Math.random() * 101);

const PassFailPieChart = () => {
  const subjects = useSelector((state) => state.subjects?.subjects || []);
  const students = useSelector((state) => state.students?.students || []);

  const subjectNames = subjects.map((s) => s.name);
  const [selectedSubject, setSelectedSubject] = useState(subjectNames[0] || '');

  // Use a ref to cache random grades to avoid re-render loops
  const randomGradesCache = useRef({});

  // When subject changes, generate and cache random grades for all students missing a grade for the subject
  useEffect(() => {
    if (!selectedSubject) return;

    const newCache = {};

    students.forEach((student) => {
      // Try to get real grade from student
      let hasRealGrade = false;

      if (student.grades) {
        if (Array.isArray(student.grades)) {
          const found = student.grades.find(
            (g) => g.subject === selectedSubject
          );
          if (found && typeof found.grade === 'number') {
            hasRealGrade = true;
          }
        } else if (typeof student.grades === 'object') {
          if (typeof student.grades[selectedSubject] === 'number') {
            hasRealGrade = true;
          }
        }
      }

      if (!hasRealGrade) {
        newCache[`${student.id}-${selectedSubject}`] = getRandomGrade();
      }
    });

    randomGradesCache.current = newCache;
  }, [selectedSubject, students]);

  const getStudentGrade = (student, subjectName) => {
    // Try real grade first
    if (student.grades) {
      if (Array.isArray(student.grades)) {
        const record = student.grades.find((g) => g.subject === subjectName);
        if (record && typeof record.grade === 'number') {
          return record.grade;
        }
      } else if (typeof student.grades === 'object') {
        const grade = student.grades[subjectName];
        if (typeof grade === 'number') {
          return grade;
        }
      }
    }

    // fallback to cached random grade
    return (
      randomGradesCache.current[`${student.id}-${subjectName}`] ??
      getRandomGrade()
    );
  };

  const calcPassFail = (subjectName) => {
    let pass = 0;
    let fail = 0;

    students.forEach((student) => {
      const grade = getStudentGrade(student, subjectName);
      if (typeof grade === 'number') {
        if (grade >= PASS_GRADE) pass++;
        else fail++;
      }
    });

    return { pass, fail };
  };

  // Set initial selectedSubject when subjects load
  useEffect(() => {
    if (subjectNames.length > 0 && !selectedSubject) {
      setSelectedSubject(subjectNames[0]);
    }
  }, [subjectNames, selectedSubject]);

  const data = [
    { name: 'Passed', value: 0 },
    { name: 'Failed', value: 0 },
  ];

  if (selectedSubject) {
    const { pass, fail } = calcPassFail(selectedSubject);
    data[0].value = pass;
    data[1].value = fail;
  }

  const handleChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="subject-select-label">Select Subject</InputLabel>
        <Select
          labelId="subject-select-label"
          value={selectedSubject}
          label="Select Subject"
          onChange={handleChange}
        >
          {subjectNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} students`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PassFailPieChart;
