import React, { useState } from "react";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";

export default function ProjectTickets({ projectId }) {
  const [refresh, setRefresh] = useState(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)", // blue-teal gradient
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          width: "98%",
          margin: "32px auto",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "#2563eb",
            marginBottom: 12,
            marginTop: 8,
            letterSpacing: "-1px",
            textAlign: "center"
          }}
        >
          Let’s Fix Something!
        </h2>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 24px #dbeafe70",
            padding: "32px 48px 28px 48px",
            marginBottom: 40,
            width: "100%",
            maxWidth: 660,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TicketForm projectId={projectId} onTicketCreated={() => setRefresh(r => r + 1)} />
        </div>
        <h2
          style={{
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "#0e7490",
            marginBottom: 12,
            marginTop: 8,
            letterSpacing: "-1px",
            textAlign: "center"
          }}
        >
          List of Reported Issues
        </h2>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            boxShadow: "0 4px 24px #a5b4fc44",
            padding: "24px 18px 18px 18px",
            width: "100%",
            minHeight: 180,
          }}
        >
          <TicketList projectId={projectId} refresh={refresh} />
        </div>
      </div>
    </div>
  );
}
