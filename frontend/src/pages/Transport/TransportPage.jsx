import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import TransportOverview from '../../components/transport/TransportOverview';
import TransportRouteList from '../../components/transport/TransportRouteList';
import TransportVehicleList from '../../components/transport/TransportVehicleList';
import DriverAssignment from '../../components/transport/DriverAssignment';
import TransportSchedule from '../../components/transport/TransportSchedule';
import {
  routes,
  vehicles,
  assignments,
  schedules,
} from '../../utils/mock/mockTransporData';

const TransportPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Transport Overview
      </Typography>

      <Paper sx={{ p: 2, mt: 2 }}>
        <TransportOverview />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Routes</Typography>
        <TransportRouteList routes={routes} />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Vehicles</Typography>
        <TransportVehicleList vehicles={vehicles} />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Driver Assignments</Typography>
        <DriverAssignment assignments={assignments} />
      </Paper>

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Schedule</Typography>
        <TransportSchedule schedules={schedules} />
      </Paper>
    </Box>
  );
};

export default TransportPage;
