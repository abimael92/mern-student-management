import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
import { registerPublic } from '../../services/authService';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);
    try {
      // Send data in the format expected by the backend
      await registerPublic({
        username,
        email,
        password,
        firstName,
        lastName,
        role,
      });

      setSuccess('Registration successful. You can now log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed');
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
        position: 'relative',
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          zIndex: 2,
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            minHeight: { xs: 64, sm: 72 },
            px: { xs: 2, sm: 4 },
          }}
        >
          <Typography
            component="button"
            variant="h5"
            onClick={() => navigate('/')}
            sx={{
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              letterSpacing: '0.5px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s',
              },
            }}
          >
            AcademiX
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.5)',
              borderWidth: '2px',
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: '25px',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                borderColor: '#fff',
                bgcolor: 'rgba(255,255,255,0.15)',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s',
              },
            }}
          >
            Log in
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 3 },
          pt: { xs: 8, sm: 10 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Paper
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            maxWidth: 500,
            width: '100%',
            borderRadius: { xs: 3, sm: 4 },
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow:
              '0 20px 60px rgba(0,0,0,0.3), 0 5px 15px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
            },
          }}
          elevation={0}
        >
          <Typography
            variant="h4"
            mb={1}
            fontWeight="800"
            sx={{
              color: '#4158D0',
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
              letterSpacing: '-0.5px',
            }}
          >
            Create account
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={4}
            sx={{ fontSize: '1rem' }}
          >
            Sign up to access the student portal
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                label="First Name"
                fullWidth
                size="small"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={loading}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#4158D0',
                    },
                  },
                }}
              />
              <TextField
                label="Last Name"
                fullWidth
                size="small"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={loading}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#4158D0',
                    },
                  },
                }}
              />
            </Box>

            <TextField
              label="Username"
              fullWidth
              size="small"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
              inputProps={{ minLength: 3 }}
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#4158D0',
                  },
                },
              }}
            />

            <TextField
              select
              label="Role"
              fullWidth
              size="small"
              margin="normal"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              required
              SelectProps={{ native: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#4158D0',
                  },
                },
              }}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="director">Director</option>
              <option value="nurse">Nurse</option>
              <option value="secretary">Secretary</option>
              <option value="admin">Admin</option>
            </TextField>

            <TextField
              label="Email"
              type="email"
              fullWidth
              size="small"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#4158D0',
                  },
                },
              }}
            />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mt: 2,
              }}
            >
              <TextField
                label="Password"
                type="password"
                fullWidth
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                helperText="8+ characters"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#4158D0',
                    },
                  },
                }}
              />
              <TextField
                label="Confirm"
                type="password"
                fullWidth
                size="small"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#4158D0',
                    },
                  },
                }}
              />
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mt: 3,
                  borderRadius: '12px',
                  '& .MuiAlert-icon': { alignItems: 'center' },
                }}
              >
                {error}
              </Alert>
            )}
            {success && (
              <Alert
                severity="success"
                sx={{
                  mt: 3,
                  borderRadius: '12px',
                  '& .MuiAlert-icon': { alignItems: 'center' },
                }}
              >
                {success}
              </Alert>
            )}

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.8,
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 8px 20px rgba(65,88,208,0.3)',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 12px 25px rgba(65,88,208,0.4)',
                },
                '&:disabled': {
                  background: 'rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s',
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Sign up'
              )}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 3, textAlign: 'center' }}
            >
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  fontWeight: 700,
                  color: '#4158D0',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#3649b3',
                  },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default RegisterPage;
