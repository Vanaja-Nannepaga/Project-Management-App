import React, { useState } from "react";
import ProjectSelector from "../components/ProjectSelector";
import TicketList from "../components/TicketList";

export default function TicketsPage() {
  const [projectId, setProjectId] = useState("");

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Tickets</h2>
      <ProjectSelector value={projectId} onChange={setProjectId} />
      <div className="mt-6">
        {projectId
          ? <TicketList projectId={projectId} />
          : <div className="text-gray-500 mt-4">Please select a project to view tickets.</div>
        }
      </div>
    </div>
  );
}
