import React, { useState, useEffect } from 'react';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fungsi untuk mengambil data users
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching users...'); // Debug log
      
      const res = await fetch('http://localhost:5000/api/admin/users', {
        method: 'GET',
        headers: {
          'x-admin-token': 'admin123', // Token sesuai dengan backend
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', res.status); // Debug log

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Token tidak valid atau expired');
        }
        
        const errData = await res.text().catch(() => '');
        let message = 'Gagal ambil data users';
        try {
          const json = JSON.parse(errData);
          message = json.message || message;
        } catch (e) {
          // Jika bukan JSON, gunakan default message
        }
        throw new Error(message);
      }

      const data = await res.json();
      console.log('Users data received:', data); // Debug log
      
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch users error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect untuk memanggil fetchUsers saat komponen dimount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus pengguna ini?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 
          'x-admin-token': 'admin123', // Token sesuai dengan backend
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 401) {
        alert('Token tidak valid. Silakan login ulang.');
        return;
      }

      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
        alert('Pengguna berhasil dihapus');
      } else {
        const result = await res.json().catch(() => ({ message: 'Gagal hapus pengguna' }));
        alert(result.message || 'Gagal hapus pengguna');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Gagal terhubung ke server');
    }
  };

  const handleRetry = () => {
    fetchUsers();
  };

  const formatRole = (role) => {
    return role === 'admin' ? 'Admin' : 'User';
  };

  const getRoleBadgeClass = (role) => {
    return role === 'admin'
      ? 'bg-red-100 text-red-800'
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">👥 Daftar Pengguna</h2>
      </div>

      {loading ? (
        <p className="text-center py-8 text-gray-500">Memuat pengguna...</p>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={handleRetry}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>
      ) : users.length === 0 ? (
        <p className="text-center py-8 text-gray-500">Belum ada pengguna terdaftar.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="pb-3 font-semibold">ID</th>
                <th className="pb-3 font-semibold">Nama</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Tanggal Dibuat</th>
                <th className="pb-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{user.id}</td>
                  <td className="py-3 font-medium">{user.name || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                      {formatRole(user.role)}
                    </span>
                  </td>
                  <td className="text-sm text-gray-600">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleString('id-ID')
                      : 'N/A'
                    }
                  </td>
                  <td>
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Hapus
                      </button>
                    )}
                    {user.role === 'admin' && (
                      <span className="text-gray-400 text-sm">Protected</span>
                    )}
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

export default AdminUsersPage;