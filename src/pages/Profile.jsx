import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaMobile } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

function Profile() {
  const navigate = useNavigate();
  const { state } = useAuth();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!state.isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user-profile', {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Failed to fetch user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error during user profile fetch:', error.message);
      } finally {
        setLoading(false);
        setDataLoaded(true); 
      }
    };

    if (!dataLoaded) {
      fetchUserProfile();
    }
  }, [state, dataLoaded]);

  if (!state.isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full md:w-96">
          {loading ? (
            <p className="text-xl font-bold mb-4">Loading...</p>
          ) : (
            <p className="text-xl text-red-500 font-bold mb-4">
              Please Sign In to view your profile.
            </p>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-96">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="mb-4 flex items-center">
          <FaUser className="text-gray-600 mr-2" />
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 p-2 w-full border rounded-md">{userData?.name}</p>
        </div>
        <div className="mb-4 flex items-center">
          <FaEnvelope className="text-gray-600 mr-2" />
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 p-2 w-full border rounded-md">{userData?.email}</p>
        </div>
        <div className="mb-4 flex items-center">
          <FaMobile className="text-gray-600 mr-2" />
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <p className="mt-1 p-2 w-full border rounded-md">{userData?.mobile}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
