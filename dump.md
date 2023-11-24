// import React, { useState } from "react";
// import { AiOutlineMenu } from "react-icons/ai";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { dispatch, state } = useAuth();

//   return (
//     <nav className="bg-gray-800 p-4 flex items-center justify-between">
//       {/* Logo */}
//       <div className="text-white font-bold text-lg">Your Logo</div>

//       {/* Mobile Menu Toggle */}
//       <div className="md:hidden relative">
//         <button
//           className="text-white"
//           onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <AiOutlineMenu size={24} />
//         </button>
//         {/* Dropdown Menu */}
//         {isMobileMenuOpen && (
//           <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg">
//             {/* Add your mobile menu items here */}
//             <a href="#" className="block px-4 py-2">
//               Home
//             </a>
//             <a href="#" className="block px-4 py-2">
//               About
//             </a>
//             <a href="#" className="block px-4 py-2">
//               Service
//             </a>
//             <a href="#" className="block px-4 py-2">
//               {state.role === 2 ? "Profile" : "Worker Profile"}
//             </a>

//             {/* Conditional rendering based on authentication */}
//             {state.isAuthenticated ? (
//               <button
//                 onClick={() => {
//                   dispatch({ type: "LOGOUT" });
//                 }}
//                 className="bg-blue-500 text-white px-4 py-2 rounded mt-2 md:hidden mx-1 my-2"
//               >
//                 Log Out
//               </button>
//             ) : (
//               <Link to="/signin">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 md:hidden mx-1 my-2">
//                   Sign In
//                 </button>
//               </Link>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Button (visible on medium and larger screens) */}
//       <div className="hidden md:block">
//         {state.isAuthenticated ? (
//           <button
//             onClick={() => {
//               dispatch({ type: "LOGOUT" });
//             }}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Log Out
//           </button>
//         ) : (
//           <button className="bg-blue-500 text-white px-4 py-2 rounded">
//             Sign In
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




























import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../state/AuthContext";
import { API } from "../api";

const JobForm = () => {
  const { control, handleSubmit } = useForm();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const { state } = useAuth();

  const onSubmit = async (data) => {
    try {
      // Make a POST request to your API
      const response = await fetch(`${API}/post-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Job posted successfully
        console.log("Job posted successfully");
        setFormData(data); // Update the form data state for display
      } else {
        // Handle API error
        const errorData = await response.json();
        setSubmissionError(errorData.message || "Failed to post job");
      }
    } catch (error) {
      console.error("Error during job post:", error.message);
      setSubmissionError("Failed to post job");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-4 md:p-6 rounded-md shadow-md"
    >
      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-xs md:text-sm font-medium text-gray-700">
          Job Title
        </label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 p-2 md:p-3 border rounded w-full focus:outline-none focus:border-blue-500 text-gray-800"
            />
          )}
        />
      </div>
      {/* Description Textarea */}
      <div className="mb-4">
        <label className="block text-xs md:text-sm font-medium text-gray-700">
          Job Description
        </label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              rows="4"
              className="mt-1 p-2 md:p-3 border rounded w-full focus:outline-none focus:border-blue-500 text-gray-800"
            />
          )}
        />
      </div>
      {/* Work Type Dropdown */}
      <div className="mb-4">
        <label className="block text-xs md:text-sm font-medium text-gray-700">
          Select Work Type
        </label>
        <Controller
          name="workType"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <select
              {...field}
              className="mt-1 p-2 md:p-3 border rounded w-full focus:outline-none focus:border-blue-500 text-gray-800"
            >
              <option value="">Select Work Type</option>
              <option value="Construction">Hourly</option>
              <option value="Landscaping">Daily</option>
              <option value="Cleaning">Weekly</option>
              {/* Add more work types as needed */}
            </select>
          )}
        />
      </div>
      {/* Number of Laborers Input */}
      <div className="mb-4">
        <label className="block text-xs md:text-sm font-medium text-gray-700">
          Number of Laborers Needed
        </label>
        <Controller
          name="numberOfLaborers"
          control={control}
          defaultValue={1}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="mt-1 p-2 md:p-3 border rounded w-full focus:outline-none focus:border-blue-500 text-gray-800"
            />
          )}
        />
      </div>
      {/* Location Text Field */}
      <div className="mb-4">
        <label className="block text-xs md:text-sm font-medium text-gray-700">
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
              className="mt-1 p-2 md:p-3 border rounded w-full focus:outline-none focus:border-blue-500 text-gray-800"
            />
          )}
        />
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 md:py-3 px-6 md:px-8 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Post Job
      </button>
      {submissionError && (
        <div className="mt-4 text-red-500">
          <p>{submissionError}</p>
        </div>
      )}
    </form>
  );
};

export default JobForm;
