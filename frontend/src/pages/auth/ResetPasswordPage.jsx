import React, { useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link,
  AppBar,
  Toolbar,
} from '@mui/material';
import { resetPassword } from '../../services/authService';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!token) {
      setError('Invalid reset link');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token, password, confirmPassword);
      setSuccess('Password reset successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <AppBar position="fixed" elevation={0} sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
          <Typography
            component="button"
            variant="h6"
            onClick={() => navigate('/')}
            sx={{
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              fontSize: '1.25rem',
            }}
          >
            AcademiX
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.9)',
              fontWeight: 600,
              '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Log in
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, pt: 10 }}>
      <Paper
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: 2,
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        }}
        elevation={8}
      >
        <Typography variant="h4" mb={3} fontWeight="bold" sx={{ color: 'primary.main' }}>
          Set new password
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your new password below.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="New password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            autoFocus
            helperText="At least 8 characters"
          />
          <TextField
            label="Confirm new password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, py: 1.5, position: 'relative' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', ml: -1.5 }} />
                <span style={{ opacity: 0 }}>Resetting...</span>
              </>
            ) : (
              'Reset password'
            )}
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" sx={{ fontWeight: 600 }}>
              Back to sign in
            </Link>
          </Typography>
        </form>
      </Paper>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
