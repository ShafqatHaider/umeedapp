import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    matches: 0,
    views: 0,
    connections: 0
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/profiles/me');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    // Mock stats for now
    setStats({
      matches: 12,
      views: 45,
      connections: 8
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            {profile ? 'Your profile is looking great!' : 'Complete your profile to get better matches.'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">{stats.matches}</div>
            <div className="text-gray-600">Potential Matches</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">{stats.views}</div>
            <div className="text-gray-600">Profile Views</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">{stats.connections}</div>
            <div className="text-gray-600">Connections</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            to="/matches" 
            className="bg-white rounded-lg shadow-sm p-6 card-hover border-l-4 border-primary-500"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Find Matches</h3>
            <p className="text-gray-600">Discover potential partners based on your preferences</p>
          </Link>

          <Link 
            to="/profile" 
            className="bg-white rounded-lg shadow-sm p-6 card-hover border-l-4 border-green-500"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">My Profile</h3>
            <p className="text-gray-600">Update your profile and preferences</p>
          </Link>

          {!profile && (
            <div className="bg-yellow-50 rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete Profile</h3>
              <p className="text-gray-600 mb-4">Complete your profile to get better matches</p>
              <Link 
                to="/profile" 
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Complete Now
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="text-gray-500 text-center py-8">
            <p>No recent activity yet.</p>
            <p className="text-sm mt-2">Start exploring matches to see activity here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;