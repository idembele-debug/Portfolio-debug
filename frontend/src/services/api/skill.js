import api from '../api';

export const getSkills = (category) =>
  api.get('/skills/', { params: category ? { category } : {} });
export const createSkill = (data) => api.post('/skills/', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);