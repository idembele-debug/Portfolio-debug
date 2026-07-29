import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Profile
export const getProfile = () => api.get('/profile/');
export const updateProfile = (data) => api.put('/profile/', data);

// Skills
export const getSkills = () => api.get('/skills/');
export const createSkill = (data) => api.post('/skills/', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// Projects
export const getProjects = (type) =>
  api.get('/projects/', { params: type ? { project_type: type } : {} });
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects/', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Contact
export const sendMessage = (data) => api.post('/contact/', data);
export const getMessages = () => api.get('/contact/');
export const markAsRead = (id) => api.put(`/contact/${id}/read`);
export const deleteMessage = (id) => api.delete(`/contact/${id}`);

// Histoire
export const getChapters = () => api.get('/histoire/');
export const createChapter = (data) => api.post('/histoire/', data);
export const updateChapter = (id, data) => api.put(`/histoire/${id}`, data);
export const deleteChapter = (id) => api.delete(`/histoire/${id}`);

// Auth
export const login = (email, password) =>
  api.post('/auth/login', { email, password });
export const initAdmin = () => api.post('/auth/init');
export const getMe = () => api.get('/auth/me');

export default api;