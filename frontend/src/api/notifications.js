import api from "./axios";

export const listNotifications = () => api.get("/notifications/");
export const markRead = (id) => api.patch(`/notifications/${id}/read/`);
export const markAllRead = () => api.post("/notifications/read-all/");
