import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const RoomList = ({ rooms = [], onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: '#1976d2' }}>
          <TableRow>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
              Name
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
              Capacity
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room, index) => (
            <TableRow
              key={room._id}
              sx={{
                backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#e0e0e0',
              }}
            >
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(room)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(room._id)}
                  color="secondary"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomList;
