import axios from 'axios';

const API_BASE = 'https://api.echovaultz.com/api';

const apiService = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Auto-add token
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ AUTH ENDPOINTS ============
export const loginAdmin = async (email, password) => {
  return apiService.post('/auth/login-dashboard', { email, password });
};

export const loginArtist = async (email, password) => {
  return apiService.post('/auth/login', { email, password });
};

export const logout = async () => {
  return apiService.post('/auth/logout');
};

// ============ ADMIN - DASHBOARD ============
export const getDashboard = async (userType) => {
  const endpoint = userType === 'admin' ? '/admin/dashboard' : '/artist/dashboard';
  return apiService.get(endpoint);
};

// ============ ADMIN - USER MANAGEMENT ============
export const getAllUsers = async () => {
  return apiService.get('/admin/users/api');
};

export const getUserDetail = async (userId) => {
  return apiService.get(`/admin/users/${userId}`);
};

// ============ ADMIN - ADMIN MANAGEMENT ============
export const getAllAdmins = async () => {
  return apiService.get('/admin/admins');
};

export const createAdmin = async (data) => {
  return apiService.post('/admin/create-admin', data);
};

export const deleteAdmin = async (adminId) => {
  return apiService.delete(`/admin/admins/${adminId}`);
};

// ============ ADMIN - ARTIST MANAGEMENT ============
export const getAllArtists = async () => {
  return apiService.get('/admin/artists/api');
};

export const createArtist = async (data) => {
  return apiService.post('/admin/artists/create', data);
};

export const suspendArtist = async (artistId) => {
  return apiService.post(`/admin/artists/${artistId}/suspend`);
};

export const unsuspendArtist = async (artistId) => {
  return apiService.post(`/admin/artists/${artistId}/unsuspend`);
};

export const resendArtistCredentials = async (artistId) => {
  return apiService.post(`/admin/artists/${artistId}/resend-credentials`);
};

// ============ ADMIN - ARTIST VERIFICATION ============
export const getUnverifiedArtists = async () => {
  return apiService.get('/admin/artist-verification/api');
};

export const verifyArtist = async (artistId) => {
  return apiService.post(`/admin/artist/${artistId}/verify`);
};

export const rejectArtist = async (artistId) => {
  return apiService.post(`/admin/artist/${artistId}/reject`);
};

// ============ ADMIN - GIFT MANAGEMENT ============
export const getAllGifts = async () => {
  return apiService.get('/admin/gifts/api');
};

export const createGift = async (formData) => {
  return apiService.post('/admin/gifts/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// ============ ADMIN - CONTENT MANAGEMENT ============
export const getAllMusic = async () => {
  return apiService.get('/tracks');
};

export const getMusicById = async (musicId) => {
  return apiService.get(`/tracks/${musicId}`);
};

export const getAllVideos = async () => {
  return apiService.get('/api/videos');
};

export const getAllShorts = async () => {
  return apiService.get('/shorts');
};

export const getAllAds = async () => {
  return apiService.get('/ads');
};

// ============ ADMIN - PAYOUTS ============
export const approvePayout = async (payoutId) => {
  return apiService.post(`/admin/payouts/${payoutId}/approve`);
};

export const rejectPayout = async (payoutId) => {
  return apiService.post(`/admin/payouts/${payoutId}/reject`);
};

export const platformWithdraw = async (data) => {
  return apiService.post('/admin/platform-withdraw', data);
};

// ============ ARTIST - DASHBOARD ============
export const getArtistDashboard = async () => {
  return apiService.get('/artist/dashboard');
};

// ============ ARTIST - MUSIC ============
export const getArtistMusic = async () => {
  return apiService.get('/artist/music');
};

export const uploadMusic = async (formData) => {
  return apiService.post('/tracks/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const editMusic = async (musicId, data) => {
  return apiService.put(`/artist/music/${musicId}`, data);
};

export const deleteMusic = async (musicId) => {
  return apiService.delete(`/artist/music/${musicId}`);
};

export const getMusicStats = async (musicId) => {
  return apiService.get(`/artist/music/${musicId}/stats`);
};

// ============ ARTIST - VIDEOS ============
export const uploadVideo = async (formData) => {
  return apiService.post('/api/videos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// ============ ARTIST - SHORTS ============
export const uploadShorts = async (formData) => {
  return apiService.post('/shorts/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// ============ ARTIST - ANALYTICS ============
export const getArtistInsights = async () => {
  return apiService.get('/artist/insights');
};

export const getArtistEarnings = async () => {
  return apiService.get('/artist/earnings');
};

export const getArtistWithdrawals = async () => {
  return apiService.get('/artist/withdrawals');
};

export const requestWithdrawal = async (amount) => {
  return apiService.post('/artist/withdraw', { amount });
};

export const getLiveInsights = async () => {
  return apiService.get('/artist/live-insights');
};

// ============ LIVE STREAMS ============
export const startLiveStream = async (data) => {
  return apiService.post('/artist/start-stream', data);
};

export const stopLiveStream = async (streamId) => {
  return apiService.post('/artist/stop-stream', { streamId });
};

// Default export as object (for backwards compatibility)
export default {
  // Auth
  loginAdmin,
  loginArtist,
  logout,
  getDashboard,

  // Admin Users
  getAllUsers,
  getUserDetail,
  getAllAdmins,
  createAdmin,
  deleteAdmin,

  // Admin Artists
  getAllArtists,
  createArtist,
  suspendArtist,
  unsuspendArtist,
  resendArtistCredentials,
  getUnverifiedArtists,
  verifyArtist,
  rejectArtist,

  // Admin Gifts
  getAllGifts,
  createGift,

  // Admin Content
  getAllMusic,
  getMusicById,
  getAllVideos,
  getAllShorts,
  getAllAds,

  // Admin Payouts
  approvePayout,
  rejectPayout,
  platformWithdraw,

  // Artist Dashboard
  getArtistDashboard,

  // Artist Music
  getArtistMusic,
  uploadMusic,
  editMusic,
  deleteMusic,
  getMusicStats,

  // Artist Videos
  uploadVideo,

  // Artist Shorts
  uploadShorts,

  // Artist Analytics
  getArtistInsights,
  getArtistEarnings,
  getArtistWithdrawals,
  requestWithdrawal,
  getLiveInsights,

  // Live Streams
  startLiveStream,
  stopLiveStream,
};
