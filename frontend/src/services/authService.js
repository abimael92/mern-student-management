/* eslint-disable no-useless-catch */
import api from './api';

export const login = async (usernameOrEmail, password) => {
  try {
    const response = await api.post('/auth/login', {
      usernameOrEmail,
      password
    });
    // Response should contain only user data, no token
    return response.data.user;
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