// src/pages/AdminPortfolioPage.js
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

// Komponen Form untuk Add Portfolio
const AddPortfolioForm = React.memo(({ formData, onSubmit, onClose, onChange }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Proyek *
          </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: project1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judul Proyek *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: Grand Luxury Hotel"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori *
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="web branding, mobile ui-ux"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori Utama *
          </label>
          <select
            name="mainCategory"
            value={formData.mainCategory}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Kategori Utama</option>
            <option value="Web Design">Web Design</option>
            <option value="Mobile App">Mobile App</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Branding">Branding</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi Proyek *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Jelaskan proyek ini secara detail..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar/Thumbnail
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nama gambar atau deskripsi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (pisahkan dengan koma)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="WordPress, Booking System"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durasi
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="8 weeks"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tim
          </label>
          <input
            type="text"
            name="team"
            value={formData.team}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="4 team members"
          />
        </div>
      </div>

      {/* Details Tambahan */}
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Detail Lengkap (Modal)</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama klien"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teknologi</label>
            <input
              type="text"
              name="tech"
              value={formData.tech}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, Node.js"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Completed & Live"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fitur Utama (satu per baris)</label>
            <textarea
              name="features"
              value={formData.features}
              onChange={onChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Advanced booking system&#10;Multilingual support"
            />
          </div>
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
          Tambah Proyek
        </button>
      </div>
    </form>
  );
});

// Komponen Form untuk Edit Portfolio (sama seperti Add, hanya beda tombol)
const EditPortfolioForm = React.memo(({ formData, onSubmit, onClose, onChange }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Proyek *
          </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={onChange}
            required
            disabled
            className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50 text-gray-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judul Proyek *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori *
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori Utama *
          </label>
          <select
            name="mainCategory"
            value={formData.mainCategory}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Kategori Utama</option>
            <option value="Web Design">Web Design</option>
            <option value="Mobile App">Mobile App</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Branding">Branding</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi Proyek *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar/Thumbnail
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (pisahkan dengan koma)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durasi
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tim
          </label>
          <input
            type="text"
            name="team"
            value={formData.team}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Detail Lengkap (Modal)</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teknologi</label>
            <input
              type="text"
              name="tech"
              value={formData.tech}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fitur Utama (satu per baris)</label>
            <textarea
              name="features"
              value={formData.features}
              onChange={onChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          Update Proyek
        </button>
      </div>
    </form>
  );
});

const AdminPortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [addFormData, setAddFormData] = useState({
    id: '',
    title: '',
    category: '',
    mainCategory: '',
    image: '',
    description: '',
    tags: '',
    duration: '',
    team: '',
    client: '',
    tech: '',
    status: '',
    features: '',
    isActive: true
  });

  const [editFormData, setEditFormData] = useState({
    id: '',
    title: '',
    category: '',
    mainCategory: '',
    image: '',
    description: '',
    tags: '',
    duration: '',
    team: '',
    client: '',
    tech: '',
    status: '',
    features: '',
    isActive: true
  });

  const navigate = useNavigate();

  // Fungsi untuk mengambil data portfolio
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:5000/api/admin/portfolio', {
        method: 'GET',
        headers: {
          'x-admin-token': 'admin123',
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Token tidak valid atau expired');
        }
        const errData = await res.text().catch(() => '');
        throw new Error(JSON.parse(errData)?.error || 'Gagal ambil data');
      }

      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      
      // Fallback data
      setProjects([
        {
          id: 'project1',
          title: 'Grand Luxury Hotel',
          category: 'web branding',
          mainCategory: 'Web Design',
          image: 'Luxury Hotel Website',
          description: 'Complete website redesign for a 5-star luxury hotel chain.',
          tags: ['WordPress', 'Booking System'],
          duration: '8 weeks',
          team: '4 team members',
          client: 'Grand Luxury Hotels',
          tech: 'WordPress, PHP, MySQL',
          status: 'Completed & Live',
          features: 'Advanced booking system\nMultilingual support',
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Yakin hapus proyek ini?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/portfolio/${id}`, {
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
        setProjects(prev => prev.filter(p => p.id !== id));
        alert('Proyek berhasil dihapus');
      } else {
        const result = await res.json().catch(() => ({ error: 'Gagal hapus proyek' }));
        alert(result.error || 'Gagal hapus proyek');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Gagal terhubung ke server');
    }
  }, []);

  const handleAdd = useCallback(() => {
    setAddFormData({
      id: '',
      title: '',
      category: '',
      mainCategory: '',
      image: '',
      description: '',
      tags: '',
      duration: '',
      team: '',
      client: '',
      tech: '',
      status: '',
      features: '',
      isActive: true
    });
    setShowAddModal(true);
  }, []);

  const handleEdit = useCallback((project) => {
    setEditFormData({
      id: project.id || '',
      title: project.title || '',
      category: project.category || '',
      mainCategory: project.mainCategory || '',
      image: project.image || '',
      description: project.description || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
      duration: project.duration || '',
      team: project.team || '',
      client: project.client || '',
      tech: project.tech || '',
      status: project.status || '',
      features: Array.isArray(project.details?.features) 
        ? project.details.features.join('\n') 
        : (project.features ? project.features.join('\n') : ''),
      isActive: project.isActive ?? true
    });
    setCurrentProject(project);
    setShowEditModal(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setShowAddModal(false);
    setAddFormData({
      id: '',
      title: '',
      category: '',
      mainCategory: '',
      image: '',
      description: '',
      tags: '',
      duration: '',
      team: '',
      client: '',
      tech: '',
      status: '',
      features: '',
      isActive: true
    });
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false);
    setEditFormData({
      id: '',
      title: '',
      category: '',
      mainCategory: '',
      image: '',
      description: '',
      tags: '',
      duration: '',
      team: '',
      client: '',
      tech: '',
      status: '',
      features: '',
      isActive: true
    });
    setCurrentProject(null);
  }, []);

  const handleAddFormChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setAddFormData(prev => ({
      ...prev,
      [name]: val
    }));
  }, []);

  const handleEditFormChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setEditFormData(prev => ({
      ...prev,
      [name]: val
    }));
  }, []);

  const handleSubmitAdd = useCallback(async (e) => {
    e.preventDefault();
    
    // Konversi tags dan features
    const tags = addFormData.tags ? addFormData.tags.split(',').map(t => t.trim()).filter(t => t) : [];
    const features = addFormData.features ? addFormData.features.split('\n').map(f => f.trim()).filter(f => f) : [];

    const payload = {
      ...addFormData,
      tags,
      features,
      isActive: addFormData.isActive
    };

    try {
      const res = await fetch('http://localhost:5000/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'x-admin-token': 'admin123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newProject = await res.json();
        setProjects(prev => [newProject, ...prev]);
        handleCloseAddModal();
        alert('Proyek berhasil ditambahkan');
        fetchProjects();
      } else {
        const result = await res.json().catch(() => ({ error: 'Gagal tambah proyek' }));
        alert(result.error || 'Gagal tambah proyek');
      }
    } catch (err) {
      console.error('Add error:', err);
      alert('Gagal terhubung ke server');
    }
  }, [addFormData, handleCloseAddModal, fetchProjects]);

  const handleSubmitEdit = useCallback(async (e) => {
    e.preventDefault();
    
    const tags = editFormData.tags ? editFormData.tags.split(',').map(t => t.trim()).filter(t => t) : [];
    const features = editFormData.features ? editFormData.features.split('\n').map(f => f.trim()).filter(f => f) : [];

    const payload = {
      ...editFormData,
      tags,
      features,
      isActive: editFormData.isActive
    };

    try {
      const res = await fetch(`http://localhost:5000/api/admin/portfolio/${currentProject.id}`, {
        method: 'PUT',
        headers: {
          'x-admin-token': 'admin123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updatedProject = await res.json();
        setProjects(prev => prev.map(p => 
          p.id === currentProject.id ? updatedProject : p
        ));
        handleCloseEditModal();
        alert('Proyek berhasil diupdate');
      } else {
        const result = await res.json().catch(() => ({ error: 'Gagal update proyek' }));
        alert(result.error || 'Gagal update proyek');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Gagal terhubung ke server');
    }
  }, [editFormData, currentProject, handleCloseEditModal]);

  // Filter dan search
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = !filterCategory || project.category.includes(filterCategory) || project.mainCategory === filterCategory;
      const matchesSearch = !searchTerm || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [projects, filterCategory, searchTerm]);

  const categories = useMemo(() => {
    const cats = new Set();
    projects.forEach(p => {
      p.category.split(' ').forEach(cat => cats.add(cat));
      cats.add(p.mainCategory);
    });
    return [...cats].filter(Boolean);
  }, [projects]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">📁 Manajemen Portfolio</h2>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
        >
          <span>+</span> Tambah Proyek
        </button>
      </div>

      {/* Filter dan Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari proyek..."
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
        <p className="text-center py-8 text-gray-500">Memuat proyek...</p>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={fetchProjects}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <p className="text-center py-8 text-gray-500">
          {searchTerm || filterCategory ? 'Tidak ada proyek yang sesuai filter.' : 'Belum ada proyek.'}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{project.image?.charAt(0) || '📁'}</div>
                <div className="flex items-center gap-2">
                  {project.isActive ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Aktif</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Nonaktif</span>
                  )}
                </div>
              </div>

              {/* Info */}
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              {/* Details */}
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex justify-between">
                  <span>Kategori:</span>
                  <span className="font-medium">{project.mainCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span>Durasi:</span>
                  <span className="font-medium">{project.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tim:</span>
                  <span className="font-medium">{project.team}</span>
                </div>
                {project.createdAt && (
                  <div className="flex justify-between">
                    <span>Dibuat:</span>
                    <span className="font-medium">
                      {new Date(project.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
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
        title="Tambah Proyek Baru"
      >
        <AddPortfolioForm
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
        title="Edit Proyek"
      >
        <EditPortfolioForm
          formData={editFormData}
          onSubmit={handleSubmitEdit}
          onClose={handleCloseEditModal}
          onChange={handleEditFormChange}
        />
      </Modal>

      {/* Statistics */}
      {projects.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
            <div className="text-sm text-blue-800">Total Proyek</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.isActive).length}
            </div>
            <div className="text-sm text-green-800">Proyek Aktif</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-sm text-purple-800">Kategori</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">
              {projects.filter(p => p.client).length}
            </div>
            <div className="text-sm text-orange-800">Dengan Client</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolioPage;