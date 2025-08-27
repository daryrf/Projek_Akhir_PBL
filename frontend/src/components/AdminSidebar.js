// src/components/AdminSidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Kelola Pesan', path: '/admin/messages', icon: '💬' },
    { name: 'Kelola User', path: '/admin/users', icon: '👥' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 pt-20">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">🔐 Admin</h2>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;