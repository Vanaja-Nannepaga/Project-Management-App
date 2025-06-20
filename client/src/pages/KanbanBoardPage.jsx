import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KanbanBoard from "../components/Kanban/KanbanBoard";
import Filters from "../components/Filters";

export default function KanbanBoardPage() {
  const { projectId } = useParams();
  const token = localStorage.getItem("token");
  const [projectName, setProjectName] = useState("");
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const project = await response.json();
        setProjectName(project.title || "Unnamed Project");
      } catch (error) {
        console.error("Error fetching project:", error);
        setProjectName("Unnamed Project");
      }
    };

    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/tickets/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const ticketsData = await response.json();
        setTickets(ticketsData);
        setFilteredTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    fetchTickets();
  }, [projectId, token]);

  const handleFilter = async (filters) => {
    try {
      setLoading(true);
      const cleanFilters = {
        projectId,
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.assignee && { assignee: filters.assignee }),
        ...(filters.search && { search: filters.search })
      };
      const params = new URLSearchParams(cleanFilters).toString();
      const response = await fetch(`/api/tickets/filter?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const filteredData = await response.json();
      setFilteredTickets(filteredData);
    } catch (error) {
      console.error("Error filtering tickets:", error);
      const filtered = tickets.filter(ticket => {
        const statusMatch = !filters.status || ticket.status === filters.status;
        const priorityMatch = !filters.priority || ticket.priority === filters.priority;
        const assigneeMatch = !filters.assignee || 
          (ticket.assignee && ticket.assignee._id === filters.assignee);
        const searchMatch = !filters.search || 
          ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          (ticket.description && ticket.description.toLowerCase().includes(filters.search.toLowerCase()));
        return statusMatch && priorityMatch && assigneeMatch && searchMatch;
      });
      setFilteredTickets(filtered);
    } finally {
      setLoading(false);
    }
  };

  const refreshTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tickets/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const ticketsData = await response.json();
      setTickets(ticketsData);
      setFilteredTickets(ticketsData);
    } catch (error) {
      console.error("Error refreshing tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full py-8 px-4"
      style={{
        background: "linear-gradient(to bottom, #a1e9ff, #2a7a8c, #1a1a1a)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 className="text-center text-3xl sm:text-4xl font-bold text-white drop-shadow mb-8">
        Kanban Board - {projectName}
      </h1>

      <Filters onFilter={handleFilter} loading={loading} />

      {projectId && (
        <KanbanBoard
          projectId={projectId}
          token={token}
          tickets={filteredTickets}
          refreshTickets={refreshTickets}
          loading={loading}
        />
      )}
    </div>
  );
}

