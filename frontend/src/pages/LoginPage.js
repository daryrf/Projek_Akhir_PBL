import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Simpan user dari backend (termasuk role)
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect berdasarkan role
        if (data.user.role === 'admin') {
          navigate('/admin'); // Ke panel admin
        } else {
          navigate('/dashboard'); // Ke dashboard user
        }

        alert(`Login berhasil sebagai ${data.user.role}!`);
      } else {
        setError(data.message || 'Email atau password salah');
      }
    } catch (err) {
      setError('Tidak bisa terhubung ke server. Cek backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">🔐 Masuk</h1>
        <p className="text-center text-gray-600 mb-6">Silakan login untuk melanjutkan</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-colors"
          >
            {loading ? 'Memuat...' : 'Masuk'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Belum punya akun?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline font-medium">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;