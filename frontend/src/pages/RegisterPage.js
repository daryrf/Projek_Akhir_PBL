import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Password tidak cocok');
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registrasi berhasil! Silakan login.');
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Tidak bisa terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">📝 Daftar</h1>
        <p className="text-center text-gray-600 mb-6">Buat akun untuk mulai menggunakan</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-2">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="John Doe"
              required
            />
          </div>

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

          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-2">Konfirmasi Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-70 transition-colors"
          >
            {loading ? 'Membuat akun...' : 'Daftar'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;