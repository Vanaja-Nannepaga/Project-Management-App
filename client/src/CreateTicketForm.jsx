import React, { useState } from 'react';
import axios from './axios';

const CreateTicketForm = ({ projectId, team }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Low',
    assignee: '',
    projectId,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, projectId };
      await axios.post('/tickets/create', payload); // <--- CORRECT ENDPOINT
      alert('Ticket created!');
      setForm({ title: '', description: '', priority: 'Low', assignee: '', projectId });
    } catch (err) {
      console.error('Error creating ticket:', err);
      if (err.response && err.response.data && err.response.data.error) {
        alert('Failed to create ticket: ' + err.response.data.error);
      } else {
        alert('Failed to create ticket');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      ></textarea>
      <select
        className="border p-2 w-full"
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
        required
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select
        className="border p-2 w-full"
        value={form.assignee}
        onChange={(e) => setForm({ ...form, assignee: e.target.value })}
        required
      >
        <option value="">Select Assignee</option>
        {team.map((user) => (
          <option value={user._id} key={user._id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Create Ticket
      </button>
    </form>
  );
};

export default CreateTicketForm;
