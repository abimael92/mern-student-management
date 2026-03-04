import React, { useEffect, useState } from 'react';
import { Box, Typography, Select, MenuItem, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../services/api';
import DataTable from '../../components/common/DataTable';

const UserManagement = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const load = async (pageIndex, limit) => {
    const { data } = await api.get('/users', { params: { page: pageIndex + 1, limit } });
    if (Array.isArray(data)) {
      setRows(data);
      setTotal(data.length);
    } else {
      setRows(data.users || []);
      setTotal(data.total || 0);
    }
  };

  useEffect(() => {
    load(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleRoleChange = async (id, newRole) => {
    await api.patch(`/users/${id}/role`, { role: newRole });
    load(page, rowsPerPage);
  };

  const columns = [
    { field: 'username', headerName: 'Username' },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Role' }
  ];

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        User Management
      </Typography>
      <DataTable
        columns={[
          ...columns,
          {
            field: 'actions',
            headerName: 'Actions'
          }
        ]}
        rows={rows.map((u) => ({
          ...u,
          actions: (
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          )
        }))}
        page={page}
        rowsPerPage={rowsPerPage}
        total={total}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />
      <Box mt={2}>
        <Typography variant="body2">Change Role:</Typography>
        {rows.map((u) => (
          <Box key={u._id} display="flex" alignItems="center" gap={1} mt={1}>
            <Typography variant="body2" sx={{ width: 160 }}>
              {u.username}
            </Typography>
            <Select
              size="small"
              value={u.role}
              onChange={(e) => handleRoleChange(u._id, e.target.value)}
            >
              {['admin', 'director', 'teacher', 'student', 'nurse', 'secretary'].map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserManagement;

