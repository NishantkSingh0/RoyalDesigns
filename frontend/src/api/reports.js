import api from "./axios";

export const listReports = (params) => api.get("/reports/", { params });
export const submitReport = (data) => api.post("/reports/", data);
export const getReport = (id) => api.get(`/reports/${id}/`);
export const updateReport = (id, data) => api.patch(`/reports/${id}/`, data);
export const getAttendanceOverview = (month) => api.get("/attendance/", { params: { month } });
export const getAttendanceDetail = (userId, month) => api.get(`/attendance/${userId}/`, { params: { month } });
