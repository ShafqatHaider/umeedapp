import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: 'Smart Matching',
      description: 'Advanced algorithm to find your perfect life partner',
      icon: '💞'
    },
    {
      title: 'Verified Profiles',
      description: 'All profiles are thoroughly verified for authenticity',
      icon: '✅'
    },
    {
      title: 'Secure & Private',
      description: 'Your privacy and security are our top priority',
      icon: '🔒'
    },
    {
      title: '24/7 Support',
      description: 'Dedicated support team to help you anytime',
      icon: '📞'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Perfect Match with <span className="text-yellow-300">UMEED</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Where hopes meet reality. Begin your journey to find a life partner with trust and confidence.
          </p>
          {!isAuthenticated && (
            <div className="space-x-4">
              <Link 
                to="/register" 
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors inline-block"
              >
                Start Free
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-block"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose UMEED?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 card-hover bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Successful Matches</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600">Cities Worldwide</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of successful couples who found love through UMEED
            </p>
            <Link 
              to="/register" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Create Your Profile Today
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;