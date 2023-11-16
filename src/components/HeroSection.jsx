// HeroSection.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

function HeroSection() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-blue-500 text-white py-8 md:py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
          Find Local Labor for Your Needs
        </h1>
        <p className="text-sm md:text-lg mb-4">
          Connect with qualified laborers in your community for various tasks.
        </p>

        {/* Search Box */}
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-4 md:p-6 rounded-md shadow-md">
          {/* Work Type Dropdown */}
          <div className="mb-2">
            <label className="block text-xs md:text-sm font-medium text-gray-700">Select Work Type</label>
            <Controller
              name="workType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field} className="mt-1 p-2 md:p-3 border rounded w-full focus:outline-none focus:border-blue-500">
                  <option value="">Select Work Type</option>
                  <option value="Construction">Construction</option>
                  <option value="Landscaping">Landscaping</option>
                  <option value="Cleaning">Cleaning</option>
                  {/* Add more work types as needed */}
                </select>
              )}
            />
          </div>

          {/* Number of Laborers Input */}
          <div className="mb-2">
            <label className="block text-xs md:text-sm font-medium text-gray-700">Number of Laborers Needed</label>
            <Controller
              name="numberOfLaborers"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="mt-1 p-2 md:p-3 border rounded w-full focus:outline-none focus:border-blue-500"
                />
              )}
            />
          </div>

          {/* Location Text Field */}
          <div className="mb-2">
            <label className="block text-xs md:text-sm font-medium text-gray-700">Location</label>
            <Controller
              name="location"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input {...field} type="text" className="mt-1 p-2 md:p-3 border rounded w-full focus:outline-none focus:border-blue-500" />
              )}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 md:py-3 px-6 md:px-8 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Search Local Labor
          </button>
        </form>

        {/* Get Started Button */}
        <button className="bg-white text-blue-500 py-2 md:py-3 px-6 md:px-8 rounded-full mt-2 md:mt-4 hover:bg-blue-100 focus:outline-none focus:shadow-outline-blue">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
