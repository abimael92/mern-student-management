import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const TransportVehicleList = ({ vehicles }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Vehicle ID</TableCell>
          <TableCell>Number</TableCell>
          <TableCell>Capacity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vehicles.map((v) => (
          <TableRow key={v.id}>
            <TableCell>{v.id}</TableCell>
            <TableCell>{v.number}</TableCell>
            <TableCell>{v.capacity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransportVehicleList;
