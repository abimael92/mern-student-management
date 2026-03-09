import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Link,
  AppBar,
  Toolbar,
} from '@mui/material';
import { login } from '../../store/slices/authSlice';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameOrEmail.trim() || !password.trim()) return;

    const action = await dispatch(login({ usernameOrEmail, password, rememberMe }));

    if (login.fulfilled.match(action)) {
      const user = action.payload;
      navigate(`/${user.role}`);
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
            onClick={() => navigate('/register')}
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.9)',
              fontWeight: 600,
              '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Sign up
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ color: 'primary.main' }}>
              Forgot password?
            </Link>
          </Box>

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

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/register" sx={{ fontWeight: 600 }}>
              Sign up
            </Link>
          </Typography>
        </form>
      </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage;
