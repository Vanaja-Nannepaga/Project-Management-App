import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProjectForm = ({ onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teamMembers, setTeamMembers] = useState([{ name: '', email: '' }]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [projectCreated, setProjectCreated] = useState(false);
  const navigate = useNavigate();

  const handleMemberChange = (idx, field, value) => {
    const updated = [...teamMembers];
    updated[idx][field] = value;
    setTeamMembers(updated);
  };

  const addMember = () => {
    setTeamMembers([...teamMembers, { name: '', email: '' }]);
  };

  const removeMember = (idx) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setProjectCreated(false);
    const token = localStorage.getItem('token');
    const members = teamMembers.filter(m => m.name.trim() && m.email.trim());
    try {
      await axios.post(
        '/api/projects',
        { title, description, teamMembers: members },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      setTeamMembers([{ name: '', email: '' }]);
      setSuccessMsg('Project created successfully!');
      setProjectCreated(true);
      if (onProjectCreated) onProjectCreated();
    } catch (error) {
      setSuccessMsg('');
      alert('Failed to create project.');
    } finally {
      setLoading(false);
    }
  };

  const goToDashboardHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-[#f7f9ff] to-[#e0e7ff] border border-indigo-100 p-12 rounded-3xl shadow-2xl flex flex-col gap-6 transition-all duration-300 mx-auto"
        style={{ maxWidth: 600, minWidth: 370, minHeight: 480 }}
      >
        <h2 className="text-2xl font-bold mb-2 text-indigo-700 tracking-tight">
          Create a New Project
        </h2>
        {successMsg && (
          <div className="mb-2 text-green-600 text-center font-semibold">
            {successMsg}
            {projectCreated && (
              <button
                type="button"
                className="block mx-auto mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-xl transition"
                onClick={goToDashboardHome}
              >
                Go to Dashboard Home
              </button>
            )}
          </div>
        )}
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-4 mb-1 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400 text-lg transition"
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-4 mb-1 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400 text-lg transition resize-none"
          rows={4}
          required
        />
        {/* Invite team members */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">Invite team members</h3>
          <div className="flex flex-col gap-2">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Name"
                  value={member.name}
                  onChange={e => handleMemberChange(idx, 'name', e.target.value)}
                  className="flex-1 min-w-[80px] p-2 border border-indigo-200 rounded-xl focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={member.email}
                  onChange={e => handleMemberChange(idx, 'email', e.target.value)}
                  className="flex-1 min-w-[120px] p-2 border border-indigo-200 rounded-xl focus:outline-none"
                />
                {teamMembers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(idx)}
                    className="text-red-500 font-bold px-2 py-1"
                    title="Remove member"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addMember}
            className="mt-2 text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            + Add another member
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-xl shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 text-lg ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default CreateProjectForm;
