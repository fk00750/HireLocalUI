// HeroSection.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import JobForm from "./JobForm";

function HeroSection() {
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
        <JobForm />

        {/* Get Started Button */}
        <button className="bg-white text-blue-500 py-2 md:py-3 px-6 md:px-8 rounded-full mt-2 md:mt-4 hover:bg-blue-100 focus:outline-none focus:shadow-outline-blue">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
