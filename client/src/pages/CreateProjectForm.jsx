import { useState } from 'react';
import axios from 'axios';

const CreateProjectForm = ({ onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emails, setEmails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const teamEmails = emails.split(',').map((e) => e.trim());

    try {
      await axios.post(
        '/api/projects/create',
        { title, description, teamEmails },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const res = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });

      onProjectCreated(res.data);
      setTitle('');
      setDescription('');
      setEmails('');
    } catch (error) {
      console.error('Project creation failed:', error);
      alert('Failed to create project.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Invite team (emails, comma-separated)"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        className="block w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Project
      </button>
    </form>
  );
};

export default CreateProjectForm;

