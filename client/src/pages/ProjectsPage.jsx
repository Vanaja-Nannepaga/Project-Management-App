import React, { useEffect, useState } from "react";
import axios from "../axios";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/projects")
      .then(res => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-indigo-700">Projects</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project._id}
              className="rounded-xl shadow bg-white hover:bg-indigo-50 border border-indigo-100 p-6 transition flex flex-col items-center"
            >
              <div className="font-bold text-indigo-700 text-lg mb-6 text-center">
                {project.name || project.title || project.projectName || "No Name"}
              </div>
              <a
                href={`/projects/${project._id}`}
                className="inline-block px-4 py-2 rounded bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
