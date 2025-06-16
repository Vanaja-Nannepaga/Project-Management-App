import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateProjectForm from './CreateProjectForm';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      <CreateProjectForm onProjectCreated={fetchProjects} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded shadow hover:shadow-lg">
            {editingProject && editingProject._id === project._id ? (
              <EditProjectForm
                project={editingProject}
                onCancel={() => setEditingProject(null)}
                onUpdate={handleUpdate}
              />
            ) : (
              <>
                <h2 className="font-bold text-lg">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
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
    </div>
  );
};

// Inline EditProjectForm for simplicity:
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2"
      />
      <input
        type="text"
        value={teamMembersInput}
        onChange={(e) => setTeamMembersInput(e.target.value)}
        className="border p-2"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 p-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Dashboard;
