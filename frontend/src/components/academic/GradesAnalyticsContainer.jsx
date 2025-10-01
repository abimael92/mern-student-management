import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Tabs, Tab } from '@mui/material';

import GpaSummaryCards from '../../components/academic/GpaSummaryCards';
import GPAManager from '../../components/academic/GPAManager';
import SubjectsPerformanceOverview from '../../components/academic/SubjectsPerformanceOverview';
import SubjectsStatusView from '../../components/academic/SubjectsStatusView';
import GradeHistory from '../../components/academic/GradeHistory';

import { gradeHistory } from '../../utils/mock/AcademicsPage';

const AcademicsPage = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (e, newValue) => setTab(newValue);

  return (
    <Box sx={{ p: 4 }}>
      {/* === Page Header === */}
      <Typography variant="h4" gutterBottom>
        Academics Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'gray' }}>
        Academic performance insights for administrators. Includes GPA,
        performance charts, at-risk students, and export features.
      </Typography>

      {/* === Tabs Navigation === */}
      <Tabs
        value={tab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="GPA Summary" />
        <Tab label="Grades Table" />
        <Tab label="Performance Charts" />
        <Tab label="At-Risk Students" />
        <Tab label="Export Data" />
        <Tab label="Overview" />
      </Tabs>

      {/* === Tab Panels === */}
      <TabPanel value={tab} index={0}>
        <Section
          title="GPA Summary Cards"
          desc="High-level indicators of GPA and student progress."
        >
          <GpaSummaryCards />
        </Section>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Section
          title="Grades Table"
          desc="Filter, edit, and manage grade records."
        >
          <Paper sx={{ p: 2 }}>
            <GPAManager />
          </Paper>
        </Section>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Section
          title="Performance Charts"
          desc="Trends and subject performance comparisons."
        >
          <SubjectsPerformanceOverview />
        </Section>
      </TabPanel>

      <TabPanel value={tab} index={3}>
        <Section
          title="At-Risk Students"
          desc="Students with low GPA for intervention planning."
        >
          <Paper sx={{ p: 2, minHeight: 100 }}>
            At-Risk Students Placeholder
          </Paper>
        </Section>
      </TabPanel>

      <TabPanel value={tab} index={4}>
        <Section
          title="Export Data"
          desc="Download filtered data to PDF or Excel."
        >
          <Button variant="contained">Export as PDF</Button>
        </Section>
      </TabPanel>

      <TabPanel value={tab} index={5}>
        <Section title="Academics Overview">
          <Paper sx={{ p: 2, mt: 2 }}>
            <SubjectsStatusView />
          </Paper>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Grades</Typography>
            <GradeHistory history={gradeHistory} />
          </Paper>
        </Section>
      </TabPanel>
    </Box>
  );
};

/* === Small reusable wrapper for sections === */
const Section = ({ title, desc, children }) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="h6" sx={{ mb: 1 }}>
      {title}
    </Typography>
    {desc && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {desc}
      </Typography>
    )}
    {children}
  </Box>
);

/* === TabPanel Component === */
const TabPanel = ({ children, value, index }) => {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ mt: 3 }}>
      {value === index && children}
    </Box>
  );
};

export default AcademicsPage;
