import api from "./axios";

export const listMeetings = (params) => api.get("/meetings/", { params });
export const createMeeting = (data) => api.post("/meetings/", data);
export const getMeeting = (id) => api.get(`/meetings/${id}/`);
export const updateMeeting = (id, data) => api.patch(`/meetings/${id}/`, data);
