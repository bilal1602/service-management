import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { env } from '@/lib/config';

export const api = axios.create({
  baseURL: env.api.baseUrl,
  timeout: env.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Set the Authorization header globally for all axios requests.
 * Called automatically when Supabase refreshes the access token.
 */
export function setAuthorizationHeader(token: string | null): void {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
    delete api.defaults.headers.common['Authorization'];
  }
}

// Request interceptor - logging and request modifications
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (env.app.isDev) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          console.warn('Unauthorized request - token may be expired');
          break;
        case 403:
          console.warn('Forbidden - insufficient permissions');
          break;
        case 404:
          console.warn('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error(`Request failed with status ${status}`);
      }
    } else if (error.request) {
      console.error('Network error - no response received');
    } else {
      console.error('Request configuration error:', error.message);
    }

    return Promise.reject(error);
  }
);
