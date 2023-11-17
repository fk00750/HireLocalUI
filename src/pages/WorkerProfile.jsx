import React, { useState } from "react";
import { FaEnvelope, FaMobile, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

function WorkerProfile() {
  const [workerData, setWorkerData] = useState(null);
  const [additonalWorkerData, setAdditionalWorkerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { state } = useAuth();
  const navigate = useNavigate();



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
            onClick={() => navigate("/signin")}
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
        <h2 className="text-2xl font-bold mb-4">Worker Profile</h2>
        <div className="mb-4 flex items-center">
          <FaUser className="text-gray-600 mr-2" />
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <p className="mt-1 p-2 w-full border rounded-md">
            {workerData?.name}
          </p>
        </div>
        <div className="mb-4 flex items-center">
          <FaEnvelope className="text-gray-600 mr-2" />
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <p className="mt-1 p-2 w-full border rounded-md">
            {workerData?.email}
          </p>
        </div>
        <div className="mb-4 flex items-center">
          <FaMobile className="text-gray-600 mr-2" />
          <label className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <p className="mt-1 p-2 w-full border rounded-md">
            {workerData?.mobile}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WorkerProfile;
