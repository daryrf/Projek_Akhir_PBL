// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminMessagesPage from './pages/AdminMessagesPage';
import AdminUsersPage from './pages/AdminUsersPage';
import UserDashboardPage from './pages/UserDashboardPage';

// Layout & Proteksi
import AdminLayout from './pages/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Import

function App() {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    alert('Anda berhasil logout');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Frontend Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Routes - Dilindungi */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/messages" />}
          />

          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <AdminMessagesPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <AdminUsersPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route path="/dashboard" element={<UserDashboardPage />} />

          {/* Redirect default */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;