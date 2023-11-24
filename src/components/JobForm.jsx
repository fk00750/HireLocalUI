import React, { useState } from "react";
import { BiUser, BiBriefcase, BiMap } from "react-icons/bi";
import { useAuth } from "../state/AuthContext";
import { API } from "../api";

function JobForm() {
  const [submissionError, setSubmissionError] = useState(null);
  const { state } = useAuth();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobType: "",
    numWorkers: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Handle form submission here
      console.log(formData);

      const response = await fetch(`${API}/post-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) setFormData(formData);
      else {
        const errorData = await response.json();
        setSubmissionError(errorData.message || "Failed to Search for Workers");

        setTimeout(() => {
          setSubmissionError(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error during job post:", error.message);
      setSubmissionError("Failed to Search Worker");

      setTimeout(() => {
        setSubmissionError(null);
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Job Posting Form
        </h2>

        {/* Job Title Input */}
        <div className="mb-6 relative">
          <BiUser className="w-6 h-6 text-gray-500 absolute top-1/2 transform -translate-y-1/2 left-3" />
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full pl-10 px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
            placeholder="Job Title"
          />
        </div>

        {/* Job Description Input */}
        <div className="mb-6 relative">
          <BiBriefcase className="w-6 h-6 text-gray-500 absolute top-2 left-2" />
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows="4"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full pl-10 px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
            placeholder="Job Description"
          ></textarea>
        </div>

        {/* Job Type, Number of Workers, and Location Select */}
        <div className="grid grid-cols-2 gap-4">
          {/* Job Type Select */}
          <div className="relative">
            <BiBriefcase className="w-6 h-6 text-gray-500 absolute top-1/2 transform -translate-y-1/2 left-3" />
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full pl-10 appearance-none px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled selected>
                Job Type
              </option>
              <option value="fullTime">Full Time</option>
              <option value="partTime">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          {/* Number of Workers Select */}
          <div className="relative">
            <BiUser className="w-6 h-6 text-gray-500 absolute top-1/2 transform -translate-y-1/2 left-3" />
            <select
              id="numWorkers"
              name="numWorkers"
              value={formData.numWorkers}
              onChange={handleChange}
              className="w-full pl-10 appearance-none px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled selected>
                Workers
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="more">More than 3</option>
            </select>
          </div>

          {/* Location Input */}
          <div className="relative col-span-2">
            <BiMap className="w-6 h-6 text-gray-500 absolute top-1/2 transform -translate-y-1/2 left-3" />
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full pl-10 px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-500"
              placeholder="Location"
              required
            />
          </div>

          {/* Button */}
          <div className="col-span-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
          </div>
        </div>

        {submissionError && (
          <div className="mt-4 text-red-500">
            <p>{submissionError}</p>
          </div>
        )}

        {/* Other form fields will go here */}
      </div>
    </div>
  );
}

export default JobForm;
