import api from '../api';

export const getChapters = () => api.get('/histoire/');
export const createChapter = (data) => api.post('/histoire/', data);
export const updateChapter = (id, data) => api.put(`/histoire/${id}`, data);
export const deleteChapter = (id) => api.delete(`/histoire/${id}`);