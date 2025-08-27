// AdminPage.js (Versi Diperbaiki)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  // Cek login saat halaman dimuat
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchMessages();
    }
  }, [token, navigate]);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/messages', {
        headers: {
          'x-admin-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errData = await res.text().catch(() => '');
        let message = 'Gagal ambil data';
        try {
          const json = JSON.parse(errData);
          message = json.message || message;
        } catch (e) {
          // Jika bukan JSON
        }
        throw new Error(message);
      }

      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus pesan ini?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token },
      });

      if (res.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
        alert('Pesan dihapus');
      } else {
        const result = await res.json().catch(() => ({}));
        alert(result.message || 'Gagal');
      }
    } catch (err) {
      alert('Gagal terhubung ke server');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!token) return null; // Akan redirect otomatis

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

        {/* Daftar Pesan */}
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
            <p className="text-center py-8 text-gray-500">Memuat pesan...</p>
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
                  <tr className="border-b">
                    <th className="pb-3 font-semibold">Nama</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Subjek</th>
                    <th className="pb-3 font-semibold">Pesan</th>
                    <th className="pb-3 font-semibold">Tanggal</th>
                    <th className="pb-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.subject || '–'}</td>
                      <td className="max-w-xs truncate" title={msg.message}>
                        {msg.message}
                      </td>
                      <td className="text-sm text-gray-600">
                        {new Date(msg.createdAt).toLocaleString('id-ID')}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="text-red-600 hover:underline text-sm"
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
      </div>
    </div>
  );
};

export default AdminPage;