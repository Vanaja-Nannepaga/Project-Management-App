import React from "react";
import { useNavigate } from "react-router-dom";
import projectManagementImage from "./project-management.png";

const description =
  "Collaborate with your team, track progress, and manage tasks efficiently. Organize projects, report bugs, and work together seamlessly.";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative flex flex-col overflow-hidden font-sans">
      {/* New Gradient Background */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-[#a1e9ff] via-[#2a7a8c] to-[#1a1a1a]" />

      {/* NAVBAR */}
      <nav className="relative z-10 w-full flex justify-between items-center px-4 sm:px-12 py-4 sm:py-8">
        {/* Left: Logo + Bug Tracker */}
        <div className="flex items-center gap-2">
          <img
            src="/favicon.ico"
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <span className="text-white font-bold text-lg sm:text-xl tracking-wide">
            Bug Tracker
          </span>
        </div>

        {/* Right: Navigation Buttons */}
        <div className="flex flex-wrap justify-end gap-2 sm:gap-6">
          <button
            className="bg-white/90 hover:bg-cyan-600 hover:text-white text-gray-800 font-semibold px-4 sm:px-7 py-2 rounded-full shadow-md transition text-sm sm:text-base"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-white/90 hover:bg-cyan-600 hover:text-white text-gray-800 font-semibold px-4 sm:px-7 py-2 rounded-full shadow-md transition text-sm sm:text-base"
            onClick={() => navigate("/about")}
          >
            About
          </button>
          <button
            className="bg-white/90 hover:bg-cyan-600 hover:text-white text-gray-800 font-semibold px-4 sm:px-7 py-2 rounded-full shadow-md transition text-sm sm:text-base"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>
          <button
            className="bg-white/90 hover:bg-cyan-600 hover:text-white text-gray-800 font-semibold px-4 sm:px-7 py-2 rounded-full shadow-md transition text-sm sm:text-base"
            onClick={() => navigate("/faq")}
          >
            FAQ
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT WITH IMAGE */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-[8vw] py-8 sm:py-12">
        {/* Text Content (Left Side) */}
        <div className="max-w-2xl flex flex-col items-start gap-4 sm:gap-8 mb-6 sm:mb-10 lg:mb-0 lg:pl-[4vw] xl:pl-[8vw] mt-[-1rem]">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight mb-2 drop-shadow-lg"
            style={{ lineHeight: "1.1", letterSpacing: ".02em" }}
          >
            Project<br />Management
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-cyan-50 font-medium leading-relaxed drop-shadow-lg"
            style={{ maxWidth: "36rem" ,  color: "black"}}
          >
            {description}
          </p>
        </div>

        {/* Image (Right Side) */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-4 sm:mt-8 lg:mt-0 px-4 sm:px-0">
          <img
            src={projectManagementImage}
            alt="Project Management Illustration"
            className="w-full max-w-[480px] md:max-w-[520px] lg:max-w-[540px] h-auto"
            style={{
              boxShadow: "none",
              border: "none",
              background: "transparent",
            }}
          />
        </div>
      </div>

      {/* COPYRIGHT FOOTER */}
      <footer className="relative z-10 w-full text-center py-3 sm:py-4 bg-black/30 text-cyan-100 font-semibold shadow-inner text-sm sm:text-base">
        &copy; 2025 Project Management App. All rights reserved.
      </footer>
    </div>
  );
};

export default Intro;

