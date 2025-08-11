// src/adminApi.js
import api from "./axios";

// Get user by ID (admin-only endpoint)
export const getUserById = async (userId) => {
  const res = await api.get(`/admin/users/${userId}`);
  return res.data;
};

// Update user by ID (admin-only endpoint)
// payload should match your backend UserCreate schema: { username, email, password }
export const updateUserById = async (userId, payload) => {
  const res = await api.put(`/admin/users/${userId}`, payload);
  return res.data;
};

// Delete user by ID (admin-only endpoint)
export const deleteUserById = async (userId) => {
  const res = await api.delete(`/admin/users/${userId}`);
  return res.data;
};

// Get claims by user id (admin-only endpoint)
export const getClaimsByUserId = async (userId) => {
  const res = await api.get(`/admin/users/${userId}/claims`);
  return res.data;
};
