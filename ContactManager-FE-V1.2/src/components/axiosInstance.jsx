import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include token from sessionStorage
axiosInstance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("jwtToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default axiosInstance;
