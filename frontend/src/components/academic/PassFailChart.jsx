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

const COLORS = ['#4caf50', '#f44336'];
const PASS_GRADE = 60;

const getRandomGrade = () => {
  const grade = Math.floor(Math.random() * 101);
  return grade;
};

const PassFailPieChart = () => {
  const subjects = useSelector((state) => state.subjects?.subjects || []);
  const students = useSelector((state) => state.students?.students || []);

  const subjectNames = subjects.map((s) => s.name);
  const [selectedSubject, setSelectedSubject] = useState(subjectNames[0] || '');

  // Cache structure: { [subjectName]: { [studentId]: grade } }
  const gradesCache = useRef({});

  // Initialize cache ONCE when component mounts or when subjects/students change
  useEffect(() => {
    if (subjectNames.length === 0 || students.length === 0) return;

    const newCache = {};

    subjectNames.forEach((subject) => {
      newCache[subject] = {};

      students.forEach((student) => {
        const studentId = student.id || student._id;

        // Skip if already cached (shouldn't happen with this one-time init)
        if (gradesCache.current[subject]?.[studentId]) {
          newCache[subject][studentId] =
            gradesCache.current[subject][studentId];
          return;
        }

        // Check for real grade first
        let realGrade = null;
        if (student.grades) {
          if (Array.isArray(student.grades)) {
            const found = student.grades.find((g) => g.subject === subject);
            if (found) realGrade = found.grade;
          } else if (student.grades[subject] !== undefined) {
            realGrade = student.grades[subject];
          }
        }

        // Store either real grade or generate random one ONCE
        newCache[subject][studentId] =
          realGrade !== null ? realGrade : getRandomGrade();
      });
    });

    gradesCache.current = newCache;
    console.log('Full grades cache:', JSON.parse(JSON.stringify(newCache)));
  }, [subjectNames, students]); // Only runs when subjects or students change

  const getStudentGrade = (student, subjectName) => {
    const studentId = student.id || student._id;
    const cachedGrade = gradesCache.current[subjectName]?.[studentId];

    if (cachedGrade !== undefined) {
      return cachedGrade;
    }

    return getRandomGrade();
  };

  const calcPassFail = (subjectName) => {
    let pass = 0;
    let fail = 0;

    students.forEach((student) => {
      const grade = getStudentGrade(student, subjectName);
      if (grade >= PASS_GRADE) pass++;
      else fail++;
    });

    console.log(
      `%cPASS/FAIL RESULTS | ${subjectName}: ${pass} passed, ${fail} failed`,
      'color: #4caf50; font-weight: bold;  padding: 2px;'
    );

    return { pass, fail };
  };

  // Set initial selectedSubject
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
    console.log('Subject changed to:', event.target.value);
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
