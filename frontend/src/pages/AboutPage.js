// src/pages/AboutPage.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AboutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Untuk highlight menu aktif

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-white shadow-md">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
          onClick={closeMenu}
        >
          CREATIVE
        </Link>

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

        <Link
          to="/contact"
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          Get Started
        </Link>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-5 space-y-4 shadow-lg">
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
                className={`block px-4 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'text-indigo-700 bg-indigo-100 border border-indigo-300 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMenu}
              >
                {name}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-full text-center hover:bg-indigo-700 transition-colors"
            onClick={closeMenu}
          >
            Get Started
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Our Agency</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            We’re a passionate team of designers, developers, and digital strategists dedicated to creating exceptional digital experiences.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2020, Creative Agency began with a simple mission: to transform ideas into impactful digital experiences. What started as a small team of designers has grown into a full-service digital agency serving clients worldwide.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We believe in the power of creativity, strategy, and technology to solve real business challenges and create lasting impressions.
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

            <div className="h-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-semibold shadow-lg">
              Meet Our Creative Team
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Our Core Values</h2>
          <p className="text-gray-600 mb-14 max-w-2xl mx-auto">
            These principles guide everything we do and how we work with our clients.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Creativity',
                desc: 'We push boundaries and think outside the box to deliver unique, memorable solutions.',
                icon: '🎨'
              },
              {
                title: 'Excellence',
                desc: 'We never settle for good enough. Every detail is crafted with precision and care.',
                icon: '✨'
              },
              {
                title: 'Collaboration',
                desc: 'We partner with our clients as an extension of their team, ensuring shared success.',
                icon: '🤝'
              }
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
        <p className="max-w-xl mx-auto mb-8 opacity-90 text-lg">
          Let's bring your vision to life with creative solutions that make an impact.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/portfolio"
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 shadow-lg"
          >
            View Our Work
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border-2 border-white font-bold rounded-full hover:bg-white/10 transition-all"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
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
    </div>
  );
};

export default AboutPage;