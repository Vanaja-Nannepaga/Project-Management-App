import React from "react";
import { useNavigate } from "react-router-dom";

const Faq = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between font-sans">
      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-[#a1e9ff] via-[#2a7a8c] to-[#1a1a1a]" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-4 py-12">
        {/* Title Outside Box */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-1b1111 drop-shadow mb-10 text-center text-1b1111">
          Frequently Asked Questions
        </h2>

        {/* FAQ Box */}
        <div className="w-full max-w-4xl bg-white/95 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-14 border border-blue-200">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-2">How do I create a new project?</h3>
            <p className="text-blue-900 text-base sm:text-lg">
              Go to the dashboard and click on "Create Project". Fill in the details and submit to start managing your new project.
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-2">Can I invite team members?</h3>
            <p className="text-blue-900 text-base sm:text-lg">
              Yes! Open your project, go to the "Team" section, and send invitations via email to your team members.
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-2">Is there a way to track progress?</h3>
            <p className="text-blue-900 text-base sm:text-lg">
              Absolutely. Each project comes with built-in progress tracking and reporting tools available from your project overview.
            </p>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-2">How do I report a bug?</h3>
            <p className="text-blue-900 text-base sm:text-lg">
              Use the "Report Bug" option inside your project to submit details. Our team will address it as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute bottom-4 left-4 bg-white/80 hover:bg-white text-blue-800 font-semibold px-4 py-2 rounded-lg shadow transition duration-200 z-20"
      >
        ← Back
      </button>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-3 sm:py-4 bg-black/30 text-cyan-100 font-semibold shadow-inner text-sm sm:text-base">
        &copy; 2025 Project Management App. All rights reserved.
      </footer>
    </div>
  );
};

export default Faq;

