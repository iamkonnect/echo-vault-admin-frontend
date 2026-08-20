import axios from 'axios';

const API_BASE = 'https://api.echovaultz.com/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Service with all endpoints
export const apiService = {
  // Auth
  loginAdmin: (email, password) => api.post('/auth/login-dashboard', { email, password }),
  loginArtist: (email, password) => api.post('/auth/login-artist', { email, password }),

  // Dashboard
  getDashboard: (type = 'admin') => {
    const endpoint = type === 'admin' ? '/admin/dashboard' : '/artist/dashboard';
    return api.get(endpoint);
  },

  // Users
  getAllUsers: () => api.get('/admin/users/api'),
  getUserDetail: (id) => api.get(`/admin/users/${id}`),

  // Artists
  getAllArtists: () => api.get('/admin/artists/api'),
  createArtist: (data) => api.post('/admin/artists/create', data),
  suspendArtist: (id) => api.post(`/admin/artists/${id}/suspend`),
  unsuspendArtist: (id) => api.post(`/admin/artists/${id}/unsuspend`),
  resendCredentials: (id) => api.post(`/admin/artists/${id}/resend-credentials`),

  // Music
  getAllMusic: () => api.get('/admin/music/api'),
  deleteMusic: (id) => api.delete(`/admin/music/${id}`),

  // Videos
  getAllVideos: () => api.get('/admin/videos/api'),
  deleteVideo: (id) => api.delete(`/admin/videos/${id}`),

  // Shorts
  getAllShorts: () => api.get('/admin/shorts/api'),
  deleteShort: (id) => api.delete(`/admin/shorts/${id}`),

  // Ads
  getAllAds: () => api.get('/admin/ads/api'),
  createAd: (data) => api.post('/admin/ads/create', data),
  deleteAd: (id) => api.delete(`/admin/ads/${id}`),

  // Sliders
  getAllSliders: () => api.get('/admin/sliders/api'),
  createSlider: (data) => api.post('/admin/sliders/create', data),
  deleteSlider: (id) => api.delete(`/admin/sliders/${id}`),

  // Gifts
  getAllGifts: () => api.get('/admin/gifts/api'),
  createGift: (data) => api.post('/admin/gifts/create', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteGift: (id) => api.delete(`/admin/gifts/${id}`),

  // Payouts
  getAllPayouts: () => api.get('/admin/payouts/api'),
  approveWithdrawal: (id) => api.post(`/admin/withdrawals/${id}/approve`),
  rejectWithdrawal: (id) => api.post(`/admin/withdrawals/${id}/reject`),

  // Reports
  getAllReports: () => api.get('/admin/reports/api'),
  resolveReport: (id) => api.post(`/admin/reports/${id}/resolve`),

  // Admin Users
  getAllAdmins: () => api.get('/admin/admins/api'),
  createAdmin: (data) => api.post('/admin/create-admin', data),
  deleteAdmin: (id) => api.delete(`/admin/admins/${id}`),

  // Artist Endpoints
  getArtistMusic: () => api.get('/artist/music'),
  uploadSong: (formData) => api.post('/artist/upload-song', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadVideo: (formData) => api.post('/artist/upload-video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadShorts: (formData) => api.post('/artist/upload-shorts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getArtistRevenue: () => api.get('/artist/revenue'),
  getArtistInsights: () => api.get('/artist/insights'),
};

export default apiService;
