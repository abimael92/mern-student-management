// ===== ./frontend/src/components/attendance/AttendanceStudentList.jsx =====
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
  Typography,
  Checkbox,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert,
  CheckCircle,
  Cancel,
  Schedule,
  Person,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const AttendanceStudentList = ({
  students,
  onBulkAction,
  selectedDate,
  showHistory = false,
}) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedStudents(students.map((s) => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleMarkAttendance = (status) => {
    onBulkAction(status, selectedStudents);
    setSelectedStudents([]);
    setAnchorEl(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'success';
      case 'Absent':
        return 'error';
      case 'Late':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Bulk Actions Bar */}
      {selectedStudents.length > 0 && (
        <Paper
          sx={{
            p: 2,
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              {selectedStudents.length} students selected
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Mark as Present">
                <IconButton
                  onClick={() => handleMarkAttendance('Present')}
                  sx={{ color: 'white' }}
                >
                  <CheckCircle />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mark as Absent">
                <IconButton
                  onClick={() => handleMarkAttendance('Absent')}
                  sx={{ color: 'white' }}
                >
                  <Cancel />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mark as Late">
                <IconButton
                  onClick={() => handleMarkAttendance('Late')}
                  sx={{ color: 'white' }}
                >
                  <Schedule />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>
      )}

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, boxShadow: 'none' }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: 'grey.50' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedStudents.length > 0 &&
                    selectedStudents.length < students.length
                  }
                  checked={
                    students.length > 0 &&
                    selectedStudents.length === students.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Student
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Class
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
              {showHistory && (
                <>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      This Week
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      This Month
                    </Typography>
                  </TableCell>
                </>
              )}
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Person color="action" />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {student.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {student.id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={student.class} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={student.attendanceStatus}
                    color={getStatusColor(student.attendanceStatus)}
                    size="small"
                  />
                </TableCell>
                {showHistory && (
                  <>
                    <TableCell>
                      <Typography variant="body2">
                        {student.weeklyAttendance}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {student.monthlyAttendance}%
                      </Typography>
                    </TableCell>
                  </>
                )}
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleMarkAttendance('Present')}>
          <CheckCircle color="success" sx={{ mr: 1 }} />
          Mark as Present
        </MenuItem>
        <MenuItem onClick={() => handleMarkAttendance('Absent')}>
          <Cancel color="error" sx={{ mr: 1 }} />
          Mark as Absent
        </MenuItem>
        <MenuItem onClick={() => handleMarkAttendance('Late')}>
          <Schedule color="warning" sx={{ mr: 1 }} />
          Mark as Late
        </MenuItem>
      </Menu>
    </motion.div>
  );
};

export default AttendanceStudentList;
