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
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Button,
  Switch,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

const COLORS = ['#4caf50', '#f44336'];
const PASS_GRADE = 60;

const getRandomGrade = () => Math.floor(Math.random() * 101);

const PassFailPieChart = () => {
  const subjects = useSelector((state) => state.subjects?.subjects || []);
  const students = useSelector((state) => state.students?.students || []);

  const subjectNames = subjects.map((s) => s.name);
  const [selectedSubject, setSelectedSubject] = useState(subjectNames[0] || '');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPercentage, setShowPercentage] = useState(false);
  const [detailedStudents, setDetailedStudents] = useState([]);

  // Cache structure:
  const gradesCache = useRef({});

  // Initialize cache ONCE when component mounts or when subjects/students change
  useEffect(() => {
    if (subjectNames.length === 0 || students.length === 0) return;

    const newCache = {};

    subjectNames.forEach((subject) => {
      newCache[subject] = {};

      students.forEach((student) => {
        const studentId = student.id || student._id;

        if (gradesCache.current[subject]?.[studentId]) {
          newCache[subject][studentId] =
            gradesCache.current[subject][studentId];
          return;
        }

        let realGrade = null;
        if (student.grades) {
          if (Array.isArray(student.grades)) {
            const found = student.grades.find((g) => g.subject === subject);
            if (found) realGrade = found.grade;
          } else if (student.grades[subject] !== undefined) {
            realGrade = student.grades[subject];
          }
        }

        newCache[subject][studentId] =
          realGrade !== null ? realGrade : getRandomGrade();
      });
    });

    gradesCache.current = newCache;
  }, [subjectNames, students]);

  const getStudentGrade = (student, subjectName) => {
    const studentId = student.id || student._id;
    return gradesCache.current[subjectName]?.[studentId] ?? getRandomGrade();
  };

  const calcPassFail = (subjectName) => {
    let pass = 0;
    let fail = 0;

    students.forEach((student) => {
      const grade = getStudentGrade(student, subjectName);
      if (grade >= PASS_GRADE) pass++;
      else fail++;
    });

    return { pass, fail };
  };

  const handlePieClick = (data, index) => {
    const category = index === 0 ? 'passed' : 'failed';
    setSelectedCategory(category);

    // Filter students based on pass/fail
    const filteredStudents = students
      .filter((student) => {
        const grade = getStudentGrade(student, selectedSubject);
        return category === 'passed' ? grade >= PASS_GRADE : grade < PASS_GRADE;
      })
      .map((student) => ({
        id: student._id,
        name: `${student.firstName} ${student.lastName}`,
        grade: getStudentGrade(student, selectedSubject),
      }));

    setDetailedStudents(filteredStudents);
  };

  const exportToCSV = () => {
    if (!selectedCategory) return;

    const csvData = detailedStudents.map((student) => {
      return {
        'Student ID': student.id,
        'Student Name': student.name,
        Grade: student.grade,
        Status: selectedCategory,
      };
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedSubject}_${selectedCategory}_students.csv`);
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
    setSelectedSubject(event.target.value);
    setSelectedCategory(null);
  };

  const togglePercentage = () => {
    setShowPercentage(!showPercentage);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: selectedCategory ? 'row' : 'column',
        alignItems: selectedCategory ? 'flex-start' : 'center',
        justifyContent: 'center',
        transition: 'all 0.4s ease',
      }}
    >
      <Box
        sx={{
          width: selectedCategory ? '50%' : '100%',
          transition: 'width 0.4s ease',
        }}
      >
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

        <FormControlLabel
          control={
            <Switch checked={showPercentage} onChange={togglePercentage} />
          }
          label={showPercentage ? 'Percentage' : 'Absolute Numbers'}
        />

        <Box
          sx={{
            width: selectedCategory ? '50%' : '100%',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // smoother easing
            transform: selectedCategory ? 'translateX(0)' : 'translateX(0)', // add transform if you want sliding effect
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ name, percent }) =>
                  showPercentage
                    ? `${name}: ${(percent * 100).toFixed(0)}%`
                    : `${name}: ${data.find((d) => d.name === name).value}`
                }
                isAnimationActive={true}
                onClick={handlePieClick}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    style={{
                      cursor: 'pointer',
                      filter:
                        selectedCategory &&
                        ((selectedCategory === 'passed' && index === 0) ||
                          (selectedCategory === 'failed' && index === 1))
                          ? 'brightness(1.3) drop-shadow(0 0 6px #888)'
                          : 'none',
                      transition: 'filter 0.3s ease',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  showPercentage
                    ? [
                        `${((value / students.length) * 100).toFixed(1)}%`,
                        data.find((d) => d.value === value).name,
                      ]
                    : [
                        `${value} students`,
                        data.find((d) => d.value === value).name,
                      ]
                }
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {selectedCategory && (
        <Box sx={{ width: '50%', pl: 2 }}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              {selectedCategory === 'passed' ? 'Passed' : 'Failed'} Students (
              {detailedStudents.length})
              <Button
                variant="outlined"
                onClick={exportToCSV}
                sx={{ float: 'right' }}
              >
                Export to CSV
              </Button>
            </Typography>
            <List sx={{ maxHeight: 400, overflow: 'auto' }}>
              {detailedStudents.map((student) => (
                <ListItem key={student.id}>
                  <ListItemText
                    primary={student.name}
                    secondary={`Grade: ${student.grade}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default PassFailPieChart;
