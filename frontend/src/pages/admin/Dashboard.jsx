import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, students: 0, teachers: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [usersRes, studentsRes, teachersRes] = await Promise.all([
          api.get('/users', { params: { page: 1, limit: 1 } }),
          api.get('/students', { params: { page: 1, limit: 1 } }),
          api.get('/teachers', { params: { page: 1, limit: 1 } })
        ]);
        setStats({
          users: usersRes.data.total || usersRes.data.length || 0,
          students: studentsRes.data.total || studentsRes.data.length || 0,
          teachers: teachersRes.data.total || teachersRes.data.length || 0
        });
      } catch {
        setStats({ users: 0, students: 0, teachers: 0 });
      }
    };
    load();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h4">{stats.users}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Students</Typography>
          <Typography variant="h4">{stats.students}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Teachers</Typography>
          <Typography variant="h4">{stats.teachers}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;

