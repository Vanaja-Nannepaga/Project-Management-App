import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TicketList({ projectId, token, refresh }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/tickets/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTickets(res.data);
      } catch (err) {
        setTickets([]);
      }
      setLoading(false);
    }
    fetchTickets();
  }, [projectId, token, refresh]);

  if (loading) return <div className="text-center mt-8 text-gray-500">Loading tickets...</div>;
  if (!tickets.length) return <div className="text-center mt-8 text-gray-400">No tickets yet.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4 text-indigo-900">Tickets</h3>
      <div className="space-y-4">
        {tickets.map(ticket => (
          <div
            key={ticket._id}
            className="bg-gray-50 border border-indigo-100 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-indigo-700">{ticket.title}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                ${ticket.priority === 'High' ? 'bg-red-200 text-red-800'
                  : ticket.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-green-200 text-green-800'
                }`}>
                {ticket.priority}
              </span>
            </div>
            <div className="text-gray-700 mb-1">{ticket.description}</div>
            <div className="flex flex-wrap text-xs text-gray-500 gap-4 mt-2">
              <span>Status: <b>{ticket.status}</b></span>
              <span>Assignee: <b>{ticket.assignee || 'Unassigned'}</b></span>
              <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketList;
