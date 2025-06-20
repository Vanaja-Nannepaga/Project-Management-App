import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TicketCard from "./TicketCard";
import TicketModal from "./TicketModal";
import DeleteConfirmation from "./DeleteConfirmation";

const columnNames = ["To Do", "In Progress", "Done"];
const statusMap = {
  Open: "To Do",
  "In Progress": "In Progress",
  Closed: "Done",
};

export default function KanbanBoard({ projectId, token, refreshTickets }) {
  const [columns, setColumns] = useState({ "To Do": [], "In Progress": [], "Done": [] });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/tickets/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const tickets = await response.json();
        const grouped = { "To Do": [], "In Progress": [], "Done": [] };
        
        tickets?.forEach((ticket) => {
          const mappedStatus = statusMap[ticket?.status] || "To Do";
          if (columnNames.includes(mappedStatus) && ticket?._id) {
            grouped[mappedStatus].push(ticket);
          }
        });
        
        setColumns(grouped);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [projectId, token, refreshTickets]);

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || !columns) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceList = Array.from(columns[source.droppableId] || []);
    const [movedTicket] = sourceList.splice(source.index, 1);
    const newStatus = destination.droppableId;
    movedTicket.status = Object.keys(statusMap).find((key) => statusMap[key] === newStatus) || "Open";
    const destList = Array.from(columns[destination.droppableId] || []);
    destList.splice(destination.index, 0, movedTicket);

    setColumns({
      ...columns,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    });

    try {
      await fetch(`/api/tickets/${draggableId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: movedTicket.status }),
      });
    } catch (error) {
      console.error("Error updating ticket:", error);
      refreshTickets();
    }
  };

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsEditModalOpen(true);
  };

  const handleDeleteTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsDeleteModalOpen(true);
  };

  const handleSaveTicket = async (ticketId, updatedData) => {
    try {
      await fetch(`/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      refreshTickets();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`/api/tickets/${selectedTicket?._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshTickets();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  if (loading) return <div>Loading tickets...</div>;

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
          {columnNames.map((col) => (
          
          
    <Droppable droppableId={col} key={col}>
  {(provided) => (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      style={{
        backgroundColor: "#e0e7ff", // light indigo
        padding: "12px",
        width: "300px",
        minHeight: "500px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ 
        textAlign: "center", 
        color: "#3730a3", // darker indigo for title
        fontWeight: "600",
        marginBottom: "1rem"
      }}>
        {col}
      </h2>

      {columns[col]?.map((ticket, idx) => (
        <TicketCard
          key={ticket?._id?.toString() || idx}
          ticket={ticket}
          index={idx}
          onEdit={handleEditTicket}
          onDelete={handleDeleteTicket}
        />
      ))}

      {columns[col]?.length === 0 && (
        <div style={{ color: "#64748b", textAlign: "center", marginTop: "2rem" }}>
          No tickets available
        </div>
      )}

      {provided.placeholder}
    </div>
  )}
</Droppable>

            
            
            
          ))}
        </div>
      </DragDropContext>

      {isEditModalOpen && selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveTicket}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmation
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
