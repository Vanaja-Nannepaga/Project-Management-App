import React, { useEffect, useState } from 'react';

function TicketList({ projectId }) {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    fetch(`/api/tickets/project/${projectId}`, {
      headers: { 'Authorization': 'Bearer token' }
    })
      .then(res => res.json())
      .then(setTickets);
  }, [projectId]);

  return (
    <ul>
      {tickets.map(t => (
        <li key={t._id}>
          <strong>{t.title}</strong> - {t.status} ({t.priority})<br/>
          Assignee: {t.assignee} | Created At: {new Date(t.createdAt).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}

export default TicketList;
