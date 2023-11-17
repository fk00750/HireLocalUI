import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import SignInPage from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import WorkerInfoForm from "./pages/WorkerInfoForm";
import WorkerProfile from "./pages/WorkerProfile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/worker-info-form" element={<WorkerInfoForm />} />
        <Route path="/worker-profile" element={<WorkerProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
