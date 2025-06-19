import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, onUpdateClick, onDeleteClick }) {
  return (
    <div className="rounded-xl shadow bg-white border p-6 flex flex-col items-center">
      <div className="font-bold text-indigo-700 text-lg mb-2 text-center">
        {project.name || project.title}
      </div>
      <div className="text-gray-600 text-sm mb-6 text-center min-h-[40px]">
        {project.description || "No description provided."}
      </div>
      <div className="flex flex-row gap-3 mt-auto">
        <a
          href={`/projects/${project._id}`}
          className="px-4 py-2 rounded text-sm font-semibold shadow transition
            bg-gradient-to-r from-indigo-400 to-indigo-600 text-white
            hover:from-indigo-500 hover:to-indigo-700"
        >
          View Details
        </a>
        <a
          href="https://github.com/Vanaja-Nannepaga/Project-Management-App.git"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded text-sm font-semibold shadow transition
            bg-gradient-to-r from-green-400 to-green-600 text-white
            hover:from-green-500 hover:to-green-700"
        >
          Github Link
        </a>
        <button
          className="px-4 py-2 rounded text-sm font-semibold shadow transition
            bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={() => onUpdateClick(project)}
        >
          Update
        </button>
        <button
          className="px-4 py-2 rounded text-sm font-semibold shadow transition
            bg-red-500 text-white hover:bg-red-700"
          onClick={() => onDeleteClick(project)}
        >
          Delete
        </button>
        {/* --- Add this Kanban Board button --- */}
        <Link
          to={`/projects/${project._id}/kanban`}
          className="px-4 py-2 rounded text-sm font-semibold shadow transition
            bg-gradient-to-r from-purple-400 to-purple-600 text-white
            hover:from-purple-500 hover:to-purple-700"
        >
          Kanban Board
        </Link>
        {/* --- End Kanban Board button --- */}
      </div>
    </div>
  );
}
