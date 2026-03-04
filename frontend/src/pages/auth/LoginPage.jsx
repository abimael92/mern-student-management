import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { login } from '../../store/slices/authSlice';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!usernameOrEmail.trim() || !password.trim()) {
      return;
    }

    const action = await dispatch(login({ usernameOrEmail, password }));

    if (login.fulfilled.match(action)) {
      // action.payload is the user object directly from authService
      const user = action.payload;
      console.log('Login successful:', user); // For debugging

      // Navigate based on user role
      const role = user.role;
      navigate(`/${role}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}
    >
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
        <Typography
          variant="h4"
          mb={3}
          fontWeight="bold"
          sx={{ color: 'primary.main' }}
        >
          Welcome Back
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Sign in to access your dashboard
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username or Email"
            fullWidth
            margin="normal"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            disabled={status === 'loading'}
            required
            autoFocus
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === 'loading'}
            required
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              position: 'relative',
            }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <CircularProgress
                  size={24}
                  sx={{ position: 'absolute', left: '50%', ml: -1.5 }}
                />
                <span style={{ opacity: 0 }}>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          {/* Optional: Add test credentials hint for development */}
          {process.env.NODE_ENV === 'development' && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Test Credentials:
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                director@school.edu / Director@2024Secure!
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                admin@school.edu / Admin@2024Secure!
              </Typography>
            </Box>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
