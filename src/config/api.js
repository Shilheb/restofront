// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Articles/Food Items
  ARTICLES: `${API_BASE_URL}/articles`,
  ARTICLE_BY_ID: (id) => `${API_BASE_URL}/articles/${id}`,
  
  // Categories
  CATEGORIES: `${API_BASE_URL}/categories`,
  CATEGORY_BY_ID: (id) => `${API_BASE_URL}/categories/${id}`,
  
  // Authentication
  REGISTER: `${API_BASE_URL}/register`,
  LOGIN: `${API_BASE_URL}/login`,
  LOGOUT: `${API_BASE_URL}/logout`,
  USER: `${API_BASE_URL}/user`,
  
  // Payments
  CONFIRM_PAYMENT: `${API_BASE_URL}/confirm-payment`,

  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  USER_ORDERS: (userId) => `${API_BASE_URL}/orders/user/${userId}`,
  ORDER_STATUS: (orderId) => `${API_BASE_URL}/orders/${orderId}/status`,
  ORDER_STATS: `${API_BASE_URL}/orders/stats`,
};

export default API_BASE_URL;
