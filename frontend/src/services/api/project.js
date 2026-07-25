import api from '../api';

export const getProjects = (type) =>
  api.get('/projects/', { params: type ? { project_type: type } : {} });
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects/', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
