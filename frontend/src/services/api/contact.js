import api from '../api';

export const sendMessage = (data) => api.post('/contact/', data);
export const getMessages = () => api.get('/contact/');
export const markAsRead = (id) => api.put(`/contact/${id}/read`);
export const deleteMessage = (id) => api.delete(`/contact/${id}`);