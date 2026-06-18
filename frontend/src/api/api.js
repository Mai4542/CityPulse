import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    const isRegisterRequest = error.config?.url?.includes('/auth/register');
    const isMeRequest = error.config?.url?.includes('/auth/me');

    if (error.response?.status === 401 && !isLoginRequest && !isRegisterRequest && !isMeRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (userData) =>
    api.post('/auth/register', userData),

  getMe: () =>
    api.get('/auth/me'),

  logout: () =>
    api.post('/auth/logout'),
};

export const reportAPI = {
  createReport: (formDataToSend) =>
    api.post('/reports', formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  getMyReports: () =>
    api.get('/reports/my-reports'),

  getReportById: (id) =>
    api.get(`/reports/${id}`),
};

export default api;