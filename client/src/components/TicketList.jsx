import React, { useEffect, useState } from "react";
import axios from "../axios";

function getPriorityColor(priority) {
  if (priority === "High") return "#fee2e2"; // Light red
  if (priority === "Medium") return "#fef9c3"; // Light yellow
  return "#dcfce7"; // Light green
}

function getPriorityTextColor(priority) {
  if (priority === "High") return "#b91c1c";
  if (priority === "Medium") return "#b45309";
  return "#047857";
}

export default function TicketList({ projectId, refresh }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    axios.get(`/tickets/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTickets(res.data))
      .catch(() => setTickets([]))
      .finally(() => setLoading(false));
  }, [projectId, refresh]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/tickets/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTickets(tickets.filter(t => t._id !== id));
  };

  const handleEdit = (ticket) => {
    setEditingId(ticket._id);
    setEditForm({
      ...ticket,
      title: ticket.title || "",
      description: ticket.description || "",
      priority: ticket.priority || "Low",
      status: ticket.status || "Open",
      assignee: ticket.assignee || "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(`/tickets/${editingId}`, editForm, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditingId(null);
    const res = await axios.get(`/tickets/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTickets(res.data);
  };

  const handleAssign = async (id) => {
    const assignee = prompt("Enter new assignee email:");
    if (!assignee) return;
    const token = localStorage.getItem('token');
    await axios.post(`/tickets/${id}/assign`, { assignee }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const res = await axios.get(`/tickets/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTickets(res.data);
  };

  if (loading) return <div>Loading tickets...</div>;
  if (!tickets.length) return <div>No tickets yet.</div>;

  return (
    <div className="flex flex-col gap-8 items-center w-full">
      {tickets.map(ticket => (
        <div
          key={ticket._id}
          className="w-[98%] max-w-[1200px] rounded-xl p-6 shadow-md"
          style={{
            background: "#e0e7ff", // Lighter indigo background
            border: "1.5px solid #c7d2fe",
            color: "#1e1b4b"
          }}
        >
          {editingId === ticket._id ? (
            <form
              onSubmit={handleEditSubmit}
              className="flex flex-col gap-4 bg-white rounded-lg p-6"
            >
              <label className="font-semibold text-indigo-700">Title</label>
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                className="p-2 rounded border border-indigo-200"
              />
              <label className="font-semibold text-indigo-700">Description</label>
              <textarea
                name="description"
                rows={2}
                value={editForm.description}
                onChange={handleEditChange}
                className="p-2 rounded border border-indigo-200"
              />
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-semibold text-indigo-700">Priority</label>
                  <select
                    name="priority"
                    value={editForm.priority}
                    onChange={handleEditChange}
                    className="w-full p-2 rounded border border-indigo-200"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="font-semibold text-indigo-700">Status</label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="w-full p-2 rounded border border-indigo-200"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>
              <label className="font-semibold text-indigo-700">Assignee Email</label>
              <input
                name="assignee"
                value={editForm.assignee}
                onChange={handleEditChange}
                className="p-2 rounded border border-indigo-200"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h3 className="text-xl font-bold mb-2">{ticket.title}</h3>
              <p className="mb-3">{ticket.description}</p>
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <span
                  className="px-3 py-1 rounded-full font-medium"
                  style={{
                    background: getPriorityColor(ticket.priority),
                    color: getPriorityTextColor(ticket.priority)
                  }}
                >
                  {ticket.priority}
                </span>
                <span>Status: <b>{ticket.status}</b></span>
                <span>Assignee: <b>{ticket.assignee || "Unassigned"}</b></span>
                <span className="text-gray-600">
                  Created: {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : ""}
                </span>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleEdit(ticket)}
                  className="bg-indigo-400 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="bg-red-400 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAssign(ticket._id)}
                  className="bg-emerald-400 text-white px-4 py-2 rounded"
                >
                  Assign
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

