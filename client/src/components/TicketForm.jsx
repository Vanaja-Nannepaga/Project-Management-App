import React, { useState, useContext } from 'react';
import axios from '../axios';
import { UserContext } from '../context/UserContext';

function TicketForm({ projectId, onTicketCreated }) {
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    priority: 'Low', 
    status: 'Open',        
    assignee: '' 
  });
  const [loading, setLoading] = useState(false);
  const { token } = useContext(UserContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        '/tickets',
        { ...form, projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ title: '', description: '', priority: 'Low', status: 'Open', assignee: '' });
      if (onTicketCreated) onTicketCreated();
    } catch (err) {
      alert('Failed to create ticket: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  // Style with visible border
  const boxStyle = {
    border: '1.5px solid #b39ddb',
    borderRadius: '8px',
    padding: '0.9em 1em',
    fontSize: '1rem',
    background: '#f4f4f6',
    boxShadow: '0 1px 4px #e2e8f088',
    outline: 'none',
    transition: 'box-shadow 0.2s, border 0.2s',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'rgba(255, 255, 255, 0.80)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.20)',
        backdropFilter: 'blur(8px)',
        borderRadius: '24px',
        padding: '2.5rem 2.5rem 2.2rem 2.5rem', // more padding
        width: '100%',
        maxWidth: '520px', // wider
        margin: '2rem auto 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        border: '1px solid rgba(255,255,255,0.18)',
      }}
    >
      <h2 style={{
        color: '#7c3aed',
        fontWeight: 800,
        fontSize: '1.35rem',
        marginBottom: '-0.5rem',
        letterSpacing: '-1px'
      }}>Create Ticket</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
        style={boxStyle}
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
        style={boxStyle}
      />

      {/* Priority Section */}
      <div style={{width: '100%'}}>
        <div style={{fontWeight: 600, marginBottom: '0.25em', color: "#7c3aed"}}>Priority</div>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          style={boxStyle}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Status Section */}
      <div style={{width: '100%'}}>
        <div style={{fontWeight: 600, marginBottom: '0.25em', color: "#7c3aed"}}>Status</div>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={boxStyle}
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
      </div>

      <input
        name="assignee"
        value={form.assignee}
        onChange={handleChange}
        placeholder="Assignee Email"
        style={boxStyle}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          background: 'linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: '8px',
          padding: '0.95em',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 12px #a78bfa55',
          marginTop: '0.6em',
          transition: 'background 0.2s'
        }}
      >
        {loading ? 'Creating...' : 'Create Ticket'}
      </button>
    </form>
  );
}

export default TicketForm;
