import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { Eye, Github, Trash2 } from "lucide-react";


export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    axios.get("/projects")
      .then(res => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await axios.delete(`/projects/${projectToDelete._id}`);
      setProjects(projects.filter(p => p._id !== projectToDelete._id));
      setProjectToDelete(null);
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  const cancelDelete = () => {
    setProjectToDelete(null);
  };

  return (
    <div className="relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#a1e9ff] via-[#2a7a8c] to-[#1a1a1a] z-0"></div>
      
      <div className="relative z-10 p-6">
        <h2 className="text-2xl font-bold mb-6 text-black drop-shadow-lg">Projects</h2>
        
        {loading ? (
          <div className="text-center py-8 text-white">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div
                key={project._id}
                className="relative rounded-xl shadow-lg overflow-hidden min-h-[250px]"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#a1e9ff] via-[#2a7a8c] to-[#1a1a1a] opacity-20"></div>
                
                {/* Card Content */}
                <div className="relative z-10 bg-white/90 backdrop-blur-sm h-full flex flex-col p-6">
                  <div className="font-bold text-gray-800 text-lg mb-4 text-center">
                    {project.name || project.title || "No Name"}
                  </div>
                  <div className="text-gray-600 text-sm mb-6 text-center">
                    {project.description || "No description provided"}
                  </div>
             
                  
                  {/* Buttons */}
       <div className="flex flex-wrap justify-center gap-2 mt-auto">
  <Link
    to={`/projects/${project._id}`}
    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition
         bg-[#95d2e1] text-sky-900 hover:bg-[#7cc6da] whitespace-nowrap"
  >
    <Eye className="w-4 h-4" /> View Details
  </Link>

<a
  href="https://github.com/Vanaja-Nannepaga/Project-Management-App.git"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition
       bg-[#95d2e1] text-sky-900 hover:bg-[#7cc6da] whitespace-nowrap"
>
  <Github className="w-4 h-4" /> GitHub
</a>


  <button
    onClick={() => setProjectToDelete(project)}
    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition
       bg-[#95d2e1] text-sky-900 hover:bg-[#7cc6da] whitespace-nowrap"
  >
    <Trash2 className="w-4 h-4" /> Delete
  </button>


                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg flex flex-col items-center w-full max-w-md mx-4">
            <p className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete the project{" "}
              <span className="text-indigo-700">{projectToDelete.name || projectToDelete.title}</span>?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={confirmDelete}
                className="px-6 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-700 w-full sm:w-auto"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="px-6 py-2 rounded bg-gray-300 font-bold hover:bg-gray-400 w-full sm:w-auto"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

