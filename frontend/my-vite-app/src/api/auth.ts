import axios from './axios';

const API_URL = '/api/v1/auth';

interface RegisterData {
  email: string;
  login: string;
  password: string;
}

interface VerifyData {
  email: string;
  code: string;
}

export const authApi = {
  register: async (data: RegisterData) => {
    const response = await axios.post(`${API_URL}/signup`, {
      username: data.login,
      email: data.email,
      password: data.password,
      role: 'user'
    });
    return response.data;
  },

  verifyEmail: async (data: VerifyData) => {
    const response = await axios.post(`${API_URL}/verify`, data);
    return response.data;
  },

  resendCode: async (email: string) => {
    const response = await axios.post(`${API_URL}/resend-code`, { email });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    return response.data;
  }
};