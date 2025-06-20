import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between font-sans">
      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-[#a1e9ff] via-[#2a7a8c] to-[#1a1a1a]" />

      {/* Title */}
      <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold text-1b1111 drop-shadow text-center mt-12 mb-6">
        About Project Management App
      </h2>

      {/* Content Box */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-4 pb-8">
        <div className="w-full max-w-4xl bg-white/95 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-14 border border-blue-200">
          <section className="text-blue-900 text-base sm:text-lg md:text-xl space-y-6 text-justify">
            <p>
              The Project Management App is built to help teams collaborate effectively, streamline workflows, and track project progress.
            </p>

            <p>
              🧭 <strong>Dashboard:</strong> From the dashboard, users can create new projects, view existing ones, and invite team members. It serves as the central hub for all project activity.
            </p>

            <p>
              🧩 <strong>Kanban Board:</strong> Each project features a drag-and-drop Kanban board with “To Do”, “In Progress”, and “Done” columns. This board helps visualize task statuses and manage workflow easily.
            </p>

            <p>
              🐞 <strong>Ticket Management:</strong> Within each project, users can report bugs or feature requests as tickets. These tickets can be assigned priorities, linked to team members, and updated as progress is made.
            </p>

            <p>
              🔎 <strong>Filters & Collaboration:</strong> Users can filter tickets by assignee, priority, or status, and use comments to collaborate with teammates directly under each issue.
            </p>
          </section>
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

export default About;

