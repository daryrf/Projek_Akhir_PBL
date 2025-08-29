// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  const token = localStorage.getItem('adminToken');
  const userStr = localStorage.getItem('adminUser');

  // Cek token dan user
  if (!token || !userStr) {
    return <Navigate to="/admin/login" replace />;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(userStr);
  } catch (e) {
    // Jika data user rusak, logout
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    return <Navigate to="/admin/login" replace />;
  }

  // Cek role (opsional, jika backend kirim role)
  if (requiredRole === 'admin' && parsedUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;