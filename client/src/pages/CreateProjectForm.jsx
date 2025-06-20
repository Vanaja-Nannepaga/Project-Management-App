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
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#a1e9ff] via-[#2a7a8c] to-[#1a1a1a] z-0"></div>
      
      {/* Form Container */}
      <div className="relative z-10 w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm border border-white/20 p-6 sm:p-8 rounded-xl shadow-2xl flex flex-col gap-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 tracking-tight text-center">
            Create a New Project
          </h2>
          
          {successMsg && (
            <div className="mb-2 text-green-600 text-center font-semibold">
              {successMsg}
              {projectCreated && (
                <button
                  type="button"
                  className="block mx-auto mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                  onClick={goToDashboardHome}
                >
                  Go to Dashboard Home
                </button>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Project Title</label>
              <input
                type="text"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Project Description</label>
              <textarea
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                rows={4}
                required
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">Team Members</h3>
              <div className="space-y-3">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-3 items-center">
                    <input
                      type="text"
                      placeholder="Name"
                      value={member.name}
                      onChange={e => handleMemberChange(idx, 'name', e.target.value)}
                      className="flex-1 w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={member.email}
                      onChange={e => handleMemberChange(idx, 'email', e.target.value)}
                      className="flex-1 w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(idx)}
                        className="text-red-500 hover:text-red-700 font-bold px-3 py-1"
                        title="Remove member"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addMember}
                className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                <span className="mr-1">+</span> Add another member
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating Project...' : 'Create Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
