const TicketCard = ({ ticket }) => (
  <div className="bg-white p-3 rounded shadow mb-2">
    <h3 className="font-bold">{ticket.title}</h3>
    <p className="text-sm">{ticket.description}</p>
    <p className={`text-xs font-semibold mt-1 ${{
      'High': 'text-red-500',
      'Medium': 'text-yellow-500',
      'Low': 'text-green-500'
    }[ticket.priority]}`}>{ticket.priority} Priority</p>
    {ticket.assignee && (
      <p className="text-xs mt-1">👤 {ticket.assignee.name}</p>
    )}
  </div>
);

