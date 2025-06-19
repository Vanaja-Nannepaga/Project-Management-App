import React, { useState } from "react";
import TicketDetail from "./TicketDetails"; // ✅ correct



export default function TicketCard({ ticket }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="bg-blue-200 p-2 rounded mb-2 shadow">
      <strong>{ticket.title}</strong>
      <div>{ticket.description}</div>

      <button
        className="mt-2 text-sm text-blue-800 underline"
        onClick={() => setShowDetail(true)}
      >
        💬 Comments
      </button>

      {showDetail && (
        <TicketDetail ticket={ticket} onClose={() => setShowDetail(false)} />
      )}
    </div>
  );
}

