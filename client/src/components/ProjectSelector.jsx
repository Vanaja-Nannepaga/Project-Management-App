import React, { useEffect, useState } from "react";
import axios from "../axios";

export default function ProjectSelector({ value, onChange }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/projects")
      .then(res => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <div className="mb-2 font-semibold text-indigo-700">Choose Project:</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {projects.map(project => (
          <button
            type="button"
            key={project._id}
            onClick={() => onChange(project._id)}
            className={`rounded-lg shadow p-6 text-center transition border-2 
              ${value === project._id ? 'border-indigo-500 bg-indigo-50' : 'border-transparent bg-white'}
              hover:border-indigo-400 hover:bg-indigo-100`}
          >
            <div className="font-bold text-indigo-700 text-lg">
              {project.name || project.title || project.projectName || "No Name"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
