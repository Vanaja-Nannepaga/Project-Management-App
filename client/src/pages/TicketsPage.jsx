import React, { useEffect, useState } from "react";
import axios from "../axios";
import TicketList from "../components/TicketList";
import { useNavigate } from "react-router-dom";

export default function TicketsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [team, setTeam] = useState([]);
  const [ticketListKey, setTicketListKey] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/projects")
      .then(res => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedProject) {
      axios.get(`/projects/${selectedProject._id}/team`)
        .then(res => setTeam(res.data))
        .catch(() => setTeam([]));
    }
  }, [selectedProject]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Tickets</h2>
      <div className="mb-6">
        <div className="font-semibold text-indigo-700 mb-2">Select a Project:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            <div>Loading projects...</div>
          ) : projects.length === 0 ? (
            <div>No projects found.</div>
          ) : (
            projects.map(project => (
              <button
                key={project._id}
                onClick={() => {
                  setSelectedProject(project);
                }}
                className={`rounded-lg shadow p-5 w-full text-center transition border-2 font-medium
                  ${selectedProject?._id === project._id 
                    ? "border-indigo-500 bg-indigo-50 text-indigo-800"
                    : "border-transparent bg-white text-indigo-700"}
                  hover:border-indigo-400 hover:bg-indigo-100`}
              >
                <div className="text-lg font-bold mb-1">
                  {project.name || project.title || project.projectName || "No Name"}
                </div>
                <div className="text-gray-500 text-sm">
                  {project.description || "No description"}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
      {selectedProject && (
        <div className="my-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-semibold text-indigo-700 text-lg">
                {selectedProject.name || selectedProject.title || selectedProject.projectName || "Project"}
              </span>
              <span className="ml-2 text-gray-500 text-sm">
                Tickets
              </span>
            </div>
           
          </div>
          <TicketList key={ticketListKey} projectId={selectedProject._id} />
        </div>
      )}
      {!selectedProject && (
        <div className="text-gray-500 mt-10 text-center">
          Please select a project to view tickets.
        </div>
      )}
    </div>
  );
}
