import React from "react";
import { useParams } from "react-router-dom";
import CreateTicketForm from "../CreateTicketForm";

export default function CreateTicketFormPage() {
  const { projectId } = useParams();

  return (
    <div
      className="min-h-screen w-full flex flex-col font-sans"
      style={{
        background: 'linear-gradient(to bottom, #a1e9ff, #2a7a8c, #1a1a1a)',
      }}
    >
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mt-12 sm:mt-16 mb-6 sm:mb-10 text-center text-white tracking-tight drop-shadow-lg">
        Let’s Fix Something!
      </h1>

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center px-4 pb-10 relative z-10">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl px-6 sm:px-10 py-8 sm:py-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-purple-700">
            Create a New Ticket
          </h2>
          <CreateTicketForm projectId={projectId} />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-3 sm:py-4 bg-black/30 text-cyan-100 font-semibold shadow-inner text-sm sm:text-base">
        &copy; 2025 Project Management App. All rights reserved.
      </footer>
    </div>
  );
}

