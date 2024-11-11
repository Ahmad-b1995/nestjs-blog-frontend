import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Create a new axios instance
const axiosInstance: AxiosInstance = axios.create({
  // Set baseURL if needed
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Log the URL before sending the request
    console.log("axios request URL: ", config.url);
    return config;
  },
  (error: any) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    return response;
  },
  (error: any) => {
    // Handle response errors
    if (!axios.isCancel(error)) {
      // Log or handle the error
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
