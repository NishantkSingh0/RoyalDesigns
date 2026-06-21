import api from "./axios";

export const uploadFiles = (formData, onProgress) =>
  api.post("/files/upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: onProgress,
  });

export const listFiles = (params) => api.get("/files/", { params });
export const getFile = (id) => api.get(`/files/${id}/`);
export const deleteFile = (id) => api.delete(`/files/${id}/`);
