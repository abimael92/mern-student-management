import api from './api';

export const fetchStudents = async (page = 0, limit = 10) => {
  const { data } = await api.get('/students', { params: { page: page + 1, limit } });
  return data;
};

export const uploadProfile = async (studentId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('studentId', studentId);
  const { data } = await api.post('/upload/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data.url;
};

