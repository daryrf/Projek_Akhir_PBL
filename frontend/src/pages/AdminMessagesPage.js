import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const navigate = useNavigate();

  // Fungsi untuk mengambil data messages
  const fetchMessages = async () => {
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
  };

  // useEffect untuk memanggil fetchMessages saat komponen dimount
  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
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
        setMessages(messages.filter(m => m.id !== id));
        alert('Pesan berhasil dihapus');
      } else {
        const result = await res.json().catch(() => ({ message: 'Gagal hapus pesan' }));
        alert(result.message || 'Gagal hapus pesan');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Gagal terhubung ke server');
    }
  };

  const handleRetry = () => {
    fetchMessages();
  };

  // Modal Component
  const Modal = ({ show, onClose, title, children }) => {
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
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setCurrentMessage(null);
    setShowAddModal(true);
  };

  const handleEdit = (message) => {
    setFormData({
      name: message.name,
      email: message.email,
      message: message.message
    });
    setCurrentMessage(message);
    setShowEditModal(true);
  };

  const handleCloseModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentMessage(null);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:5000/api/admin/messages', {
        method: 'POST',
        headers: {
          'x-admin-token': 'admin123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const newMessage = await res.json();
        setMessages([newMessage, ...messages]); // Tambah di awal array
        handleCloseModals();
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
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`http://localhost:5000/api/admin/messages/${currentMessage.id}`, {
        method: 'PUT',
        headers: {
          'x-admin-token': 'admin123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const updatedMessage = await res.json();
        setMessages(messages.map(msg => 
          msg.id === currentMessage.id ? updatedMessage : msg
        ));
        handleCloseModals();
        alert('Pesan berhasil diupdate');
      } else {
        const result = await res.json().catch(() => ({ message: 'Gagal update pesan' }));
        alert(result.message || 'Gagal update pesan');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Gagal terhubung ke server');
    }
  };

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
                      onClick={() => handleEdit(msg)}
                      className="text-blue-600 hover:underline text-sm mr-3"
                    >
                      Edit
                    </button>
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

      {/* Add Modal */}
      <Modal 
        show={showAddModal} 
        onClose={handleCloseModals}
        title="Tambah Pesan Baru"
      >
        <form onSubmit={handleSubmitAdd}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
              onChange={handleFormChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCloseModals}
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
      </Modal>

      {/* Edit Modal */}
      <Modal 
        show={showEditModal} 
        onClose={handleCloseModals}
        title="Edit Pesan"
      >
        <form onSubmit={handleSubmitEdit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
              onChange={handleFormChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCloseModals}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminMessagesPage;