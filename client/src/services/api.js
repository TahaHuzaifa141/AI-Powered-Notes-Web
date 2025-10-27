import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // 30 seconds timeout for AI operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    
    // Handle common error responses
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    }
    
    return Promise.reject(error);
  }
);

// Notes API endpoints
export const notesApi = {
  // Get all notes
  getAllNotes: () => api.get('/notes'),
  
  // Get note by ID
  getNoteById: (id) => api.get(`/notes/${id}`),
  
  // Create new note
  createNote: (noteData) => api.post('/notes', noteData),
  
  // Update note
  updateNote: (id, noteData) => api.put(`/notes/${id}`, noteData),
  
  // Delete note
  deleteNote: (id) => api.delete(`/notes/${id}`),
  
  // Search notes
  searchNotes: (query) => api.get(`/notes/search?q=${encodeURIComponent(query)}`),
  
  // Get notes by tag
  getNotesByTag: (tag) => api.get(`/notes/tag/${encodeURIComponent(tag)}`),
  
  // Get notes by category
  getNotesByCategory: (category) => api.get(`/notes/category/${encodeURIComponent(category)}`),
  
  // Summarize note
  summarizeNote: (id, options = {}) => api.post(`/ai/summarize-note/${id}`, options),
};

// AI API endpoints
export const aiApi = {
  // Summarize text
  summarizeText: (data) => api.post('/ai/summarize', data),
  
  // Summarize note by ID
  summarizeNote: (id, options = {}) => api.post(`/ai/summarize-note/${id}`, options),
  
  // Generate tags for text
  generateTags: (data) => api.post('/ai/generate-tags', data),
  
  // Get AI usage statistics
  getStats: () => api.get('/ai/stats'),
};

// Utility functions
export const apiUtils = {
  // Handle API errors consistently
  handleError: (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 'An error occurred';
      const status = error.response.status;
      
      console.error(`API Error ${status}:`, message);
      return {
        message,
        status,
        data: error.response.data,
      };
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
        data: null,
      };
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1,
        data: null,
      };
    }
  },
  
  // Format API response consistently
  formatResponse: (response) => {
    return {
      success: true,
      data: response.data,
      status: response.status,
      message: response.data?.message || 'Success',
    };
  },
  
  // Check if API is healthy
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: apiUtils.handleError(error),
      };
    }
  },
};

// Export default api instance
export default api;