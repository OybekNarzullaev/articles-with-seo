// lib/axios.ts

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://test.research-edu.uz"
    : "https://test.research-edu.uz";
import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/`, // Backend URL (productionda o'zgartiring, masalan, process.env.NEXT_PUBLIC_API_URL)
  timeout: 10000, // 10 sekund timeout
  headers: {
    "Content-Type": "application/json",
    // Agar auth kerak bo'lsa: 'Authorization': `Bearer ${token}`,
  },
});

// Request interceptor (masalan, loading start)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // console.log('Request started:', config.url);

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor (error handling)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
