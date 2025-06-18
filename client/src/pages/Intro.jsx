import React from "react";
import { useNavigate } from "react-router-dom";

const description =
  "Collaborate with your team, track progress, and manage tasks efficiently. Organize projects, report bugs, and work together seamlessly.";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative flex flex-col overflow-hidden font-sans">
      {/* Impressive, bright, and smooth Yin-Yang S-curve SVG */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minHeight: "100vh" }}
      >
        {/* Right side (brighter) */}
        <rect x="0" y="0" width="1440" height="900" fill="#f1faff" />
        {/* Left side (brighter blue), with a wavy S-curve */}
        <path
          d="
            M0,0
            L0,900
            Q 480,750 650,600
            Q 830,430 1200,700
            Q 1380,810 1440,730
            L1440,0
            Z
          "
          fill="#ccebff"
        />
      </svg>

      {/* NAVBAR */}
      <nav className="relative z-10 w-full flex justify-end items-center px-12 py-8">
        <div className="flex gap-6">
          <button
            className="bg-white/90 hover:bg-blue-700 hover:text-white text-blue-900 font-semibold px-7 py-2 rounded-full shadow-md transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-white/90 hover:bg-blue-700 hover:text-white text-blue-900 font-semibold px-7 py-2 rounded-full shadow-md transition"
            onClick={() => navigate("/about")}
          >
            About
          </button>
          <button
            className="bg-white/90 hover:bg-blue-700 hover:text-white text-blue-900 font-semibold px-7 py-2 rounded-full shadow-md transition"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>
          <button
            className="bg-white/90 hover:bg-blue-700 hover:text-white text-blue-900 font-semibold px-7 py-2 rounded-full shadow-md transition"
            onClick={() => navigate("/faq")}
          >
            FAQ
          </button>
        </div>
      </nav>

      {/* TITLE & DESCRIPTION, left, spacious */}
      <div className="relative z-10 flex-1 flex flex-col items-start justify-center pl-[8vw]">
        <div className="max-w-2xl flex flex-col items-start gap-8">
          <h1
            className="text-6xl md:text-7xl font-extrabold text-blue-800 leading-tight mb-2 drop-shadow"
            style={{ lineHeight: "1.1", letterSpacing: ".02em" }}
          >
            Project<br />Management
          </h1>
          <p
            className="text-2xl text-blue-900 font-medium leading-relaxed drop-shadow"
            style={{ maxWidth: "36rem" }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* COPYRIGHT FOOTER */}
      <footer className="relative z-10 w-full text-center py-4 bg-white/80 text-blue-800 font-semibold shadow-inner">
        &copy; 2025 Project Management App. All rights reserved.
      </footer>
    </div>
  );
};

export default Intro;
