// src/pages/ContactPage.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation(); // Untuk highlight menu aktif

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini kamu bisa tambahkan integrasi ke backend
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-white shadow-md">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Reach out and let's create something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
              
              {isSubmitted && (
                <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
                  Thank you! Your message has been sent.
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Project Inquiry"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your project..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>

            {/* Info Kontak */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-8">Let's Connect</h3>
              {[
                { icon: '📧', label: 'Email', info: 'hello@creativeagency.com', link: 'mailto:hello@creativeagency.com' },
                { icon: '📱', label: 'Phone', info: '+62 812 3456 7890', link: 'tel:+6281234567890' },
                { icon: '📍', label: 'Address', info: 'Jl. Creative Street No. 123\nBandung, West Java, Indonesia' },
                { icon: '🕒', label: 'Business Hours', info: 'Mon - Fri: 9:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex mb-6 bg-white p-5 rounded-xl shadow-sm ${
                    item.link ? 'hover:shadow-md transition-shadow cursor-pointer' : ''
                  }`}
                  onClick={() => item.link && window.open(item.link, '_blank')}
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

              {/* Peta Sederhana */}
              <div className="mt-8 bg-gray-200 rounded-xl h-48 flex items-center justify-center text-gray-500 font-medium">
                [Google Maps Embed / Lokasi]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Bring Your Vision to Life?</h2>
        <p className="max-w-xl mx-auto mb-8 opacity-90 text-lg">
          Let's discuss your project and turn your ideas into impactful digital solutions.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/portfolio"
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 shadow-lg"
          >
            View Our Work
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 border-2 border-white font-bold rounded-full hover:bg-white/10 transition-all"
          >
            Learn About Us
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

export default ContactPage;