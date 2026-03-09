/* eslint-disable no-useless-catch */
import api from './api';

export const login = async (usernameOrEmail, password, rememberMe = false) => {
  try {
    const response = await api.post('/auth/login', {
      usernameOrEmail,
      password,
      rememberMe: !!rememberMe
    });
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const registerPublic = async (data) => {
  try {
    // Add default role for public registration
    const registrationData = {
      ...data,
      role: 'student' // Default role
    };

    // Try the correct endpoint - change this to match your backend
    const response = await api.post('/auth/register', registrationData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token, password, confirmPassword) => {
  try {
    const response = await api.post('/auth/reset-password', {
      token,
      password,
      confirmPassword: confirmPassword || password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    await api.post('/auth/refresh');
  } catch (error) {
    throw error;
  }
};

export const getMySessions = async () => {
  try {
    const response = await api.get('/auth/sessions');
    return response.data.sessions;
  } catch (error) {
    throw error;
  }
};

export const revokeSession = async (tokenId) => {
  try {
    await api.delete(`/auth/sessions/${tokenId}`);
  } catch (error) {
    throw error;
  }
};