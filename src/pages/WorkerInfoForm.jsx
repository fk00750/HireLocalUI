import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../state/AuthContext";
import { useNavigate } from "react-router-dom";

const WorkerInfoForm = () => {
  const { control, handleSubmit } = useForm();
  const { state } = useAuth();
  const navigate = useNavigate()


  const onSubmit = async (data) => {
    try {
      // Make API call to complete-worker-profile
      const response = await fetch('http://localhost:4000/api/complete-worker-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Worker info submitted successfully!');
        navigate('/worker-profile')
        // Handle success, e.g., redirect or show a success message
      } else {
        console.error('Failed to submit worker info:', response.statusText);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error during API call:', error.message);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-4 md:p-6 rounded-md shadow-md"
    >
      {/* Work Type Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Work Type
        </label>
        <Controller
          name="workType"
          control={control}
          defaultValue="hourly"
          rules={{ required: true }}
          render={({ field }) => (
            <select
              {...field}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
            >
              <option value="hourly">Hourly</option>
              {/* Add more work types as needed */}
            </select>
          )}
        />
      </div>

      {/* Age Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <Controller
          name="age"
          control={control}
          defaultValue=""
          rules={{ required: true, pattern: /^\d+$/ }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
              placeholder="Enter age"
            />
          )}
        />
      </div>

      {/* Location Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <Controller
          name="location"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
              placeholder="Enter location"
            />
          )}
        />
      </div>

      {/* Specialty Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Specialty
        </label>
        <Controller
          name="specialty"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
              placeholder="Enter specialty"
            />
          )}
        />
      </div>

      {/* Experience Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Experience
        </label>
        <Controller
          name="experience"
          control={control}
          defaultValue=""
          rules={{ required: true, pattern: /^\d+$/ }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
              placeholder="Enter experience"
            />
          )}
        />
      </div>

      {/* Wage Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Wage</label>
        <Controller
          name="wage"
          control={control}
          defaultValue=""
          rules={{ required: true, pattern: /^\d+$/ }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
              placeholder="Enter wage"
            />
          )}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Submit
      </button>
    </form>
  );
};

export default WorkerInfoForm;
