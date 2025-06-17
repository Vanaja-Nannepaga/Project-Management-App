import React, { useState } from 'react';
import axios from 'axios';

function TicketForm({ projectId, onTicketCreated, token }) {
  const [form, setForm] = useState({ title: '', description: '', priority: 'Low', assignee: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/tickets', { ...form, projectId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: '', description: '', priority: 'Low', assignee: '' });
      if (onTicketCreated) onTicketCreated();
    } catch (err) {
      alert('Failed to create ticket');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded space-y-2">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="border p-2 w-full" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
      <select name="priority" value={form.priority} onChange={handleChange} className="border p-2 w-full">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input name="assignee" value={form.assignee} onChange={handleChange} placeholder="Assignee Email" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
        {loading ? 'Creating...' : 'Create Ticket'}
      </button>
    </form>
  );
}

export default TicketForm;
