import api from "./axios";

export const login = (data) => api.post("/auth/login/", data);
export const logout = () => api.post("/auth/logout/");
export const changePassword = (data) => api.post("/auth/password-change/", data);
export const requestPasswordReset = (email) => api.post("/auth/password-reset/", { email });
export const confirmPasswordReset = (data) => api.post("/auth/password-reset/confirm/", data);
