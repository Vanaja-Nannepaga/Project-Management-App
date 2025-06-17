import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateProjectForm from './CreateProjectForm';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const projectListRef = useRef(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

 useEffect(() => {
  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };
  fetchProjects();
}, []);
  const scrollToProjects = () => {
    if (projectListRef.current) {
      projectListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = async (projectId) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject({ ...project }); // Pass a copy!
    document.body.style.overflow = "hidden";
  };

  const handleUpdate = async (updatedProject) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `/api/projects/${updatedProject._id}`,
        {
          title: updatedProject.title,
          description: updatedProject.description,
          teamMembers: updatedProject.teamMembers
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingProject(null);
      document.body.style.overflow = "";
      fetchProjects();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      if (err.response) {
        console.log('Update error:', err.response.data, err.response.status);
      }
      alert('Failed to update project');
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    document.body.style.overflow = "";
  };

  // Updated: handle clicking the card (but NOT the edit/delete buttons)
  const handleCardClick = (projectId, e) => {
    // Prevent navigation if click is on Edit or Delete
    if (e.target.closest('button')) return;
    navigate(`/projects/${projectId}`);
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 50%, #e9d5ff 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {showSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 font-semibold text-lg">
          Updated successfully
        </div>
      )}

      <section
        className="w-full h-screen flex flex-col items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 drop-shadow-sm tracking-tight">
          Your Projects
        </h1>
        <div className="w-full max-w-xl px-4">
          <CreateProjectForm onProjectCreated={fetchProjects} />
        </div>
        <button
          className="mt-10 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
          onClick={scrollToProjects}
        >
          View Project List ↓
        </button>
      </section>

      <section ref={projectListRef} className="w-full pt-8 pb-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-200 flex flex-col justify-between"
              style={{ cursor: "pointer" }}
              onClick={(e) => handleCardClick(project._id, e)}
            >
              <h2 className="font-bold text-xl mb-1 text-indigo-700">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex gap-4 mt-auto">
                <button
                  className="text-indigo-600 hover:underline font-semibold"
                  onClick={e => { e.stopPropagation(); handleEdit(project); }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline font-semibold"
                  onClick={e => { e.stopPropagation(); handleDelete(project._id); }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {editingProject && (
        <EditProjectModal
          key={editingProject._id}
          project={editingProject}
          onCancel={handleCancelEdit}
          onUpdate={handleUpdate}
          fetchProjects={fetchProjects}
        />
      )}
    </div>
  );
};

// Full-screen modal for editing project
function EditProjectModal({ project, onCancel, onUpdate, fetchProjects }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl relative">
        <EditProjectForm
          project={project}
          onCancel={onCancel}
          onUpdate={onUpdate}
          fetchProjects={fetchProjects}
        />
      </div>
    </div>
  );
}

function EditProjectForm({ project, onCancel, onUpdate, fetchProjects }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [teamMembers, setTeamMembers] = useState(
    Array.isArray(project.teamMembers)
      ? project.teamMembers.map(m => typeof m === "object"
        ? m
        : { name: m.split('@')[0], email: m })
      : []
  );
  const [addMode, setAddMode] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setTitle(project.title);
    setDescription(project.description);
    setTeamMembers(
      Array.isArray(project.teamMembers)
        ? project.teamMembers.map(m => typeof m === "object"
          ? m
          : { name: m.split('@')[0], email: m })
        : []
    );
    setAddMode(false);
    setNewMemberName('');
    setNewMemberEmail('');
    setSelected(null);
  }, [project]);

  const handleAddMember = async () => {
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `/api/projects/${project._id}/add-member`,
        { email: newMemberEmail, name: newMemberName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTeamMembers([...teamMembers, { name: newMemberName, email: newMemberEmail }]);
      setNewMemberName('');
      setNewMemberEmail('');
      setAddMode(false);
      fetchProjects();
    } catch (err) {
      alert('Failed to add member');
    }
  };

  const handleDeleteMember = async () => {
    if (selected === null) return;
    const token = localStorage.getItem('token');
    try {
      const member = teamMembers[selected];
      await axios.post(
        `/api/projects/${project._id}/remove-member`,
        { email: member.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTeamMembers(teamMembers.filter((_, idx) => idx !== selected));
      setSelected(null);
      fetchProjects();
    } catch (err) {
      alert('Failed to remove member');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mappedMembers = teamMembers.map(m => ({ name: m.name, email: m.email }));
    onUpdate({ ...project, title, description, teamMembers: mappedMembers });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white p-2 sm:p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl">
      <div className="flex flex-col gap-2">
        <label className="text-lg font-extrabold text-indigo-900">Project Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-indigo-200 p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-extrabold text-indigo-900">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-indigo-200 p-2 rounded"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-extrabold text-indigo-900">Team Members</label>
        <div className="flex flex-wrap gap-2">
          {teamMembers.length === 0 && (
            <span className="text-gray-400 text-sm">No team members yet.</span>
          )}
          {teamMembers.map((member, idx) => (
            <span
              key={member.email || idx}
              className={`cursor-pointer px-3 py-1 rounded ${
                selected === idx
                  ? "bg-indigo-200 text-indigo-800 font-semibold"
                  : "text-indigo-700 hover:bg-indigo-50"
              }`}
              onClick={() => setSelected(idx)}
              title="Click to select this member"
            >
              {member.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center justify-start">
        {addMode && (
          <>
            <input
              type="text"
              value={newMemberName}
              onChange={e => setNewMemberName(e.target.value)}
              placeholder="Name"
              className="border border-indigo-200 p-2 rounded flex-1 min-w-[8rem] max-w-[12rem]"
            />
            <input
              type="email"
              value={newMemberEmail}
              onChange={e => setNewMemberEmail(e.target.value)}
              placeholder="Email"
              className="border border-indigo-200 p-2 rounded flex-1 min-w-[12rem] max-w-[18rem]"
            />
            <button
              type="button"
              onClick={handleAddMember}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
              disabled={!newMemberName.trim() || !newMemberEmail.trim()}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => { setAddMode(false); setNewMemberName(''); setNewMemberEmail(''); }}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded font-semibold"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-3 items-center justify-end mt-2">
        {!addMode && (
          <button
            type="button"
            onClick={() => setAddMode(true)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded font-bold"
          >
            Add Member
          </button>
        )}
        <button
          type="button"
          onClick={handleDeleteMember}
          className={`bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded font-bold ${
            selected === null ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selected === null}
        >
          Delete Member
        </button>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded font-bold"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Dashboard;
