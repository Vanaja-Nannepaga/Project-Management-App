import React from "react";

export default function TicketCard({ ticket }) {
  return (
    <div>
      <strong>{ticket.title}</strong>
      <div>{ticket.description}</div>
    </div>
  );
}
