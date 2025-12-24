// src/api/axios.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4000", // json-server sur le port 4000
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
