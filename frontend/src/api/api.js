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


export const adminAPI = {
  // Dashboard
  getDashboardStats: () =>
    api.get('/admin/dashboard/stats'),


  getAllReports: (filters = {}) => {
    const params = new URLSearchParams({
      sortBy: 'createdAt',
      sortOrder: 'desc',
      ...filters
    }).toString();
    return api.get(`/admin/reports?${params}`);
  
  },

  getReportDetails: (reportId) =>
    api.get(`/admin/reports/${reportId}`),

  updateReportStatus: (reportId, status, note) =>
    api.patch(`/admin/reports/${reportId}/status`, { status, note }),

  assignReport: (reportId, assignedTo, note) =>
    api.patch(`/admin/reports/${reportId}/assign`, { assignedTo, note }),

  deleteReport: (reportId) =>
    api.delete(`/admin/reports/${reportId}`),

 
  getAnalytics: () =>
    api.get('/admin/analytics'),

  getAllUsers: () =>
    api.get('/admin/users'),

  toggleUserStatus: (userId, isActive) =>
    api.patch(`/admin/users/${userId}/status`, { isActive }),
};

export default api;