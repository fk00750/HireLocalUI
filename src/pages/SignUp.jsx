import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../api";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "hirer", // Default role
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }

      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User registered successfully!");

        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
        });

        navigate("/signin");
      } else {
        console.error("User registration failed");
      }
    } catch (error) {
      console.error("Error during user registration:", error.message);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = { ...errors };

    // Name validation
    if (!formData.name.match(/^[A-Za-z\s]+$/)) {
      updatedErrors.name = "Invalid name";
      isValid = false;
    }

    // Email validation
    if (
      !formData.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
    ) {
      updatedErrors.email = "Invalid email";
      isValid = false;
    }

    // Mobile validation
    if (!formData.mobile.match(/^\d{10}$/)) {
      updatedErrors.mobile = "Invalid mobile number";
      isValid = false;
    }

    // Password validation
    if (
      !formData.password.match(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{;,:'".<>/?]).{8,}$/
      )
    ) {
      updatedErrors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, digit, and special character.";
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Mobile Input */}
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.mobile ? "border-red-500" : ""
              }`}
              placeholder="Enter your mobile number"
              onChange={handleChange}
              required
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Who Are You?
            </label>
            <div className="mt-1">
              <input
                type="radio"
                id="hirer"
                name="role"
                value="hirer"
                checked={formData.role === "hirer"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="hirer" className="mr-4">
                Hirer
              </label>
              <input
                type="radio"
                id="worker"
                name="role"
                value="worker"
                checked={formData.role === "worker"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="worker">Worker</label>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Sign Up
          </button>

          {/* Sign In Link */}
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
