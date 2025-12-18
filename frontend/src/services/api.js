import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Class API
export const classAPI = {
  getAllClasses: () => axios.get(`${API_URL}/classes`),
  getClassById: (id) => axios.get(`${API_URL}/classes/${id}`),
  createClass: (classData) => axios.post(`${API_URL}/classes`, classData),
  updateClass: (id, classData) => axios.put(`${API_URL}/classes/${id}`, classData),
  deleteClass: (id) => axios.delete(`${API_URL}/classes/${id}`)
};

// Enrollment API
export const enrollmentAPI = {
  getAllEnrollments: () => axios.get(`${API_URL}/enrollments`),
  getEnrollmentById: (id) => axios.get(`${API_URL}/enrollments/${id}`),
  createEnrollment: (enrollmentData) => axios.post(`${API_URL}/enrollments`, enrollmentData),
  updateEnrollment: (id, enrollmentData) => axios.put(`${API_URL}/enrollments/${id}`, enrollmentData),
  deleteEnrollment: (id) => axios.delete(`${API_URL}/enrollments/${id}`)
};
