import api from '../api';

export const login = (email, password) =>
  api.post('/auth/login', { email, password });
export const initAdmin = () => api.post('/auth/init');
export const getMe = () => api.get('/auth/me');
