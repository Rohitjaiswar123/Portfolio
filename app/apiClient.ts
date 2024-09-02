import axios from 'axios';

const API_BASE_URL = 'https://portfolio-backend-java.onrender.com'; // Replace with your Spring Boot API URL

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