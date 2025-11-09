// src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Ensure content-type is correct
  // If data is a plain object, set JSON content-type.
  // If it's FormData (file upload), let the browser set the multipart boundary.
  if (config.data && !(config.data instanceof FormData) && typeof config.data === "object") {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const getMe = () => API.get("/me");
export const updateProfile = (data) => API.patch("/me", data);