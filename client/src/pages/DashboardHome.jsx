import React, { useEffect, useState } from "react";
import axios from "../axios";

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
        className="bg-white rounded-xl p-8 shadow-lg flex flex-col min-w-[340px] w-full max-w-lg items-center"
        style={{ minWidth: 370 }}
      >
        <h2 className="text-xl font-bold mb-4 text-indigo-700 text-center">
          Update Project
        </h2>
        <div className="w-full flex flex-col gap-3 mb-5">
          <label className="font-semibold text-sm">Project Title</label>
          <input
            className="border p-2 rounded w-full"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <label className="font-semibold text-sm">Description</label>
          <textarea
            className="border p-2 rounded w-full resize-none"
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <label className="font-semibold text-sm mb-1 block">Team Members</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {members.map((member, idx) => (
              <span
                key={member.email}
                className={`px-3 py-1 rounded cursor-pointer transition-all ${
                  selectedIdx === idx
                    ? "bg-indigo-300 text-indigo-900 font-semibold"
                    : "bg-indigo-100 text-indigo-800"
                }`}
                onClick={() => setSelectedIdx(idx)}
                title="Click to select"
              >
                {member.name} ({member.email})
              </span>
            ))}
            {members.length === 0 && (
              <span className="text-gray-400 text-sm">No team members yet.</span>
            )}
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={newMemberName}
              onChange={e => setNewMemberName(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <input
              type="email"
              placeholder="Email"
              value={newMemberEmail}
              onChange={e => setNewMemberEmail(e.target.value)}
              className="border p-2 rounded flex-1"
            />
          </div>
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              className="bg-red-400 text-white px-4 py-2 rounded font-bold"
              onClick={handleRemoveMember}
              disabled={saving || selectedIdx == null}
            >
              Remove Selected
            </button>
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded font-bold"
              onClick={handleAddMember}
              disabled={saving || !newMemberName.trim() || !newMemberEmail.trim()}
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex gap-4 mt-2 justify-center w-full">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-2 rounded font-semibold"
            disabled={saving}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-semibold"
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

  // For update members modal
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

  // Handle update members modal open
  const handleUpdateClick = (project) => {
    setProjectToUpdate(project);
    setShowUpdateModal(true);
  };

  // When update modal closes, refresh projects and close modal
  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setProjectToUpdate(null);
    fetchProjects();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#facfdd" }}>
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
                className="rounded-xl shadow bg-white hover:bg-indigo-50 border border-indigo-100 p-6 transition flex flex-col items-center relative"
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
                  {/* Update Button */}
                  <button
                    className="px-4 py-2 rounded text-sm font-semibold shadow transition
                      bg-yellow-500 text-white hover:bg-yellow-600"
                    onClick={() => handleUpdateClick(project)}
                  >
                    Update
                  </button>
                  {/* Delete Button */}
                  <button
                    className="px-4 py-2 rounded text-sm font-semibold shadow transition
                      bg-red-500 text-white hover:bg-red-700"
                    onClick={() => handleDeleteClick(project)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete the project <span className="text-indigo-700">{projectToDelete?.name || projectToDelete?.title}</span>?
            </p>
            <div className="flex gap-6">
              <button
                onClick={confirmDelete}
                className="px-6 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="px-6 py-2 rounded bg-gray-300 font-bold hover:bg-gray-400"
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
  );
}
