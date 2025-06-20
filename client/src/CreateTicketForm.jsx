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
      await axios.post('/api/tickets', payload);
      alert('Ticket created!');
      setForm({ title: '', description: '', priority: 'Low', assignee: '', projectId });
    } catch (err) {
      console.error('Error creating ticket:', err);
      if (err.response?.data?.error) {
        alert('Failed to create ticket: ' + err.response.data.error);
      } else {
        alert('Failed to create ticket');
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center font-sans px-4"
      style={{
        background: 'linear-gradient(to bottom, #a1e9ff, #2a7a8c, #1a1a1a)',
      }}
    >
      <div
        className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-8"
        style={{
          maxWidth: '640px',
        }}
      >
        <h2 className="text-xl font-semibold text-center text-purple-700 mb-4">
          Report a New Issue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border border-indigo-200 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="border border-indigo-200 p-3 w-full rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
          <select
            className="border border-indigo-200 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            required
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select
            className="border border-indigo-200 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={form.assignee}
            onChange={(e) => setForm({ ...form, assignee: e.target.value })}
            required
          >
            <option value="">Select Assignee</option>
            {team?.map((user) => (
              <option value={user._id} key={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 rounded-md hover:from-blue-600 hover:to-indigo-600 transition"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketForm;

