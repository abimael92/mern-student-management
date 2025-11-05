// ===== ./frontend/src/components/fees/EnhancedFeeDashboard.jsx =====
import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Payment,
  Receipt,
  Schedule,
  Warning,
  Download,
  FilterList,
  Add,
  Refresh,
  MoreVert,
  CheckCircle,
  Cancel,
  Pending,
} from '@mui/icons-material';
import EnhancedFeeHistory from './EnhancedFeeHistory';
import FeeAnalyticsChart from './FeeAnalyticsChart';
import QuickFeeActions from './QuickFeeActions';

const EnhancedFeeDashboard = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [timeFilter, setTimeFilter] = useState('month');
  const [statusFilter, setStatusFilter] = useState('all');

  // Enhanced mock data with more realistic information
  const feeData = useMemo(
    () => [
      {
        id: 1,
        student: 'Alice Johnson',
        studentId: 'S001',
        amount: 500,
        paid: 500,
        due: 0,
        status: 'paid',
        dueDate: '2025-05-01',
        paidDate: '2025-04-28',
        grade: 'Grade 5A',
        paymentMethod: 'Credit Card',
        invoiceNumber: 'INV-001',
      },
      {
        id: 2,
        student: 'Bob Smith',
        studentId: 'S002',
        amount: 500,
        paid: 0,
        due: 500,
        status: 'overdue',
        dueDate: '2025-05-01',
        paidDate: null,
        grade: 'Grade 6B',
        paymentMethod: null,
        invoiceNumber: 'INV-002',
      },
      {
        id: 3,
        student: 'Charlie Brown',
        studentId: 'S003',
        amount: 500,
        paid: 250,
        due: 250,
        status: 'partial',
        dueDate: '2025-05-15',
        paidDate: '2025-04-30',
        grade: 'Grade 7C',
        paymentMethod: 'Bank Transfer',
        invoiceNumber: 'INV-003',
      },
      {
        id: 4,
        student: 'Diana Prince',
        studentId: 'S004',
        amount: 500,
        paid: 500,
        due: 0,
        status: 'paid',
        dueDate: '2025-05-01',
        paidDate: '2025-04-29',
        grade: 'Grade 8A',
        paymentMethod: 'Cash',
        invoiceNumber: 'INV-004',
      },
      {
        id: 5,
        student: 'Ethan Hunt',
        studentId: 'S005',
        amount: 500,
        paid: 0,
        due: 500,
        status: 'pending',
        dueDate: '2025-05-20',
        paidDate: null,
        grade: 'Grade 9B',
        paymentMethod: null,
        invoiceNumber: 'INV-005',
      },
    ],
    []
  );

  // Calculate statistics
  const stats = useMemo(() => {
    const total = feeData.length;
    const paid = feeData.filter((f) => f.status === 'paid').length;
    const overdue = feeData.filter((f) => f.status === 'overdue').length;
    const partial = feeData.filter((f) => f.status === 'partial').length;
    const pending = feeData.filter((f) => f.status === 'pending').length;

    const totalAmount = feeData.reduce((sum, fee) => sum + fee.amount, 0);
    const collectedAmount = feeData.reduce((sum, fee) => sum + fee.paid, 0);
    const pendingAmount = feeData.reduce((sum, fee) => sum + fee.due, 0);

    const collectionRate =
      totalAmount > 0 ? (collectedAmount / totalAmount) * 100 : 0;

    return {
      total,
      paid,
      overdue,
      partial,
      pending,
      totalAmount,
      collectedAmount,
      pendingAmount,
      collectionRate,
    };
  }, [feeData]);

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    let filtered = feeData;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((fee) => fee.status === statusFilter);
    }

    return filtered;
  }, [feeData, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#43e97b';
      case 'overdue':
        return '#ff6b6b';
      case 'partial':
        return '#ffd93d';
      case 'pending':
        return '#4facfe';
      default:
        return '#667eea';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle />;
      case 'overdue':
        return <Warning />;
      case 'partial':
        return <Pending />;
      case 'pending':
        return <Schedule />;
      default:
        return <Payment />;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <Box>
      {/* Enhanced Header with Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Fees Management
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Track payments, manage invoices, and monitor fee collection
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel sx={{ color: 'white' }}>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                  sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                  }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
                  <MenuItem value="partial">Partial</MenuItem>
                </Select>
              </FormControl>

              <Stack direction="row" spacing={1}>
                <Tooltip title="Refresh Data">
                  <IconButton
                    sx={{
                      color: 'white',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.1)' },
                    }}
                  >
                    <Refresh />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download Report">
                  <IconButton
                    sx={{
                      color: 'white',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.1)' },
                    }}
                  >
                    <Download />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Payment">
                  <IconButton
                    sx={{
                      color: 'white',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.1)' },
                    }}
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Quick Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(67, 233, 123, 0.3)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      ${stats.collectedAmount}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Collected
                    </Typography>
                  </Box>
                  <CheckCircle sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.8, mt: 1, display: 'block' }}
                >
                  {stats.collectionRate.toFixed(1)}% collection rate
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      ${stats.pendingAmount}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Pending
                    </Typography>
                  </Box>
                  <Schedule sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.8, mt: 1, display: 'block' }}
                >
                  {stats.pending} pending payments
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(255, 154, 158, 0.3)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stats.overdue}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Overdue
                    </Typography>
                  </Box>
                  <Warning sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.8, mt: 1, display: 'block' }}
                >
                  Requires immediate attention
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(168, 237, 234, 0.3)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stats.total}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Students
                    </Typography>
                  </Box>
                  <Receipt sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.8, mt: 1, display: 'block' }}
                >
                  ${stats.totalAmount} total fees
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Main Content Area */}
      <Grid container spacing={3}>
        {/* Left Column - Actions and Analytics */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <QuickFeeActions />
          </motion.div>
        </Grid>

        {/* Right Column - Fee History and Details */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Fee Records
              </Typography>
              <EnhancedFeeHistory data={filteredData} />
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Main Content Area */}
      {/* Left Column - Actions and Analytics */}

      <Box>
        {/* Enhanced Header with Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            sx={{
              p: 3,
              my: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Fee Analytics
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>

      <Grid item xs={12} lg={4}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: '24px' }}
        >
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #e6e6e6 0%, #f8f9fa 100%)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            }}
          >
            <FeeAnalyticsChart data={feeData} />
          </Paper>
        </motion.div>
      </Grid>
    </Box>
  );
};

export default EnhancedFeeDashboard;
