import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = ({ children, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Konten Utama */}
      <div className="ml-64">
        {/* Navbar */}
        <AdminNavbar onLogout={onLogout} />

        {/* Main Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;