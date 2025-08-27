// src/pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Cek login otomatis
  useEffect(() => {
    if (token === 'admin123') {
      fetchMessages();
    }
  }, [token]);

  // Ambil data dari backend
  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/messages', {
        method: 'GET',
        headers: {
          'x-admin-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Gagal ambil data');
        }

        // ✅ Cek apakah ada body
        const contentType = res.headers.get('content-type');
        let data = [];

        if (contentType && contentType.includes('application/json')) {
        const text = await res.text(); // Baca sebagai text dulu
        data = text ? JSON.parse(text) : []; // Jika kosong, anggap []
        }

        setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
        setError(err.message || 'Tidak bisa terhubung ke server. Cek backend.');
        setMessages([]);
    } finally {
        setLoading(false);
    }
    };

  // Hapus pesan
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin hapus pesan ini?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-token': token,
        },
      });

      if (res.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
        alert('Pesan berhasil dihapus');
      } else {
        const result = await res.json();
        alert(result.message || 'Gagal menghapus');
      }
    } catch (err) {
      alert('Gagal terhubung ke server');
    }
  };

  // Form login
  const handleLogin = (e) => {
    e.preventDefault();
    if (token === 'admin123') {
      localStorage.setItem('adminToken', token);
      fetchMessages();
    } else {
      setError('Token salah! Gunakan: admin123');
    }
  };

  // Logout
  const handleLogout = () => {
    setToken('');
    setMessages([]);
    setError('');
    localStorage.removeItem('adminToken');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🔐 Admin Panel</h1>
          <p className="text-gray-600">Kelola pesan kontak dari klien</p>
          <Link to="/" className="text-indigo-600 hover:underline text-sm">
            ← Kembali ke Website
          </Link>
        </div>

        {/* Login Form */}
        {!token || token !== 'admin123' ? (
          <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Masuk ke Admin</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2">Token Admin</label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="Masukkan token"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-70"
              >
                {loading ? 'Memuat...' : 'Masuk'}
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              💡 Token default: <code className="bg-gray-200 px-2 py-1 rounded">admin123</code>
            </p>
          </div>
        ) : (
          /* Daftar Pesan */
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">📬 Daftar Pesan</h2>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline text-sm font-medium"
              >
                Logout
              </button>
            </div>

            {loading ? (
              <p className="text-center py-8 text-gray-500">Memuat pesan dari server...</p>
            ) : error ? (
              <div className="py-8 text-center">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchMessages}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                >
                  Coba Lagi
                </button>
              </div>
            ) : messages.length === 0 ? (
              <p className="text-center py-8 text-gray-500">Belum ada pesan masuk.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 font-semibold text-gray-800">Nama</th>
                      <th className="pb-3 font-semibold text-gray-800">Email</th>
                      <th className="pb-3 font-semibold text-gray-800">Subjek</th>
                      <th className="pb-3 font-semibold text-gray-800">Pesan</th>
                      <th className="pb-3 font-semibold text-gray-800">Tanggal</th>
                      <th className="pb-3 font-semibold text-gray-800">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr key={msg.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-medium text-gray-800">{msg.name}</td>
                        <td className="text-gray-600">{msg.email}</td>
                        <td className="text-gray-600">{msg.subject || '–'}</td>
                        <td className="max-w-xs truncate text-gray-700" title={msg.message}>
                          {msg.message}
                        </td>
                        <td className="text-sm text-gray-500">
                          {new Date(msg.createdAt).toLocaleDateString('id-ID')}{' '}
                          {new Date(msg.createdAt).toLocaleTimeString('id-ID')}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(msg.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;