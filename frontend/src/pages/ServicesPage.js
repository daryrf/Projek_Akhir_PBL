// src/pages/ServicesPage.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ServicesPage = () => {
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            We offer comprehensive digital solutions designed to elevate your brand and engage your audience.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">What We Do</h2>
          <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
            From concept to execution, we deliver end-to-end digital services tailored to your unique needs.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: '🎨',
                title: 'Brand Identity',
                desc: 'Complete brand development including logo design, visual identity, and brand guidelines that make your business memorable.',
                color: 'from-pink-500 to-rose-600'
              },
              {
                icon: '💻',
                title: 'Web Development',
                desc: 'Custom websites and web applications built with cutting-edge technology for optimal performance and user experience.',
                color: 'from-indigo-500 to-purple-600'
              },
              {
                icon: '📱',
                title: 'Mobile Apps',
                desc: 'Native and cross-platform mobile applications that deliver seamless user experiences across all devices.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '📈',
                title: 'Digital Marketing',
                desc: 'Strategic digital marketing campaigns that increase visibility, engage audiences, and drive conversions.',
                color: 'from-emerald-500 to-teal-600'
              },
              {
                icon: '🎬',
                title: 'Video Production',
                desc: 'Professional video content creation from concept to final cut, including motion graphics and animations.',
                color: 'from-amber-500 to-orange-600'
              },
              {
                icon: '📊',
                title: 'Analytics & SEO',
                desc: 'Data-driven insights and search engine optimization to maximize your digital presence and ROI.',
                color: 'from-violet-500 to-fuchsia-600'
              }
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-5`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
          <p className="text-gray-600 mb-14 max-w-2xl mx-auto">
            We combine creativity, technology, and strategy to deliver results that matter.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Team', desc: 'Our specialists bring years of experience in design, development, and digital marketing.' },
              { title: 'Client-Centric', desc: 'We listen first, then create. Your goals are our top priority.' },
              { title: 'End-to-End Service', desc: 'From idea to launch, we handle everything so you don’t have to.' }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-indigo-600 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Digital Presence?</h2>
        <p className="max-w-xl mx-auto mb-8 opacity-90 text-lg">
          Let’s discuss your project and create a solution that drives real results.
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
            Get a Free Consultation
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

export default ServicesPage;