import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor for token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getClasses = () => api.get('/classes');
export const getClass = (id) => api.get(`/classes/${id}`);
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);

// Enrollment APIs
export const createEnrollment = (enrollmentData) => api.post('/enrollments', enrollmentData);
export const getUserEnrollments = () => api.get('/enrollments/my-enrollments');
export const getAllEnrollments = () => api.get('/enrollments/all');
export const updateEnrollmentStatus = (id, status) => api.put(`/enrollments/${id}`, { status });

// Payment APIs
export const getUserPayments = () => api.get('/payments/my-payments');
export const getAllPayments = () => api.get('/payments/all');
export const verifyPayment = (id, status) => api.put(`/payments/${id}/verify`, { status });

// Class Admin APIs
export const createClass = (classData) => api.post('/classes', classData);
export const updateClass = (id, classData) => api.put(`/classes/${id}`, classData);
export const deleteClass = (id) => api.delete(`/classes/${id}`);
// Admin Stats
export const getAdminStats = () => api.get('/admin/stats');

// Feedback APIs
export const createFeedback = (feedbackData) => api.post('/feedback', feedbackData);
export const getUserFeedback = () => api.get('/feedback/my-feedback');
export const getAllFeedback = () => api.get('/feedback/all');
export const updateFeedbackStatus = (id, status) => api.put(`/feedback/${id}`, { status });
export const deleteFeedback = (id) => api.delete(`/feedback/${id}`);

// Contact APIs
export const createContact = (contactData) => api.post('/contact', contactData);
export const getAllContacts = () => api.get('/contact/all');
export const updateContactStatus = (id, data) => api.put(`/contact/${id}`, data);
export const deleteContact = (id) => api.delete(`/contact/${id}`);

export default api;
