import React, { useState } from 'react';
import axios from 'axios';

const CreateTicketForm = ({ projectId, team, token }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Low',
    assignee: '',
    project: projectId,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        project: projectId, // ensure projectId is included
      };

      await axios.post('/api/tickets/create', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Ticket created!');
      setForm({ title: '', description: '', priority: 'Low', assignee: '', project: projectId });
    } catch (err) {
      console.error('Error creating ticket:', err);
      alert('Failed to create ticket');
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

