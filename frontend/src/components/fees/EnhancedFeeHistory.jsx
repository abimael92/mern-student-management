// ===== ./frontend/src/components/fees/EnhancedFeeHistory.jsx =====
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
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert,
  Receipt,
  Edit,
  Delete,
  Send,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const EnhancedFeeHistory = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFee, setSelectedFee] = useState(null);

  const handleMenuOpen = (event, fee) => {
    setAnchorEl(event.currentTarget);
    setSelectedFee(fee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFee(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'overdue':
        return 'error';
      case 'partial':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return '✅';
      case 'overdue':
        return '⚠️';
      case 'partial':
        return '🔄';
      case 'pending':
        return '⏳';
      default:
        return '📝';
    }
  };

  const handleAction = (action) => {
    console.log(`${action} for fee:`, selectedFee);
    handleMenuClose();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 2, boxShadow: 'none' }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: 'grey.50' }}>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Student
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Grade
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Amount
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Paid/Due
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Due Date
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight="bold">
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((fee, index) => (
            <motion.tr
              key={fee.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    {fee.student.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {fee.student}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {fee.studentId}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip label={fee.grade} size="small" variant="outlined" />
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  ${fee.amount}
                </Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" color="success.main">
                    Paid: ${fee.paid}
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    Due: ${fee.due}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  icon={<span>{getStatusIcon(fee.status)}</span>}
                  label={
                    fee.status.charAt(0).toUpperCase() + fee.status.slice(1)
                  }
                  color={getStatusColor(fee.status)}
                  size="small"
                  variant="filled"
                />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={fee.status === 'overdue' ? 'error' : 'text.primary'}
                  fontWeight={fee.status === 'overdue' ? 'bold' : 'normal'}
                >
                  {new Date(fee.dueDate).toLocaleDateString()}
                </Typography>
                {fee.paidDate && (
                  <Typography variant="caption" color="text.secondary">
                    Paid: {new Date(fee.paidDate).toLocaleDateString()}
                  </Typography>
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, fee)}
                >
                  <MoreVert />
                </IconButton>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('edit')}>
          <Edit sx={{ mr: 1 }} />
          Edit Fee
        </MenuItem>
        <MenuItem onClick={() => handleAction('send_reminder')}>
          <Send sx={{ mr: 1 }} />
          Send Reminder
        </MenuItem>
        <MenuItem onClick={() => handleAction('download_invoice')}>
          <DownloadIcon sx={{ mr: 1 }} />
          Download Invoice
        </MenuItem>
        <MenuItem onClick={() => handleAction('record_payment')}>
          <Receipt sx={{ mr: 1 }} />
          Record Payment
        </MenuItem>
        <MenuItem
          onClick={() => handleAction('delete')}
          sx={{ color: 'error.main' }}
        >
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default EnhancedFeeHistory;
