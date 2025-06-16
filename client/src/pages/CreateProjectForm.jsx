import { useState } from 'react';
import axios from 'axios';

const CreateProjectForm = ({ onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emails, setEmails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    const teamMembers = emails
      .split(',')
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    try {
      await axios.post(
        '/api/projects',
        { title, description, teamMembers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      setEmails('');
      if (onProjectCreated) onProjectCreated();
    } catch (error) {
      alert('Failed to create project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-[#f7f9ff] to-[#e0e7ff] border border-indigo-100 p-12 rounded-3xl shadow-2xl flex flex-col gap-6 transition-all duration-300 mx-auto"
      style={{ maxWidth: 600, minWidth: 370, minHeight: 420 }}
    >
      <h2 className="text-2xl font-bold mb-2 text-indigo-700 tracking-tight">
        Create a New Project
      </h2>
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
      <input
        type="text"
        placeholder="Invite team (emails, comma-separated)"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        className="block w-full p-4 mb-1 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400 text-lg transition"
      />
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
  );
};

export default CreateProjectForm;
