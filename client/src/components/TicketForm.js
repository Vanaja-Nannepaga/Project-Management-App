import React, { useState } from 'react';

function TicketForm({ projectId, onTicketCreated }) {
  const [form, setForm] = useState({ title: '', description: '', priority: 'Low', assignee: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer token' },
      body: JSON.stringify({ ...form, projectId }),
    })
      .then(res => res.json())
      .then(onTicketCreated);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input name="assignee" value={form.assignee} onChange={handleChange} placeholder="Assignee Email" />
      <button type="submit">Create Ticket</button>
    </form>
  );
}

export default TicketForm;
