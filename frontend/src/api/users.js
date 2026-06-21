import api from "./axios";

export const getMe = () => api.get("/users/me/");
export const updateMe = (data) => api.patch("/users/me/", data);
export const listUsers = (params) => api.get("/users/", { params });
export const createUser = (data) => api.post("/users/", data);
export const getUser = (id) => api.get(`/users/${id}/`);
export const updateUser = (id, data) => api.patch(`/users/${id}/`, data);
export const deleteUser = (id) => api.delete(`/users/${id}/`);
