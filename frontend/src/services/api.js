import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost/phorladen/backend/index.php";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Auth
export const login = (data) => api.post("/login", data);
export const logout = () => api.post("/logout");
export const getMe = () => api.get("/me");

// Services
export const getServices = () => api.get("/services");
export const getService = (slug) => api.get(`/services/${slug}`);
export const updateService = (id, data) => api.put(`/services/${id}`, data);

// Bookings
export const createBooking = (data) => api.post("/bookings", data);
export const getBookings = () => api.get("/bookings");
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

export default api;
