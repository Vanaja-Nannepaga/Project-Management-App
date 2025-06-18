import React, { useEffect, useState } from "react";
import axios from "../axios";

export default function DashboardHome() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/projects")
      .then(res => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    // Main background color set to #facfdd
    <div style={{ minHeight: "100vh", background: "#fbeaf3" }}>
      <h1 className="text-2xl font-bold text-indigo-700 mb-6 pt-8">Welcome to the Dashboard!</h1>
      <p className="mb-8 text-gray-700">
        Quickly access your projects below or use the sidebar to navigate.
      </p>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Projects</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map(project => (
              <div
                key={project._id}
                className="rounded-xl shadow bg-white hover:bg-indigo-50 border border-indigo-100 p-6 transition flex flex-col items-center"
              >
                <div className="font-bold text-indigo-700 text-lg mb-2 text-center">
                  {project.name || project.title || project.projectName || "No Name"}
                </div>
                <div className="text-gray-600 text-sm mb-6 text-center min-h-[40px]">
                  {project.description || "No description provided."}
                </div>
                <div className="flex flex-row gap-3 mt-auto">
                  <a
                    href={`/projects/${project._id}`}
                    className="px-4 py-2 rounded text-sm font-semibold transition"
                    style={{
                      background: "#ffe0ec",
                      color: "#a23c5c",
                      border: "none"
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = "#ffc2d9")}
                    onMouseOut={e => (e.currentTarget.style.background = "#ffe0ec")}
                  >
                    View Details
                  </a>
                  <a
                    href="https://github.com/Vanaja-Nannepaga/Project-Management-App.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded text-sm font-semibold transition"
                    style={{
                      background: "#e0f7fa",
                      color: "#16697a",
                      border: "none"
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = "#b2ebf2")}
                    onMouseOut={e => (e.currentTarget.style.background = "#e0f7fa")}
                  >
                    Github Link
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
