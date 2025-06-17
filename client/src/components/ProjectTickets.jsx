import React from "react";
import TicketForm from "../components/TicketForm";

export default function ProjectTickets({ projectId, onTicketCreated }) {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: "radial-gradient(circle at 60% 30%, #d1c4e9 0%, #ede7f6 100%)",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    }}>
      {/* Remove the header/title/description block entirely */}

      {/* Keep only the styled heading/desc area if you want, or remove for only the form */}
      <div
        style={{
          background: "linear-gradient(90deg, #ede7f6 0%, #f3e8ff 100%)",
          padding: "2rem 2rem 1rem 2rem",
          borderBottom: "1px solid #e2d8f7",
        }}
      >
        {/* If you want NO heading/desc at all, remove below lines too */}
        {/* <h1 style={{fontWeight: 800, fontSize: "2.1rem", color: "#311b92", letterSpacing: "-1px", marginBottom: "0.2em"}}>Bug Tracker</h1>
        <div style={{color: "#4527a0", fontSize: "1.09rem", maxWidth: 800, margin: "0 auto", textShadow: "0 1px 12px #ede7f6"}}>
          A Bug Tracker / Issue Tracker like Jira using the MERN stack. This project is industry-relevant, especially for SaaS or enterprise dashboards, and it reflects real team workflows.
        </div> */}
      </div>
      {/* Centered Ticket Form */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        marginTop: "2rem",
      }}>
        <TicketForm projectId={projectId} onTicketCreated={onTicketCreated} />
      </div>
    </div>
  );
}
