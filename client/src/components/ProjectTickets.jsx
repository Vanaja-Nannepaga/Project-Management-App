import React, { useState } from "react";
import TicketForm from "../components/TicketForm";

export default function ProjectTickets({ projectId }) {
  const [refresh, setRefresh] = useState(0);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center font-sans"
      style={{
        
        padding: "2rem 1rem",
        
      }}
    >
      {/* Heading only */}
      <h2 className="text-3xl sm:text-4xl font-bold text-black text-center drop-shadow-lg mb-10">
        Let’s Fix Something!
      </h2>

      {/* Ticket creation form box */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-6 py-8 sm:px-10 sm:py-10">
        <TicketForm projectId={projectId} onTicketCreated={() => setRefresh(r => r + 1)} />
      </div>
    </div>
  );
}

