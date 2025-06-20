import React from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, LayoutDashboard } from "lucide-react"; // Icon imports

export default function ProjectCard({ project, onUpdateClick, onDeleteClick }) {
  return (
    <div className="relative rounded-xl shadow-lg overflow-hidden h-full min-h-[250px]">
      {/* New Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#a1e9ff] via-[#2a7a8c] to-[#1a1a1a]"></div>
      
      {/* Card Content */}
      <div className="relative z-10 bg-white h-full flex flex-col p-4 sm:p-6 rounded-xl shadow-inner">
        <div className="font-bold text-gray-800 text-lg mb-2 text-center">
          {project.name || project.title}
        </div>
        <div className="text-gray-700 text-sm mb-4 sm:mb-6 text-center min-h-[40px]">
          {project.description || "No description provided."}
        </div>

        {/* Buttons - Responsive layout */}
        <div className="flex flex-wrap justify-center gap-2 mt-auto">
          <Link
            to={`/projects/${project._id}`}
            className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition
              bg-[#95d2e1] text-sky-900 hover:bg-[#7cc6da] whitespace-nowrap"
          >
            <Eye className="w-4 h-4" /> View
          </Link>

          <button
            className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition
              bg-[#95d2e1] text-sky-900 hover:bg-[#7cc6da] whitespace-nowrap"
            onClick={() => onUpdateClick(project)}
          >
            <Pencil className="w-4 h-4" /> Update
          </button>

          <Link
            to={`/projects/${project._id}/kanban`}
            className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition
              bg-[#95d2e1] text-sky-900 hover:bg-[#7cc6da] whitespace-nowrap"
          >
            <LayoutDashboard className="w-4 h-4" /> Kanban
          </Link>
        </div>
      </div>
    </div>
  );
}

