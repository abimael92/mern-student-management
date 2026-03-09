import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { forgotPassword } from '../../services/authService';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email.trim()) return;
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      setMessage(data.message || 'If an account exists with that email, a reset link has been sent.');
      if (data.resetToken && import.meta.env.DEV) {
        setMessage(
          (m) =>
            `${m} Use this token in dev: ${data.resetToken}. Go to /reset-password/YOUR_TOKEN`
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
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
          Forgot password
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your email and we&apos;ll send you a link to reset your password.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            autoFocus
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="info" sx={{ mt: 2 }}>
              {message}
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
                <span style={{ opacity: 0 }}>Sending...</span>
              </>
            ) : (
              'Send reset link'
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

export default ForgotPasswordPage;
