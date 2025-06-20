import React, { useEffect, useState } from "react";
import axios from "../axios";
import ProjectCard from "../components/ProjectCard";

function UpdateMembersModal({ project, onClose, onUpdated }) {
  const [title, setTitle] = useState(project?.name || project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [members, setMembers] = useState(project?.teamMembers || []);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(project?.name || project?.title || "");
    setDescription(project?.description || "");
    setMembers(project?.teamMembers || []);
    setNewMemberName("");
    setNewMemberEmail("");
    setSelectedIdx(null);
  }, [project]);

  const handleAddMember = async () => {
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;
    setSaving(true);
    try {
      await axios.post(`/projects/${project._id}/add-member`, {
        name: newMemberName,
        email: newMemberEmail
      });
      setMembers([...members, { name: newMemberName, email: newMemberEmail }]);
      setNewMemberName("");
      setNewMemberEmail("");
      if (onUpdated) onUpdated();
    } catch (err) {
      alert("Failed to add member");
    }
    setSaving(false);
  };

  const handleRemoveMember = async () => {
    if (selectedIdx == null || !members[selectedIdx]) return;
    setSaving(true);
    try {
      await axios.post(`/projects/${project._id}/remove-member`, {
        email: members[selectedIdx].email
      });
      setMembers(members.filter((_, idx) => idx !== selectedIdx));
      setSelectedIdx(null);
      if (onUpdated) onUpdated();
    } catch (err) {
      alert("Failed to remove member");
    }
    setSaving(false);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`/projects/${project._id}`, {
        name: title,
        description,
        teamMembers: members,
      });
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      alert("Failed to update project info");
    }
    setSaving(false);
  };

  if (!project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
     
   
     
<form
  onSubmit={handleUpdateProject}
  className="rounded-xl p-4 sm:p-6 shadow-xl w-full max-w-lg mx-4 overflow-y-auto max-h-[90vh] flex flex-col bg-indigo-100"
>
  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-900 text-center">
    Update Project
  </h2>

  <div className="flex flex-col gap-3 mb-5">
    <label className="font-semibold text-sm text-indigo-800">Project Title</label>
    <input
      className="border border-indigo-300 p-2 rounded w-full focus:ring-2 focus:ring-indigo-400"
      value={title}
      onChange={e => setTitle(e.target.value)}
      required
    />
    <label className="font-semibold text-sm text-indigo-800">Description</label>
    <textarea
      className="border border-indigo-300 p-2 rounded w-full resize-none focus:ring-2 focus:ring-indigo-400"
      rows={2}
      value={description}
      onChange={e => setDescription(e.target.value)}
      required
    />
  </div>

  <div className="w-full mb-4">
    <label className="font-semibold text-sm text-indigo-800 mb-1 block">Team Members</label>
    <div className="flex flex-wrap gap-2 mb-2">
      {members.map((member, idx) => (
        <span
          key={member.email}
          className={`px-3 py-1 rounded cursor-pointer text-sm transition-all ${
            selectedIdx === idx
              ? "bg-indigo-300 text-indigo-900 font-semibold"
              : "bg-indigo-200 text-indigo-800"
          }`}
          onClick={() => setSelectedIdx(idx)}
          title="Click to select"
        >
          {member.name} ({member.email})
        </span>
      ))}
      {members.length === 0 && (
        <span className="text-gray-500 text-sm">No team members yet.</span>
      )}
    </div>

    <div className="flex flex-col sm:flex-row gap-2 mb-3">
      <input
        type="text"
        placeholder="Name"
        value={newMemberName}
        onChange={e => setNewMemberName(e.target.value)}
        className="border border-indigo-300 p-2 rounded flex-1 focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="email"
        placeholder="Email"
        value={newMemberEmail}
        onChange={e => setNewMemberEmail(e.target.value)}
        className="border border-indigo-300 p-2 rounded flex-1 focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
      <button
        type="button"
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold"
        onClick={handleRemoveMember}
        disabled={saving || selectedIdx == null}
      >
        Remove Selected
      </button>
      <button
        type="button"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-bold"
        onClick={handleAddMember}
        disabled={saving || !newMemberName.trim() || !newMemberEmail.trim()}
      >
        Add Member
      </button>
    </div>
  </div>

  <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
    <button
      type="submit"
      className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-semibold"
      disabled={saving}
    >
      Save Changes
    </button>
    <button
      type="button"
      className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-semibold"
      onClick={onClose}
      disabled={saving}
    >
      Close
    </button>
  </div>
</form>

      
      
      
    </div>
  );
}

export default function DashboardHome() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [projectToUpdate, setProjectToUpdate] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await axios.get("/projects");
    setProjects(res.data);
    setLoading(false);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await axios.delete(`/projects/${projectToDelete._id}`);
      setProjects(projects.filter(p => p._id !== projectToDelete._id));
      setShowDeleteModal(false);
      setProjectToDelete(null);
    } catch (err) {
      alert("Failed to delete project.");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleUpdateClick = (project) => {
    setProjectToUpdate(project);
    setShowUpdateModal(true);
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setProjectToUpdate(null);
    fetchProjects();
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Matching Gradient Background */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-[#a1e9ff] via-[#2a7a8c] to-[#1a1a1a]"></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
          Welcome to the Dashboard!
        </h1>
        <p className="mb-6 sm:mb-8 text-1b1111/90">
          Quickly access your projects below or use the sidebar to navigate.
        </p>
        
      
{loading ? (
  <div className="text-center py-8 text-white">Loading projects...</div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {projects.map(project => (
      <ProjectCard
        key={project._id}
        project={project}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick}
      />
    ))}
  </div>
)}


        {/* Modal for Delete Confirmation */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg flex flex-col items-center w-full max-w-md mx-4">
              <p className="text-lg font-semibold mb-4 text-center">
                Are you sure you want to delete the project <span className="text-indigo-700">{projectToDelete?.name || projectToDelete?.title}</span>?
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

        {/* Modal for Update Members/Project Info */}
        {showUpdateModal && (
          <UpdateMembersModal
            project={projectToUpdate}
            onClose={handleUpdateModalClose}
            onUpdated={fetchProjects}
          />
        )}
      </div>
      <footer className="relative z-10 w-full text-center text-cyan-100 font-semibold text-sm sm:text-base mt-4">
  &copy; 2025 Project Management App. All rights reserved.
</footer>

    </div>
  );
}
