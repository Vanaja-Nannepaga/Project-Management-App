import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CreateProjectForm from './CreateProjectForm';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const projectListRef = useRef(null);

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
    fetchProjects();
  }, []);

  // Scroll to Project List handler
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
    setEditingProject(project);
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
      fetchProjects();
    } catch (err) {
      alert('Failed to update project');
    }
  };

  return (
    // Set a beautiful animated gradient as the page background
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 50%, #e9d5ff 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Full-page Create Project section */}
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

      {/* Project List section */}
      <section ref={projectListRef} className="w-full pt-8 pb-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-200 flex flex-col justify-between"
            >
              {editingProject && editingProject._id === project._id ? (
                <EditProjectForm
                  project={editingProject}
                  onCancel={() => setEditingProject(null)}
                  onUpdate={handleUpdate}
                />
              ) : (
                <>
                  <h2 className="font-bold text-xl mb-1 text-indigo-700">{project.title}</h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex gap-4 mt-auto">
                    <button
                      className="text-indigo-600 hover:underline font-semibold"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline font-semibold"
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Inline EditProjectForm for styling
function EditProjectForm({ project, onCancel, onUpdate }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [teamMembersInput, setTeamMembersInput] = useState(
    project.teamMembers.join(', ')
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const teamMembers = teamMembersInput
      .split(',')
      .map((email) => email.trim())
      .filter((email) => !!email);
    onUpdate({ ...project, title, description, teamMembers });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-indigo-200 p-2 rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-indigo-200 p-2 rounded"
      />
      <input
        type="text"
        value={teamMembersInput}
        onChange={(e) => setTeamMembersInput(e.target.value)}
        className="border border-indigo-200 p-2 rounded"
      />
      <div className="flex gap-2 mt-1">
        <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded shadow font-bold">
          Update
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 p-2 rounded font-semibold">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Dashboard;
