// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/LoginPage'; // ✅ Sekarang hanya untuk admin login
import AdminMessagesPage from './pages/AdminMessagesPage';
import AdminServicesPage from './pages/AdminServicesPage';

// Layout & Proteksi
import AdminLayout from './pages/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    alert('Anda berhasil logout');
    window.location.href = '/admin/login'; // ✅ Redirect ke admin login
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ✅ PUBLIC ROUTES - Dapat diakses semua orang */}
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />

          {/* ✅ ADMIN AUTH ROUTES */}
          <Route path="/admin/login" element={<LoginPage />} />
          
          {/* ✅ Redirect /login ke /admin/login untuk backward compatibility */}
          <Route path="/login" element={<Navigate to="/admin/login" />} />

          {/* ✅ ADMIN ROUTES - Dilindungi dengan ProtectedRoute */}
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
            path="/admin/services"
            element={
              <ProtectedRoute>
                <AdminLayout onLogout={handleLogout}>
                  <AdminServicesPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* ✅ REMOVED ROUTES:
            - /register (User registration tidak diperlukan)
            - /admin/users (User management dihapus)
            - /dashboard (User dashboard dihapus)
          */}

          {/* ✅ 404 Fallback - Redirect ke homepage */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;