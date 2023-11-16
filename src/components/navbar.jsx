import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "../state/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-white font-bold text-lg">Your Logo</div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden relative">
        <button
          className="text-white"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AiOutlineMenu size={24} />
        </button>
        {/* Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg">
            {/* Add your mobile menu items here */}
            <a href="#" className="block px-4 py-2">
              Home
            </a>
            <a href="#" className="block px-4 py-2">
              About
            </a>
            <a href="#" className="block px-4 py-2">
              Service
            </a>
            <a href="#" className="block px-4 py-2">
              Contact
            </a>

            {/* Conditional rendering based on authentication */}
            {state.isAuthenticated ? (
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 md:hidden mx-1 my-2">
                Profile
              </button>
            ) : (
              <Link to="/signin">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 md:hidden mx-1 my-2">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Button (visible on medium and larger screens) */}
      <div className="hidden md:block">
        {state.isAuthenticated ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Profile
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
