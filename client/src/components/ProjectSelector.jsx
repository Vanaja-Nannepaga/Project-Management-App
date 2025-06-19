import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectSelector() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios.get("/projects")
      .then(res => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (params.id) setSelected(params.id);
    else setSelected("");
  }, [params.id]);

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="flex items-center gap-2 mb-8">
      <label htmlFor="project-dropdown" className="font-semibold text-indigo-700">
        Choose Project:
      </label>
      <select
        id="project-dropdown"
        className="px-4 py-2 rounded-lg border border-indigo-300 bg-white shadow-sm text-indigo-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 max-w-xs"
        value={selected}
        onChange={e => {
          setSelected(e.target.value);
          if (e.target.value) {
            navigate(`/projects/${e.target.value}`);
          }
        }}
      >
        <option value="">Select...</option>
        {projects.map(project => (
          <option key={project._id} value={project._id}>
            {project.name || project.title || project.projectName || "No Name"}
          </option>
        ))}
      </select>
    </div>
  );
}
