// SignIn.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { API } from "../api";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success && data.token) {
          dispatch({
            type: "LOGIN",
            payload: { token: data.token, role: data.role },
          });
        }

        if (data.role === 2) {
          navigate("/profile");
        } else if (data.role === 3) {
          navigate("/worker-profile");
        }
      } else {
        console.error("User login failed");
      }
    } catch (error) {
      console.error("Error during user login:", error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = { ...errors };

    // Email validation
    if (
      !formData.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
    ) {
      updatedErrors.email = "Invalid email or mobile";
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
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          {/* Email/Mobile Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Mobile
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email or mobile"
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
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

          {/* Sign In Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
