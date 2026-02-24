import axios from "axios";

const API = axios.create({
  baseURL: "https://product-analysis-dashboard-1.onrender.com/api",
  withCredentials: true
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;