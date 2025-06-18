import React, { useState } from "react";
import axios from "../axios";

export default function TicketForm({ projectId, onTicketCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    assignee: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/tickets", { ...form, projectId });
      setForm({ title: "", description: "", priority: "Low", assignee: "" });
      if (onTicketCreated) onTicketCreated();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to create ticket");
    }
    setLoading(false);
  }

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        background: "#fff", // Distinct background color for the form
        borderRadius: "18px",
        boxShadow: "0 2px 16px #d1d5db33",
        padding: "32px 40px 28px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h3
        style={{
          color: "#7c3aed",
          fontWeight: 700,
          marginBottom: 24,
          fontSize: "1.3rem",
          textAlign: "center",
          letterSpacing: "-0.5px"
        }}
      >
        Create a New Ticket
      </h3>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
        style={{
          width: "100%",
          marginBottom: 10,
          padding: 12,
          borderRadius: 7,
          border: "1.5px solid #c7d2fe",
          fontSize: "1rem",
          background: "#f8fafc"
        }}
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
        rows={3}
        style={{
          width: "100%",
          marginBottom: 10,
          padding: 12,
          borderRadius: 7,
          border: "1.5px solid #c7d2fe",
          fontSize: "1rem",
          background: "#f8fafc"
        }}
      />
      {/* Priority label */}
      <div style={{ width: "100%", fontWeight: 600, color: "#7c3aed", marginBottom: 5, fontSize: 15, marginLeft: 3 }}>
        Priority
      </div>
      <div style={{ display: "flex", gap: "10px", marginBottom: 10, width: "100%" }}>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          required
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 7,
            border: "1.5px solid #c7d2fe",
            fontSize: "1rem",
            background: "#f8fafc"
          }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <input
        name="assignee"
        value={form.assignee}
        onChange={handleChange}
        placeholder="Assignee Email"
        style={{
          width: "100%",
          marginBottom: 18,
          padding: 12,
          borderRadius: 7,
          border: "1.5px solid #c7d2fe",
          fontSize: "1rem",
          background: "#f8fafc"
        }}
      />
      <button type="submit" disabled={loading} style={{
        background: "linear-gradient(90deg, #6366f1 0%, #a5b4fc 100%)",
        color: "#fff",
        padding: "14px 0",
        width: "100%",
        border: "none",
        borderRadius: 7,
        fontWeight: 700,
        fontSize: "1.1rem",
        letterSpacing: "1px",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: "0 2px 12px #dbeafe70"
      }}>
        {loading ? "Creating..." : "Create Ticket"}
      </button>
      {error && <div style={{ color: "#ef4444", marginTop: 7 }}>{error}</div>}
    </form>
  );
}
