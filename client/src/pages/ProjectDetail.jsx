import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';

export default function ProjectDetail() {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);
await axios.post(`/api/projects/${projectId}/add-member`, { email: 'user@example.com' });
await axios.post(`/api/projects/${projectId}/remove-member`, { email: 'user@example.com' });
  useEffect(() => {
    axios.get(`/tickets/${id}`).then(res => setTickets(res.data));
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Project Tickets</h1>
      <div className="grid grid-cols-3 gap-4">
        {['To Do', 'In Progress', 'Done'].map(status => (
          <div key={status} className="bg-gray-100 p-3 rounded">
            <h2 className="font-semibold mb-2">{status}</h2>
            {tickets.filter(t => t.status === status).map(ticket => (
              <div key={ticket._id} className="bg-white p-2 mb-2 rounded shadow">
                <p className="font-medium">{ticket.title}</p>
                <p className="text-sm text-gray-600">{ticket.priority}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

