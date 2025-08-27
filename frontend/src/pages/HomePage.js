import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // 🔐 Cek apakah user sudah login
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isLoggedIn = !!user;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-white shadow-md">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
        >
          CREATIVE
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'Portfolio', path: '/portfolio' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' },
          ].map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`font-medium transition-all duration-300 relative ${
                  isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                {name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Tombol Aksi */}
        <div className="flex items-center gap-4">
          {/* 🔁 Ganti "Login" jadi "Dashboard" atau "Admin" setelah login */}
          {isLoggedIn ? (
            <Link
              to={user.role === 'admin' ? '/admin' : '/dashboard'}
              className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-all duration-200"
            >
              {user.role === 'admin' ? 'Admin' : 'Dashboard'}
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-gray-700 font-medium hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              Login
            </Link>
          )}

          <Link
            to="/contact"
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-5 space-y-4 shadow-lg">
          {/* ... (menu lainnya) ... */}

          {/* 🔁 Sama seperti di desktop */}
          {isLoggedIn ? (
            <Link
              to={user.role === 'admin' ? '/admin' : '/dashboard'}
              className="block px-4 py-2.5 bg-gray-100 border border-dashed border-gray-400 rounded-md text-sm font-medium hover:bg-gray-200"
              onClick={closeMenu}
            >
              {user.role === 'admin' ? 'Admin' : 'Dashboard'}
            </Link>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2.5 bg-gray-100 border border-dashed border-gray-400 rounded-md text-sm font-medium hover:bg-gray-200"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}

          <Link
            to="/contact"
            className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all text-center"
            onClick={closeMenu}
          >
            Get Started
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="text-center py-40 px-6 relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grain' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='1' cy='1' r='1' fill='white' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grain)'/%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Creative Digital Solutions
          </h1>
          <p className="text-lg sm:text-xl opacity-95 mb-10 max-w-2xl mx-auto leading-relaxed">
            We transform your ideas into stunning digital experiences that captivate audiences and drive results.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              View Our Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">Our Services</h2>
        <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
          Comprehensive digital solutions tailored to elevate your brand and engage your audience.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: '🎨', title: 'Brand Identity', desc: 'Complete brand development including logo design, visual identity, and brand guidelines that make your business memorable.' },
            { icon: '💻', title: 'Web Development', desc: 'Custom websites and web applications built with cutting-edge technology for optimal performance and user experience.' },
            { icon: '📱', title: 'Mobile Apps', desc: 'Native and cross-platform mobile applications that deliver seamless user experiences across all devices.' },
            { icon: '📈', title: 'Digital Marketing', desc: 'Strategic digital marketing campaigns that increase visibility, engage audiences, and drive conversions.' },
            { icon: '🎬', title: 'Video Production', desc: 'Professional video content creation from concept to final cut, including motion graphics and animations.' },
            { icon: '📊', title: 'Analytics & SEO', desc: 'Data-driven insights and search engine optimization to maximize your digital presence and ROI.' }
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-5">
                {service.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">Featured Work</h2>
        <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
          Explore our latest projects and creative solutions.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { title: 'Luxury Fashion Store', desc: 'Complete e-commerce solution with custom design, payment integration, and inventory management.', img: 'E-commerce Platform' },
            { title: 'Fitness Tracking App', desc: 'iOS and Android app with social features, workout plans, and progress tracking capabilities.', img: 'Mobile App Design' },
            { title: 'Tech Startup Branding', desc: 'Complete brand identity package including logo, business cards, and digital assets.', img: 'Brand Identity' },
            { title: 'Corporate Website', desc: 'Modern, responsive website redesign with improved UX and conversion optimization.', img: 'Website Redesign' }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-300 flex items-center justify-center text-gray-500 font-medium text-center p-4">
                {item.img}
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">About Our Agency</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">
              We're a passionate team of designers, developers, and digital strategists dedicated to creating exceptional digital experiences. With years of experience and a commitment to innovation, we help brands tell their stories and connect with their audiences.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our collaborative approach ensures that every project is tailored to meet your specific needs and exceed your expectations.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { num: '150+', label: 'Projects Completed' },
                { num: '50+', label: 'Happy Clients' },
                { num: '5+', label: 'Years Experience' },
                { num: '24/7', label: 'Support Available' }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-indigo-600">{stat.num}</div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-72 sm:h-80 md:h-96 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-semibold shadow-lg">
            Meet Our Creative Team
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">Get In Touch</h2>
          <p className="text-center text-gray-600 mb-14">
            Ready to start your next project? Let's discuss how we can help bring your vision to life.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <form className="bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-md">
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2">Project Type</label>
                <input
                  type="text"
                  placeholder="Web Design, Branding, etc."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2">Message</label>
                <textarea
                  rows="5"
                  placeholder="Tell us about your project..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>

            {/* Info */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-8">Let's Start a Conversation</h3>
              {[
                { icon: '📧', label: 'Email', info: 'hello@creativeagency.com' },
                { icon: '📱', label: 'Phone', info: '+62 812 3456 7890' },
                { icon: '📍', label: 'Address', info: 'Jl. Creative Street No. 123\nBandung, West Java, Indonesia' },
                { icon: '🕒', label: 'Business Hours', info: 'Mon - Fri: 9:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex mb-6 bg-gray-100 p-5 rounded-xl shadow-sm"
                >
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <strong className="text-gray-800 block">{item.label}</strong>
                    <span className="text-gray-600 whitespace-pre-line text-sm">{item.info}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left max-w-6xl mx-auto">
          <div>
            <h4 className="text-xl font-semibold mb-4">Creative Agency</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transforming ideas into extraordinary digital experiences that inspire and engage.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-gray-300">
              <p><Link to="/" className="hover:text-white transition-colors">Home</Link></p>
              <p><Link to="/services" className="hover:text-white transition-colors">Services</Link></p>
              <p><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></p>
              <p><Link to="/about" className="hover:text-white transition-colors">About</Link></p>
              <p><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-gray-300">
              <p><Link to="/services#web" className="hover:text-white transition-colors">Web Development</Link></p>
              <p><Link to="/services#mobile" className="hover:text-white transition-colors">Mobile Apps</Link></p>
              <p><Link to="/services#branding" className="hover:text-white transition-colors">Brand Identity</Link></p>
              <p><Link to="/services#marketing" className="hover:text-white transition-colors">Digital Marketing</Link></p>
              <p><Link to="/services#video" className="hover:text-white transition-colors">Video Production</Link></p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="space-y-2 text-gray-300">
              <p><a href="#" className="hover:text-white transition-colors">Instagram</a></p>
              <p><a href="#" className="hover:text-white transition-colors">Facebook</a></p>
              <p><a href="#" className="hover:text-white transition-colors">LinkedIn</a></p>
              <p><a href="#" className="hover:text-white transition-colors">Twitter</a></p>
              <p><a href="#" className="hover:text-white transition-colors">Behance</a></p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Creative Agency. All rights reserved. | <Link to="/privacy" className="hover:text-white">Privacy Policy</Link> | <Link to="/terms" className="hover:text-white">Terms of Service</Link></p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;