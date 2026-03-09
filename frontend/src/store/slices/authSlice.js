import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi } from '../../services/authService';
import api from '../../services/api'; // You'll need to import api for getCurrentUser

// No more localStorage reading - cookies handle the token
const initialState = {
  user: null, // No user initially, will be loaded by getCurrentUser
  status: 'idle',
  error: null
};

// Login thunk (cookies + optional rememberMe are set by backend)
export const login = createAsyncThunk(
  'auth/login',
  async ({ usernameOrEmail, password, rememberMe }, { rejectWithValue }) => {
    try {
      const user = await loginApi(usernameOrEmail, password, rememberMe);
      return user;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

// Get current user thunk (call this on app load)
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to get user');
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      return null;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Optional: manual reset if needed
    resetAuth: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Just the user object
        // No localStorage set - token is in HTTP-only cookie
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Get current user cases
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.status = 'failed';
        state.user = null; // Clear user if can't get current user
      })

      // Logout cases (clear user even if request fails so UI reflects logged-out state)
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.status = 'idle';
      });
  }
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;