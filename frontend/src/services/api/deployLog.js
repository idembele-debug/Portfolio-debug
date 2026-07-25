import api from '../api';

export const getDeployLogs = () => api.get('/deploy-logs/');
export const createDeployLog = (data) => api.post('/deploy-logs/', data);
export const deleteDeployLog = (id) => api.delete(`/deploy-logs/${id}`);