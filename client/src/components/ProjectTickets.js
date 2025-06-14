import React, { useState } from 'react';
import TicketForm from './TicketForm';
import TicketList from './TicketList';

function ProjectTickets({ projectId }) {
  const [refresh, setRefresh] = useState(false);

  function handleTicketCreated() {
    setRefresh(r => !r); // toggle refresh to force TicketList to re-fetch
  }

  return (
    <div>
      <h2>Tickets</h2>
      <TicketForm projectId={projectId} onTicketCreated={handleTicketCreated} />
      <TicketList key={refresh} projectId={projectId} />
    </div>
  );
}

export default ProjectTickets;
