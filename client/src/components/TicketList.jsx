import React, { useEffect, useState } from "react";
import axios from "../axios";

function getPriorityColor(priority) {
  if (priority === "High") return "#fee2e2";
  if (priority === "Medium") return "#fef9c3";
  return "#d1fae5";
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {tickets.map(ticket => (
        <div key={ticket._id} style={{
          background: "linear-gradient(120deg, #fbeee6 60%, #e6f0fd 100%)", // modern pastel gradient
          border: "1.5px solid #e0e7ef",
          borderRadius: 14,
          padding: 24,
          boxShadow: "0 2px 12px #38bdf822",
          minHeight: 120,
          width: "98%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          {editingId === ticket._id ? (
            <form
              onSubmit={handleEditSubmit}
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 16px #e0e7ef55",
                padding: "24px 32px",
                margin: "0 auto",
                width: "100%",
                maxWidth: "700px",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}
            >
              <label style={{ fontWeight: 600, color: "#4f46e5" }}>Title</label>
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1.5px solid #c7d2fe",
                  background: "#f8fafc"
                }}
              />
              <label style={{ fontWeight: 600, color: "#4f46e5" }}>Description</label>
              <textarea
                name="description"
                rows={2}
                value={editForm.description}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1.5px solid #c7d2fe",
                  background: "#f8fafc"
                }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, color: "#4f46e5" }}>Priority</label>
                  <select
                    name="priority"
                    value={editForm.priority}
                    onChange={handleEditChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1.5px solid #c7d2fe",
                      background: "#f8fafc"
                    }}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, color: "#4f46e5" }}>Status</label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1.5px solid #c7d2fe",
                      background: "#f8fafc"
                    }}
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>
              <label style={{ fontWeight: 600, color: "#4f46e5" }}>Assignee Email</label>
              <input
                name="assignee"
                placeholder="Assignee Email"
                value={editForm.assignee}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1.5px solid #c7d2fe",
                  background: "#f8fafc"
                }}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(90deg, #6366f1 0%, #a5b4fc 100%)",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 700,
                    cursor: "pointer",
                    flex: 1
                  }}
                >Save</button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  style={{
                    background: "#f3f4f6",
                    color: "#4b5563",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    cursor: "pointer",
                    flex: 1
                  }}
                >Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div style={{ fontWeight: 700, fontSize: 20, color: "#4f46e5", marginBottom: 5, wordBreak: "break-word" }}>
                {ticket.title}
              </div>
              <div style={{ marginBottom: 10, fontSize: 17 }}>{ticket.description}</div>
              <div style={{
                display: "flex",
                gap: 18,
                fontSize: 15,
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
                marginBottom: 12
              }}>
                <span
                  style={{
                    padding: "4px 14px",
                    borderRadius: 8,
                    background: getPriorityColor(ticket.priority),
                    color: getPriorityTextColor(ticket.priority),
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  {ticket.priority}
                </span>
                <span style={{ color: "#6366f1" }}>
                  Status: <b style={{ color: "#6366f1" }}>{ticket.status}</b>
                </span>
                <span style={{ color: "#0891b2" }}>
                  Assignee: <b style={{ color: "#0891b2" }}>{ticket.assignee || "Unassigned"}</b>
                </span>
                <span style={{ color: "#64748b", fontSize: 13 }}>
                  Created: {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : ""}
                </span>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => handleEdit(ticket)}
                  style={{
                    background: "#f1f5f9",
                    border: "none",
                    color: "#6366f1",
                    padding: "10px 18px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: 15
                  }}
                >Edit</button>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  style={{
                    background: "#fee2e2",
                    border: "none",
                    color: "#dc2626",
                    padding: "10px 18px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: 15
                  }}
                >Delete</button>
                <button
                  onClick={() => handleAssign(ticket._id)}
                  style={{
                    background: "#d1fae5",
                    border: "none",
                    color: "#047857",
                    padding: "10px 18px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: 15
                  }}
                >Assign</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
