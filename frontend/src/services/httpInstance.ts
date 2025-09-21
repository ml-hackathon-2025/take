import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, login } from "../auth/oidc";

const httpInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
});

// Request interceptor to add auth token
httpInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to get access token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
httpInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If we get a 401 and haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to get a fresh token
        const token = await getAccessToken();
        console.log("Token refreshed:", token);
        if (token) {
          // Update the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return httpInstance(originalRequest);
        } else {
          // No valid token available, redirect to login
          const currentPath = window.location.pathname + window.location.search + window.location.hash;
          login(currentPath);
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Token refresh failed, redirect to login
        const currentPath = window.location.pathname + window.location.search + window.location.hash;
        login(currentPath);
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default httpInstance;