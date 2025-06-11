import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketCard from './TicketCard';

const TicketBoard = ({ projectId, token }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await axios.get(`/api/tickets/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(res.data);
    };

    fetchTickets();
  }, [projectId]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {['To Do', 'In Progress', 'Done'].map(status => (
        <div key={status} className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">{status}</h2>
          {tickets.filter(t => t.status === status).map(ticket => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TicketBoard;

