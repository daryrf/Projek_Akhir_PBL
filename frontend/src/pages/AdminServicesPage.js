import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Komponen Modal yang benar-benar terpisah
const Modal = React.memo(({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
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

// Komponen Form untuk Add Service
const AddServiceForm = React.memo(({ formData, onSubmit, onClose, onChange }) => {
  const iconOptions = [
    '🎨', '💻', '📱', '📈', '🎬', '📊', '🖥️', '⚡', '🎯', '🔧', 
    '📷', '✏️', '🌐', '📢', '🎵', '📋', '🔍', '💡', '🚀', '⭐'
  ];

  const colorOptions = [
    { name: 'Pink to Rose', value: 'from-pink-500 to-rose-600' },
    { name: 'Indigo to Purple', value: 'from-indigo-500 to-purple-600' },
    { name: 'Blue to Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Emerald to Teal', value: 'from-emerald-500 to-teal-600' },
    { name: 'Amber to Orange', value: 'from-amber-500 to-orange-600' },
    { name: 'Violet to Fuchsia', value: 'from-violet-500 to-fuchsia-600' },
    { name: 'Red to Pink', value: 'from-red-500 to-pink-600' },
    { name: 'Green to Blue', value: 'from-green-500 to-blue-600' },
    { name: 'Yellow to Red', value: 'from-yellow-500 to-red-600' },
    { name: 'Purple to Pink', value: 'from-purple-500 to-pink-600' }
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judul Layanan *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: Web Development"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Icon
          </label>
          <select
            name="icon"
            value={formData.icon}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Icon</option>
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>
                {icon} {icon}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Jelaskan layanan ini secara detail..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Kategori</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Consulting">Consulting</option>
            <option value="Production">Production</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Harga (Rp)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durasi (hari)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={onChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warna Gradient
          </label>
          <select
            name="color"
            value={formData.color}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Warna</option>
            {colorOptions.map((color) => (
              <option key={color.value} value={color.value}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) => onChange({
              target: { name: 'isActive', value: e.target.checked }
            })}
            className="rounded"
          />
          <span className="text-sm text-gray-700">Aktif (tampilkan di website)</span>
        </label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
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
          Tambah Layanan
        </button>
      </div>
    </form>
  );
});

// Komponen Form untuk Edit Service (sama dengan Add, hanya button text yang beda)
const EditServiceForm = React.memo(({ formData, onSubmit, onClose, onChange }) => {
  const iconOptions = [
    '🎨', '💻', '📱', '📈', '🎬', '📊', '🖥️', '⚡', '🎯', '🔧', 
    '📷', '✏️', '🌐', '📢', '🎵', '📋', '🔍', '💡', '🚀', '⭐'
  ];

  const colorOptions = [
    { name: 'Pink to Rose', value: 'from-pink-500 to-rose-600' },
    { name: 'Indigo to Purple', value: 'from-indigo-500 to-purple-600' },
    { name: 'Blue to Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Emerald to Teal', value: 'from-emerald-500 to-teal-600' },
    { name: 'Amber to Orange', value: 'from-amber-500 to-orange-600' },
    { name: 'Violet to Fuchsia', value: 'from-violet-500 to-fuchsia-600' },
    { name: 'Red to Pink', value: 'from-red-500 to-pink-600' },
    { name: 'Green to Blue', value: 'from-green-500 to-blue-600' },
    { name: 'Yellow to Red', value: 'from-yellow-500 to-red-600' },
    { name: 'Purple to Pink', value: 'from-purple-500 to-pink-600' }
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judul Layanan *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: Web Development"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Icon
          </label>
          <select
            name="icon"
            value={formData.icon}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Icon</option>
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>
                {icon} {icon}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Jelaskan layanan ini secara detail..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Kategori</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Consulting">Consulting</option>
            <option value="Production">Production</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Harga (Rp)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durasi (hari)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={onChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warna Gradient
          </label>
          <select
            name="color"
            value={formData.color}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Warna</option>
            {colorOptions.map((color) => (
              <option key={color.value} value={color.value}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) => onChange({
              target: { name: 'isActive', value: e.target.checked }
            })}
            className="rounded"
          />
          <span className="text-sm text-gray-700">Aktif (tampilkan di website)</span>
        </label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Layanan
        </button>
      </div>
    </form>
  );
});

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [addFormData, setAddFormData] = useState({
    title: '',
    description: '',
    icon: '',
    category: '',
    price: '',
    duration: '',
    color: '',
    isActive: true
  });

  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    icon: '',
    category: '',
    price: '',
    duration: '',
    color: '',
    isActive: true
  });

  const navigate = useNavigate();

  // Fungsi untuk mengambil data services
  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching services...');
      
      const res = await fetch('http://localhost:5000/api/admin/services', {
        method: 'GET',
        headers: {
          'x-admin-token': 'admin123',
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', res.status);

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
      console.log('Data received:', data);
      
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      
      // Mock data untuk development/testing
      setServices([
        {
          id: 1,
          title: 'Brand Identity',
          description: 'Complete brand development including logo design, visual identity, and brand guidelines that make your business memorable.',
          icon: '🎨',
          category: 'Design',
          price: 5000000,
          duration: 14,
          color: 'from-pink-500 to-rose-600',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Web Development',
          description: 'Custom websites and web applications built with cutting-edge technology for optimal performance and user experience.',
          icon: '💻',
          category: 'Development',
          price: 15000000,
          duration: 30,
          color: 'from-indigo-500 to-purple-600',
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Yakin hapus layanan ini?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 
          'x-admin-token': 'admin123',
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 401) {
        alert('Token tidak valid. Silakan login ulang.');
        return;
      }

      if (res.ok) {
        setServices(prev => prev.filter(s => s.id !== id));
        alert('Layanan berhasil dihapus');
      } else {
        const result = await res.json().catch(() => ({ message: 'Gagal hapus layanan' }));
        alert(result.message || 'Gagal hapus layanan');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Gagal terhubung ke server');
    }
  }, []);

  const handleAdd = useCallback(() => {
    setAddFormData({
      title: '',
      description: '',
      icon: '',
      category: '',
      price: '',
      duration: '',
      color: '',
      isActive: true
    });
    setShowAddModal(true);
  }, []);

  const handleEdit = useCallback((service) => {
    setEditFormData({
      title: service.title || '',
      description: service.description || '',
      icon: service.icon || '',
      category: service.category || '',
      price: service.price || '',
      duration: service.duration || '',
      color: service.color || '',
      isActive: service.isActive ?? true
    });
    setCurrentService(service);
    setShowEditModal(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setShowAddModal(false);
    setAddFormData({
      title: '',
      description: '',
      icon: '',
      category: '',
      price: '',
      duration: '',
      color: '',
      isActive: true
    });
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false);
    setEditFormData({
      title: '',
      description: '',
      icon: '',
      category: '',
      price: '',
      duration: '',
      color: '',
      isActive: true
    });
    setCurrentService(null);
  }, []);

  const handleAddFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleEditFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmitAdd = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:5000/api/admin/services', {
        method: 'POST',
        headers: {
          'x-admin-token': 'admin123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addFormData)
      });

      if (res.ok) {
        const newService = await res.json();
        setServices(prev => [newService, ...prev]);
        handleCloseAddModal();
        alert('Layanan berhasil ditambahkan');
        fetchServices();
      } else {
        const result = await res.json().catch(() => ({ message: 'Gagal tambah layanan' }));
        alert(result.message || 'Gagal tambah layanan');
      }
    } catch (err) {
      console.error('Add error:', err);
      alert('Gagal terhubung ke server');
    }
  }, [addFormData, handleCloseAddModal, fetchServices]);

  const handleSubmitEdit = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`http://localhost:5000/api/admin/services/${currentService.id}`, {
        method: 'PUT',
        headers: {
          'x-admin-token': 'admin123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData)
      });

      if (res.ok) {
        const updatedService = await res.json();
        setServices(prev => prev.map(service => 
          service.id === currentService.id ? updatedService : service
        ));
        handleCloseEditModal();
        alert('Layanan berhasil diupdate');
      } else {
        const result = await res.json().catch(() => ({ message: 'Gagal update layanan' }));
        alert(result.message || 'Gagal update layanan');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Gagal terhubung ke server');
    }
  }, [editFormData, currentService, handleCloseEditModal]);

  // Filter dan search services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesCategory = !filterCategory || service.category === filterCategory;
      const matchesSearch = !searchTerm || 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [services, filterCategory, searchTerm]);

  const categories = useMemo(() => {
    const cats = [...new Set(services.map(s => s.category).filter(Boolean))];
    return cats;
  }, [services]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">🛠️ Manajemen Layanan</h2>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
        >
          <span>+</span> Tambah Layanan
        </button>
      </div>

      {/* Filter dan Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari layanan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kategori</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center py-8 text-gray-500">Memuat layanan...</p>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={fetchServices}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>
      ) : filteredServices.length === 0 ? (
        <p className="text-center py-8 text-gray-500">
          {searchTerm || filterCategory ? 'Tidak ada layanan yang sesuai filter.' : 'Belum ada layanan.'}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              {/* Service Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${service.color || 'from-gray-400 to-gray-600'} rounded-full flex items-center justify-center text-xl`}>
                  {service.icon || '🛠️'}
                </div>
                <div className="flex items-center gap-2">
                  {service.isActive ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Aktif</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Nonaktif</span>
                  )}
                </div>
              </div>

              {/* Service Info */}
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
              
              {/* Service Details */}
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                {service.category && (
                  <div className="flex justify-between">
                    <span>Kategori:</span>
                    <span className="font-medium">{service.category}</span>
                  </div>
                )}
                {service.price && (
                  <div className="flex justify-between">
                    <span>Harga:</span>
                    <span className="font-medium">Rp {parseInt(service.price).toLocaleString('id-ID')}</span>
                  </div>
                )}
                {service.duration && (
                  <div className="flex justify-between">
                    <span>Durasi:</span>
                    <span className="font-medium">{service.duration} hari</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Dibuat:</span>
                  <span className="font-medium">
                    {new Date(service.createdAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal 
        show={showAddModal} 
        onClose={handleCloseAddModal}
        title="Tambah Layanan Baru"
      >
        <AddServiceForm
          formData={addFormData}
          onSubmit={handleSubmitAdd}
          onClose={handleCloseAddModal}
          onChange={handleAddFormChange}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal 
        show={showEditModal} 
        onClose={handleCloseEditModal}
        title="Edit Layanan"
      >
        <EditServiceForm
          formData={editFormData}
          onSubmit={handleSubmitEdit}
          onClose={handleCloseEditModal}
          onChange={handleEditFormChange}
        />
      </Modal>

      {/* Statistics */}
      {services.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{services.length}</div>
            <div className="text-sm text-blue-800">Total Layanan</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {services.filter(s => s.isActive).length}
            </div>
            <div className="text-sm text-green-800">Layanan Aktif</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-sm text-purple-800">Kategori</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">
              {services.filter(s => s.price).length}
            </div>
            <div className="text-sm text-orange-800">Dengan Harga</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicesPage;