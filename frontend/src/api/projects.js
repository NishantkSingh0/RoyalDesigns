import api from "./axios";

export const listProjects = (params) => api.get("/projects/", { params });
export const createProject = (data) => api.post("/projects/", data);
export const getProject = (id) => api.get(`/projects/${id}/`);
export const updateProject = (id, data) => api.patch(`/projects/${id}/`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}/`);
export const addProjectMembers = (id, user_ids) => api.post(`/projects/${id}/add_members/`, { user_ids });
export const removeProjectMember = (id, uid) => api.delete(`/projects/${id}/members/${uid}/`);
export const getProjectProgress = (id) => api.get(`/projects/${id}/progress/`);
export const submitProgressUpdate = (id, data) => api.post(`/projects/${id}/progress/`, data);
