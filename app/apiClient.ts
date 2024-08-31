import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Replace with your Spring Boot API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitContactForm = async (formData: any) => {
  try {
    const response = await apiClient.post('/submit-contact-form', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;