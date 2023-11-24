import React, { useState, useEffect } from "react";
import { API } from "../api";
import { useAuth } from "../state/AuthContext";
import { Link } from "react-router-dom";

const WorkerProfile = () => {
  const [workerData, setWorkerData] = useState(null);
  const { state } = useAuth();

  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch worker data from the API
    const fetchWorkerData = async () => {
      try {
        const response = await fetch(`${API}/get-worker`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        if (response.status === 404) {
          setError(true); // Set error state to true on 404 response
          setWorkerData(true);
        }

        if (response.ok) {
          const data = await response.json();
          setWorkerData(data);
        } else {
          console.error("Failed to fetch worker data:", response.statusText);
        }
      } catch (error) {
        console.error("Error during worker data fetch:", error.message);
      }
    };

    fetchWorkerData();
  }, [state.token]); // Include state.token in the dependency array to avoid eslint warning

  if (!workerData) {
    // You can render a loading state while waiting for the data
    return <div>Loading...</div>;
  }

  // Having error in the following code block

  return (
    <div className="min-h-screen flex items-center justify-center">
      {error ? (
        <div className="bg-red-200 p-4 rounded-md">
          <Link to="/worker-info-form">
            <button>Please Complete Your Details</button>
          </Link>
        </div>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full md:w-96">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">
            Worker Profile
          </h2>

          {Object.entries(workerData).map(([key, value]) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key}
              </label>
              <p className="mt-1 p-2 w-full border rounded-md bg-gray-100">
                {value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkerProfile;
