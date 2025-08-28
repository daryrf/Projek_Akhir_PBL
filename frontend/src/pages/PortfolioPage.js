// frontend/src/PortfolioPage.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [modal, setModal] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/portfolio'); // Public endpoint

        if (res.ok) {
          const data = await res.json();
          // Filter only active projects if you have isActive field
          setProjects(data.filter(project => project.isActive !== false));
        } else {
          throw new Error('Gagal mengambil data portfolio');
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError(err.message);

        // Fallback data (jika backend belum ready)
        setProjects([
          {
            id: 'project1',
            title: 'Grand Luxury Hotel',
            category: 'web branding',
            mainCategory: 'Web Design',
            image: 'Luxury Hotel Website',
            description: 'Complete website redesign for a 5-star luxury hotel chain with booking system integration and multilingual support.',
            tags: ['WordPress', 'Booking System', 'Responsive'],
            duration: '8 weeks',
            team: '4 team members',
            details: {
              client: 'Grand Luxury Hotels',
              duration: '8 weeks',
              team: '4 members',
              tech: 'WordPress, PHP, MySQL, JavaScript',
              status: 'Completed & Live',
              features: [
                'Advanced booking system with real-time availability',
                'Multilingual support (English, Indonesian, Chinese, Japanese)',
                'Mobile-responsive design',
                'Integration with property management system',
                'SEO optimization for better search rankings'
              ]
            },
            isActive: true
          },
          {
            id: 'project2',
            title: 'FitTracker Pro',
            category: 'mobile ui-ux',
            mainCategory: 'Mobile App',
            image: 'Fitness Tracking App',
            description: 'iOS and Android fitness app with social features, workout plans, and progress tracking with wearable device integration.',
            tags: ['React Native', 'HealthKit', 'Analytics'],
            duration: '12 weeks',
            team: '6 team members',
            details: {
              client: 'FitTech Solutions',
              duration: '12 weeks',
              team: '6 members',
              tech: 'React Native, Node.js, MongoDB',
              status: 'Completed & Live',
              features: [
                'Wearable device integration (Apple Watch, Fitbit)',
                'Social challenges and leaderboards',
                'Personalized workout plans',
                'Nutrition tracking with barcode scanner',
                'Progress analytics and reporting'
              ]
            },
            isActive: true
          },
          {
            id: 'project3',
            title: 'StyleHub Online Store',
            category: 'ecommerce web',
            mainCategory: 'E-commerce',
            image: 'Fashion E-commerce',
            description: 'Premium fashion e-commerce platform with AI-powered recommendations and advanced inventory management system.',
            tags: ['Shopify Plus', 'AI Recommendations', 'Payment Gateway'],
            duration: '10 weeks',
            team: '5 team members',
            details: {
              client: 'StyleHub Inc.',
              duration: '10 weeks',
              team: '5 members',
              tech: 'Shopify Plus, React, Stripe API',
              status: 'Launched',
              features: [
                'AI-powered product recommendations',
                'One-click checkout',
                'Inventory sync across warehouses',
                'Customer loyalty program',
                'Advanced search with filters'
              ]
            },
            isActive: true
          },
          {
            id: 'project4',
            title: 'InnovateAI Brand Identity',
            category: 'branding ui-ux',
            mainCategory: 'Branding',
            image: 'Tech Startup Branding',
            description: 'Complete brand identity package for AI startup including logo design, brand guidelines, and marketing materials.',
            tags: ['Logo Design', 'Brand Guidelines', 'Print Materials'],
            duration: '6 weeks',
            team: '3 team members',
            details: {
              client: 'InnovateAI',
              duration: '6 weeks',
              team: '3 members',
              tech: 'Adobe Illustrator, InDesign',
              status: 'Completed',
              features: [
                'Complete brand guidelines',
                'Logo variations for digital and print',
                'Business card and stationery design',
                'Social media templates',
                'Email signature design'
              ]
            },
            isActive: true
          },
          {
            id: 'project5',
            title: 'DataAnalytics Dashboard',
            category: 'web ui-ux',
            mainCategory: 'UI/UX Design',
            image: 'SaaS Dashboard',
            description: 'Complex data visualization dashboard for enterprise SaaS platform with real-time analytics and reporting features.',
            tags: ['React', 'D3.js', 'Real-time Data'],
            duration: '14 weeks',
            team: '7 team members',
            details: {
              client: 'DataCorp',
              duration: '14 weeks',
              team: '7 members',
              tech: 'React, D3.js, WebSocket, Node.js',
              status: 'In Production',
              features: [
                'Real-time data streaming',
                'Customizable dashboards',
                'Export to PDF/CSV',
                'Role-based access control',
                'Alerts and notifications'
              ]
            },
            isActive: true
          },
          {
            id: 'project6',
            title: 'QuickBite Delivery',
            category: 'mobile ecommerce',
            mainCategory: 'Mobile App',
            image: 'Food Delivery App',
            description: 'On-demand food delivery application with real-time tracking, payment integration, and restaurant management system.',
            tags: ['Flutter', 'GPS Tracking', 'Payment Gateway'],
            duration: '16 weeks',
            team: '8 team members',
            details: {
              client: 'QuickBite',
              duration: '16 weeks',
              team: '8 members',
              tech: 'Flutter, Firebase, Google Maps API',
              status: 'Live on App Store & Play Store',
              features: [
                'Live GPS tracking',
                'In-app payments',
                'Push notifications',
                'Restaurant management dashboard',
                'Rating and review system'
              ]
            },
            isActive: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openModal = (project) => {
    // Ubah: langsung gunakan project dan details-nya
    setModal({
      title: project.title,
      image: project.image,
      description: project.description,
      features: project.details?.features || [],
      client: project.details?.client || 'N/A',
      duration: project.details?.duration || project.duration,
      team: project.details?.team || project.team,
      tech: project.details?.tech || 'N/A',
      status: project.details?.status || 'N/A'
    });
  };

  const closeModal = () => {
    setModal(null);
  };

  const filteredProjects = projects.filter(
    (p) => activeFilter === 'all' || p.category.includes(activeFilter)
  );

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

      {/* Hero */}
      <section
        className="pt-32 pb-20 px-6 text-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='dots' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='10' cy='10' r='1' fill='white' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23dots)'/%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 "></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-lg opacity-90">
            Explore our diverse collection of creative projects that showcase innovation, design excellence, and digital craftsmanship.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-white">
        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto px-6">
          {[
            { name: 'All Projects', value: 'all' },
            { name: 'Web Design', value: 'web' },
            { name: 'Mobile Apps', value: 'mobile' },
            { name: 'Branding', value: 'branding' },
            { name: 'E-commerce', value: 'ecommerce' },
            { name: 'UI/UX', value: 'ui-ux' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeFilter === tab.value
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 px-6 bg-white">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="ml-4 text-gray-600">Loading portfolio...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">⚠️ Error loading portfolio</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Showing default projects instead</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
            <p className="text-gray-600">
              {activeFilter === 'all'
                ? 'No portfolio items are currently available.'
                : `No projects found in ${activeFilter} category.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-60 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-medium">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => openModal(project)}
                      className="px-5 py-2.5 bg-white text-indigo-600 font-bold rounded-full shadow-md transform translate-y-10 hover:translate-y-0 transition-transform"
                    >
                      View Project
                    </button>
                  </div>
                  <span className="relative z-10">{project.image}</span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-4 py-1 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-3">
                    {project.mainCategory}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-5 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>👥</span>
                      <span>{project.team}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="max-w-xl mx-auto mb-8 opacity-90 text-lg">
          Let's collaborate to bring your vision to life with innovative design solutions that drive results and exceed expectations.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/contact"
            className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Start a Project
          </Link>
          <Link
            to="/services"
            className="px-8 py-3 border-2 border-white font-bold rounded-full hover:bg-white/10 transition-all"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold">{modal.title}</h3>
              <button
                onClick={closeModal}
                className="w-10 h-10 flex items-center justify-center text-2xl rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[70vh]">
              <div className="h-60 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 rounded-xl mb-6 font-medium">
                {modal.image}
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Project Overview</h4>
                  <p className="text-gray-600 mb-5 text-sm leading-relaxed">{modal.description}</p>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {modal.features.map((feature, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Client', value: modal.client },
                      { label: 'Duration', value: modal.duration },
                      { label: 'Team Size', value: modal.team },
                      { label: 'Technologies', value: modal.tech },
                      { label: 'Status', value: modal.status },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-medium">{item.label}:</span>
                        <span className="text-gray-800 text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;