import React, { useState } from 'react';
import axios from 'axios';

// Ticket creation form with improved styling
function TicketForm({ onCreate, loading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [assignee, setAssignee] = useState('');

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Create Ticket</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          onCreate({ title, description, priority, assignee });
        }}
        className="flex flex-col gap-4"
      >
        <input
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          required
        />
        <select
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Assignee Email"
          value={assignee}
          onChange={e => setAssignee(e.target.value)}
          type="email"
        />
        <button
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2 rounded shadow hover:from-indigo-600 hover:to-purple-600 transition-all"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Ticket'}
        </button>
      </form>
    </div>
  );
}

function TicketList({ projectId, token, refresh }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }
    async function fetchTickets() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/tickets/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setTickets([]);
      }
      setLoading(false);
    }
    fetchTickets();
  }, [projectId, token, refresh]);

  if (loading) return <div className="text-center mt-8 text-gray-500">Loading tickets...</div>;
  if (!tickets.length)
    return (
      <div className="text-center mt-8 text-gray-400">
        No tickets yet.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-4">
      {tickets.map(ticket => (
        <div
          key={ticket._id}
          className="bg-white border border-indigo-100 rounded-lg p-5 shadow flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-indigo-700 text-lg">{ticket.title}</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold 
                ${ticket.priority === 'High' ? 'bg-red-200 text-red-800'
                : ticket.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800'
                : 'bg-green-200 text-green-800'
              }`}
            >
              {ticket.priority}
            </span>
          </div>
          <div className="text-gray-800">{ticket.description}</div>
          <div className="flex flex-wrap gap-6 text-xs text-gray-600 mt-2">
            <span>Status: <b>{ticket.status}</b></span>
            <span>Assignee: <b>{ticket.assignee || 'Unassigned'}</b></span>
            <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectTickets({ projectId, token }) {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!token) {
    window.location.href = '/login';
    return null;
  }

  async function handleCreateTicket(data) {
    setLoading(true);
    try {
      const res = await axios.post(
        '/api/tickets',
        {
          ...data,
          projectId,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setRefresh(r => !r);
    } catch (err) {
      if (err.response) {
        console.error("API Error:", err.response.status, err.response.data);
        alert("Failed to create ticket: " + (err.response.data?.error || err.response.statusText));
      } else {
        console.error("Network Error:", err);
        alert("Failed to create ticket (network error)");
      }
    }
    setLoading(false);
  }

  return (
    <div>
      <TicketForm onCreate={handleCreateTicket} loading={loading} />
      <TicketList projectId={projectId} token={token} refresh={refresh} />
    </div>
  );
}

export default ProjectTickets;
