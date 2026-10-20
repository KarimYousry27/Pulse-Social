import { api } from './client';
export const authApi = {
  signin: (data) => api.post('/users/signin', data), signup: (data) => api.post('/users/signup', data),
  me: () => api.get('/users/profile-data'), changePassword: (data) => api.patch('/users/change-password', data),
  uploadPhoto: (photo) => { const form = new FormData(); form.append('photo', photo); return api.put('/users/upload-photo', form); },
};
export const usersApi = {
  profile: (id) => api.get(`/users/${id}/profile`), posts: (id) => api.get(`/users/${id}/posts`),
  follow: (id) => api.put(`/users/${id}/follow`), suggestions: () => api.get('/users/suggestions?limit=10'),
  bookmarks: () => api.get('/users/bookmarks'),
};
export const postsApi = {
  all: (page = 1) => api.get(`/posts?page=${page}&limit=10`),
  feed: (page = 1) => api.get(`/posts/feed?page=${page}&limit=10`),
  one: (id) => api.get(`/posts/${id}`),
  save: (data, id) => { const form = new FormData(); if (data.body) form.append('body', data.body); if (data.image) form.append('image', data.image); return id ? api.put(`/posts/${id}`, form) : api.post('/posts', form); },
  remove: (id) => api.delete(`/posts/${id}`), like: (id) => api.put(`/posts/${id}/like`),
  bookmark: (id) => api.put(`/posts/${id}/bookmark`), share: (id, body = '') => api.post(`/posts/${id}/share`, { body }),
  likes: (id) => api.get(`/posts/${id}/likes?page=1&limit=20`),
};
export const commentsApi = {
  all: (postId) => api.get(`/posts/${postId}/comments?page=1&limit=30`),
  replies: (postId, id) => api.get(`/posts/${postId}/comments/${id}/replies?page=1&limit=10`),
  save: (postId, data, id, parentId) => { const form = new FormData(); form.append('content', data.content); if (data.image) form.append('image', data.image); const base = `/posts/${postId}/comments`; return parentId ? api.post(`${base}/${parentId}/replies`, form) : id ? api.put(`${base}/${id}`, form) : api.post(base, form); },
  remove: (postId, id) => api.delete(`/posts/${postId}/comments/${id}`), like: (postId, id) => api.put(`/posts/${postId}/comments/${id}/like`),
};
export const notificationsApi = {
  all: () => api.get('/notifications?unread=false&page=1&limit=30'), count: () => api.get('/notifications/unread-count'),
  read: (id) => api.patch(`/notifications/${id}/read`), readAll: () => api.patch('/notifications/read-all'),
};
