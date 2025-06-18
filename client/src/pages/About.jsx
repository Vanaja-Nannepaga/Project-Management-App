import React from "react";

const About = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 font-sans px-4">
    <div className="max-w-4xl w-full bg-white/95 rounded-2xl shadow-2xl p-14 mt-24 mb-14 border border-blue-200">
      <h2 className="text-5xl font-bold text-blue-800 mb-8 drop-shadow">About Project Management App</h2>
      <p className="text-2xl text-blue-900 mb-6">
        Project Management App is designed to help teams collaborate efficiently, track progress, and manage tasks with ease.
        Our platform provides tools to organize projects, assign responsibilities, report bugs, and facilitate seamless teamwork.
      </p>
      <p className="text-2xl text-blue-900 mb-6">
        Whether you are working on software development, marketing campaigns, or business operations, this app streamlines your workflow, centralizes communication, and boosts productivity.
      </p>
      <p className="text-2xl text-blue-900">
        We are committed to delivering a robust and user-friendly solution for all your project management needs.
      </p>
    </div>
  </div>
);

export default About;
