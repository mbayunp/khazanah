// @ts-ignore
const viteApiUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_URL : undefined;

export const API_URL =
  viteApiUrl ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:5000';

export const API_ENDPOINTS = {
  programs: `${API_URL}/api/programs`,
  auth: `${API_URL}/api/auth`,
  uploads: `${API_URL}/uploads`,
  articles: `${API_URL}/api/articles`,
  jofisah: `${API_URL}/api/jofisah`,
  sholehah: `${API_URL}/api/sholehah`,
  ruang: `${API_URL}/api/ruang`,
  leaders: `${API_URL}/api/leaders`,
  speakers: `${API_URL}/api/speakers`,
  tasks: `${API_URL}/api/tasks`,
  members: `${API_URL}/api/members`,
  categories: `${API_URL}/api/categories`,
};
