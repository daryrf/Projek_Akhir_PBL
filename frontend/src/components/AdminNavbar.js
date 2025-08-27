// src/components/AdminNavbar.js
import React from 'react';

const AdminNavbar = ({ onLogout }) => {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 border-b">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
        <button
          onClick={onLogout}
          className="text-red-600 hover:text-red-800 font-medium text-sm px-4 py-2 rounded hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;