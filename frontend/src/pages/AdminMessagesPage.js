import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Komponen Modal yang benar-benar terpisah
const Modal = React.memo(({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

// Komponen Form terpisah untuk Add
const AddForm = React.memo(({ formData, onSubmit, onClose, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pesan
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={onChange}
          required
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Tambah
        </button>
      </div>
    </form>
  );
});

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const navigate = useNavigate();

  // Fungsi untuk mengambil data messages
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching messages...'); // Debug log
      
      const res = await fetch('http://localhost:5000/api/admin/messages', {
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
        let message = 'Gagal ambil data';
        try {
          const json = JSON.parse(errData);
          message = json.message || message;
        } catch (e) {
          // Jika bukan JSON, gunakan default message
        }
        throw new Error(message);
      }

      const data = await res.json();
      console.log('Data received:', data); // Debug log
      
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect untuk memanggil fetchMessages saat komponen dimount
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Yakin hapus pesan ini?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/messages/${id}`, {
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
        setMessages(prev => prev.filter(m => m.id !== id));
        alert('Pesan berhasil dihapus');
      } else {
        const result = await res.json().catch(() => ({ message: 'Gagal hapus pesan' }));
        alert(result.message || 'Gagal hapus pesan');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Gagal terhubung ke server');
    }
  }, []);

  const handleRetry = useCallback(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleAdd = useCallback(() => {
    setAddFormData({
      name: '',
      email: '',
      message: ''
    });
    setShowAddModal(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setShowAddModal(false);
    setAddFormData({
      name: '',
      email: '',
      message: ''
    });
  }, []);

  // Handler untuk Add Form
  const handleAddFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmitAdd = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:5000/api/admin/messages', {
        method: 'POST',
        headers: {
          'x-admin-token': 'admin123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addFormData)
      });

      if (res.ok) {
        const newMessage = await res.json();
        setMessages(prev => [newMessage, ...prev]);
        handleCloseAddModal();
        alert('Pesan berhasil ditambahkan');
        fetchMessages(); // Refresh data
      } else {
        const result = await res.json().catch(() => ({ message: 'Gagal tambah pesan' }));
        alert(result.message || 'Gagal tambah pesan');
      }
    } catch (err) {
      console.error('Add error:', err);
      alert('Gagal terhubung ke server');
    }
  }, [addFormData, handleCloseAddModal, fetchMessages]);

  // Memoize table rows untuk mencegah re-render yang tidak perlu
  const tableRows = useMemo(() => {
    return messages.map((msg) => (
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
    ));
  }, [messages, handleDelete]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">📬 Daftar Pesan</h2>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
        >
          <span>+</span> Tambah Pesan
        </button>
      </div>

      {loading ? (
        <p className="text-center py-8 text-gray-500">Memuat pesan...</p>
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
      ) : messages.length === 0 ? (
        <p className="text-center py-8 text-gray-500">Belum ada pesan masuk.</p>
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
              {tableRows}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      <Modal 
        show={showAddModal} 
        onClose={handleCloseAddModal}
        title="Tambah Pesan Baru"
      >
        <AddForm
          formData={addFormData}
          onSubmit={handleSubmitAdd}
          onClose={handleCloseAddModal}
          onChange={handleAddFormChange}
        />
      </Modal>
    </div>
  );
};

export default AdminMessagesPage;