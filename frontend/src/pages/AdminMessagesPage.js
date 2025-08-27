import React, { useState, useEffect } from 'react';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('adminToken');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/messages', {
        headers: {
          'x-admin-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Gagal ambil data');

      const contentType = res.headers.get('content-type');
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];

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
        setMessages(messages.filter(m => m.id !== id));
        alert('Pesan dihapus');
      } else {
        const result = await res.json();
        alert(result.message || 'Gagal');
      }
    } catch (err) {
      alert('Gagal terhubung');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'admin123') {
      fetchMessages();
    } else {
      window.location.href = '/login'; // Jaga-jaga
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">📬 Daftar Pesan</h2>

      {loading ? (
        <p className="text-center py-8 text-gray-500">Memuat...</p>
      ) : error ? (
        <div className="py-8 text-center text-red-600">{error}</div>
      ) : messages.length === 0 ? (
        <p className="text-center py-8 text-gray-500">Belum ada pesan.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="pb-3 font-semibold">Nama</th>
                <th className="pb-3 font-semibold">Email</th>
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
  );
};

export default AdminMessagesPage;