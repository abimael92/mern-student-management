import api from './api';

export const login = async (usernameOrEmail, password) => {
  const { data } = await api.post('/auth/login', { usernameOrEmail, password });
  return { user: data.user, token: data.token };
};

