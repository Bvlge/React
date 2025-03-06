import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor de REQUISIÇÃO:
 *  - Anexa o token de autenticação em todas as requisições,
 *    exceto se a rota for /users/token/ (onde ainda não temos token ou estamos buscando um novo).
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    },

    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default api;
