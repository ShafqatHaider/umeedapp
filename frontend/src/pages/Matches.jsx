import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Matches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/profiles/matches');
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setError('Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (profileId) => {
    try {
      // Implement connect logic here
      console.log('Connecting with profile:', profileId);
      alert('Connect feature coming soon!');
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={fetchMatches}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Match</h1>
          <p className="text-gray-600">
            Discover potential partners based on your preferences
          </p>
        </div>

        {/* Matches Grid */}
        {matches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No matches found</h3>
            <p className="text-gray-600 mb-6">
              Complete your profile and preferences to see better matches.
            </p>
            <a
              href="/profile"
              className="btn-primary"
            >
              Complete Profile
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((profile) => (
              <div key={profile._id} className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
                {/* Profile Image */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  {profile.photos && profile.photos.length > 0 ? (
                    <img
                      src={profile.photos.find(p => p.isPrimary)?.url || profile.photos[0].url}
                      alt={profile.user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-primary-500">
                      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {profile.user.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {profile.basicInfo.age && `${profile.basicInfo.age} years`}
                        {profile.professionalInfo.occupation && ` • ${profile.professionalInfo.occupation}`}
                      </p>
                    </div>
                    {profile.isVerified && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Basic Details */}
                  <div className="space-y-2 mb-4">
                    {profile.basicInfo.religion && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Religion:</span>
                        <span className="text-gray-800">{profile.basicInfo.religion}</span>
                      </div>
                    )}
                    {profile.basicInfo.caste && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Caste:</span>
                        <span className="text-gray-800">{profile.basicInfo.caste}</span>
                      </div>
                    )}
                    {profile.professionalInfo.education && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Education:</span>
                        <span className="text-gray-800">{profile.professionalInfo.education}</span>
                      </div>
                    )}
                    {profile.location.city && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Location:</span>
                        <span className="text-gray-800">{profile.location.city}</span>
                      </div>
                    )}
                  </div>

                  {/* About Preview */}
                  {profile.about && (
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {profile.about}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleConnect(profile._id)}
                      className="flex-1 btn-primary"
                    >
                      Connect
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;