import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    basicInfo: {
      gender: '',
      dateOfBirth: '',
      height: { feet: '', inches: '' },
      maritalStatus: '',
      religion: '',
      caste: '',
      subCaste: '',
      motherTongue: ''
    },
    professionalInfo: {
      education: '',
      college: '',
      occupation: '',
      annualIncome: '',
      workingWith: ''
    },
    familyInfo: {
      fatherOccupation: '',
      motherOccupation: '',
      siblings: '',
      familyStatus: '',
      familyType: '',
      familyValues: ''
    },
    lifestyle: {
      diet: '',
      smoke: '',
      drink: ''
    },
    partnerPreferences: {
      ageRange: { min: '', max: '' },
      heightRange: { min: '', max: '' },
      maritalStatus: [],
      religion: '',
      caste: '',
      education: '',
      occupation: ''
    },
    about: '',
    location: {
      city: '',
      state: '',
      country: ''
    },
    contact: {
      phone: '',
      whatsapp: ''
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/profiles/me');
      if (response.data) {
        setFormData(prev => ({
          ...prev,
          ...response.data
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedChange = (section, subSection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await axios.post('/profiles', formData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'basic', name: 'Basic Info' },
    { id: 'professional', name: 'Professional' },
    { id: 'family', name: 'Family' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'preferences', name: 'Preferences' },
    { id: 'about', name: 'About & Contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Complete your profile to get better matches</p>
        </div>

        {message && (
          <div className={`rounded-md p-4 mb-6 ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Gender</label>
                      <select
                        value={formData.basicInfo.gender}
                        onChange={(e) => handleChange('basicInfo', 'gender', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.basicInfo.dateOfBirth}
                        onChange={(e) => handleChange('basicInfo', 'dateOfBirth', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Religion</label>
                      <input
                        type="text"
                        value={formData.basicInfo.religion}
                        onChange={(e) => handleChange('basicInfo', 'religion', e.target.value)}
                        className="form-input"
                        placeholder="Religion"
                      />
                    </div>
                    <div>
                      <label className="form-label">Caste</label>
                      <input
                        type="text"
                        value={formData.basicInfo.caste}
                        onChange={(e) => handleChange('basicInfo', 'caste', e.target.value)}
                        className="form-input"
                        placeholder="Caste"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Mother Tongue</label>
                    <input
                      type="text"
                      value={formData.basicInfo.motherTongue}
                      onChange={(e) => handleChange('basicInfo', 'motherTongue', e.target.value)}
                      className="form-input"
                      placeholder="Mother Tongue"
                    />
                  </div>
                </div>
              )}

              {/* Professional Info Tab */}
              {activeTab === 'professional' && (
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Education</label>
                    <input
                      type="text"
                      value={formData.professionalInfo.education}
                      onChange={(e) => handleChange('professionalInfo', 'education', e.target.value)}
                      className="form-input"
                      placeholder="Highest Education"
                    />
                  </div>
                  <div>
                    <label className="form-label">Occupation</label>
                    <input
                      type="text"
                      value={formData.professionalInfo.occupation}
                      onChange={(e) => handleChange('professionalInfo', 'occupation', e.target.value)}
                      className="form-input"
                      placeholder="Occupation"
                    />
                  </div>
                </div>
              )}

              {/* About & Contact Tab */}
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div>
                    <label className="form-label">About Yourself</label>
                    <textarea
                      value={formData.about}
                      onChange={(e) => handleChange('about', e.target.value)}
                      rows={4}
                      className="form-input"
                      placeholder="Tell potential matches about yourself, your interests, and what you're looking for..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        value={formData.location.city}
                        onChange={(e) => handleChange('location', 'city', e.target.value)}
                        className="form-input"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        value={formData.location.state}
                        onChange={(e) => handleChange('location', 'state', e.target.value)}
                        className="form-input"
                        placeholder="State"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Add similar content for other tabs... */}
            </div>

            {/* Form Actions */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                >
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;