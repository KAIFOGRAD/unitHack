import axios from './axios';

const API_URL = '/api/v1/auth';

export const authApi = {
  register: async (data: { email: string; username: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, data);
      return response.data;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'isAxiosError' in error) {
        const axiosError = error as {
          isAxiosError: boolean;
          response?: {
            status: number;
            data: { message?: string };
          };
        };

        if (axiosError.isAxiosError && axiosError.response) {
          throw {
            status: axiosError.response.status,
            message: axiosError.response.data?.message || 'Ошибка регистрации. Пожалуйста, попробуйте еще раз.'
          };
        }
      }

      throw {
        status: 500,
        message: 'Произошла неожиданная ошибка. Пожалуйста, попробуйте еще раз.'
      };
    }
  },
  login: async (credentials: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, credentials);
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      }
      return response.data;
    } catch (error) {
      console.error('Login error:');
      throw error;
    }
  },

  verifyEmail: async (data: { email: string; code: string }) => {
    try {
      const response = await axios.post(`${API_URL}/verify`, data);
      return response.data;
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'isAxiosError' in error) {
        const axiosError = error as {
          isAxiosError: boolean;
          response?: {
            status: number;
            data: { message?: string };
          };
        };

        if (axiosError.isAxiosError && axiosError.response) {
          throw {
            status: axiosError.response.status,
            message: axiosError.response.data?.message || 'Ошибка верификации email. Пожалуйста, проверьте код.'
          };
        }
      }

      throw {
        status: 500,
        message: 'Произошла неожиданная ошибка при верификации email.'
      };
    }
  },

  resendCode: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/resend-code`, { email });
      return response.data;
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'isAxiosError' in error) {
        const axiosError = error as {
          isAxiosError: boolean;
          response?: {
            status: number;
            data: { message?: string };
          };
        };

        if (axiosError.isAxiosError && axiosError.response) {
          throw {
            status: axiosError.response.status,
            message: axiosError.response.data?.message || 'Ошибка при отправке кода. Пожалуйста, попробуйте еще раз.'
          };
        }
      }

      throw {
        status: 500,
        message: 'Произошла неожиданная ошибка при отправке кода.'
      };
    }
  }
};
