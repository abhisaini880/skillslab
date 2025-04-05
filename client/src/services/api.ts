import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API URL from environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => {
        const { response } = error;

        // Handle authentication errors (401)
        if (response?.status === 401) {
            // Clear token if it exists (except for login endpoints)
            const isLoginRequest = response.config.url?.includes('login');
            if (!isLoginRequest && localStorage.getItem('token')) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }

        // Return standardized error message
        const errorMessage = response?.data?.detail || 'An unexpected error occurred';
        return Promise.reject(errorMessage);
    }
);

// Typed API helper methods
export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        axiosInstance.get<any, T>(url, config),

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        axiosInstance.post<any, T>(url, data, config),

    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        axiosInstance.put<any, T>(url, data, config),

    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        axiosInstance.patch<any, T>(url, data, config),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        axiosInstance.delete<any, T>(url, config),
};