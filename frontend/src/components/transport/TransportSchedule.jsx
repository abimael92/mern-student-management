import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const TransportSchedule = ({ schedules }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Route</TableCell>
          <TableCell>Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {schedules.map((s, index) => (
          <TableRow key={index}>
            <TableCell>{s.route}</TableCell>
            <TableCell>{s.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransportSchedule;
