import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const columnNames = ["To Do", "In Progress", "Done"];
const statusMap = {
  Open: "To Do",
  "In Progress": "In Progress",
  Closed: "Done",
};

export default function KanbanBoard({ projectId, token }) {
  const [columns, setColumns] = useState(null); // Initialize as null to track loading

  useEffect(() => {
    if (!projectId) return;

    fetch(`/api/tickets/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((tickets) => {
        console.log("Fetched tickets:", tickets);
        const grouped = { "To Do": [], "In Progress": [], "Done": [] };
        tickets.forEach((ticket) => {
          const mappedStatus = statusMap[ticket.status] || "To Do";
          if (columnNames.includes(mappedStatus) && ticket._id) {
            grouped[mappedStatus].push(ticket);
          }
        });
        setColumns(grouped);
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, [projectId, token]);

  const handleDragEnd = async (result) => {
    console.log("Drag end:", result);
    const { source, destination, draggableId } = result;
    if (!destination) {
      console.log("No destination, drag cancelled");
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (!columns) return; // Prevent action if columns are not loaded

    const sourceList = Array.from(columns[source.droppableId]);
    const [movedTicket] = sourceList.splice(source.index, 1);

    const newStatus = destination.droppableId;
    movedTicket.status = Object.keys(statusMap).find((key) => statusMap[key] === newStatus) || "Open";
    const destList = Array.from(columns[destination.droppableId]);
    destList.splice(destination.index, 0, movedTicket);

    const newColumns = {
      ...columns,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    };
    setColumns(newColumns); // Update state immediately

    try {
      const response = await fetch(`/api/tickets/${draggableId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: movedTicket.status }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("API response:", data);
      // Refetch to sync with backend
      const updatedTickets = await fetch(`/api/tickets/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json());
      const refreshedGrouped = { "To Do": [], "In Progress": [], "Done": [] };
      updatedTickets.forEach((ticket) => {
        const mappedStatus = statusMap[ticket.status] || "To Do";
        if (columnNames.includes(mappedStatus) && ticket._id) {
          refreshedGrouped[mappedStatus].push(ticket);
        }
      });
      setColumns(refreshedGrouped);
    } catch (error) {
      console.error("Error updating ticket:", error);
      setColumns({ ...columns }); // Revert state on error
    }
  };

  if (!columns) return <div>Loading...</div>; // Prevent rendering until data is ready

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
        {columnNames.map((col) => (
          <Droppable droppableId={col} key={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: "#f0e68c", // Light yellow background for columns
                  padding: "12px",
                  width: "300px",
                  minHeight: "500px",
                  borderRadius: "8px",
                }}
              >
                <h2 style={{ textAlign: "center", color: "#333" }}>{col}</h2>
                {columns[col].map((ticket, idx) => (
                  <Draggable
                    key={ticket._id.toString()}
                    draggableId={ticket._id.toString()}
                    index={idx}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          margin: "0 0 8px 0",
                          padding: "16px",
                          backgroundColor: "#add8e6", // Light blue background for tickets
                          borderRadius: "4px",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <strong style={{ color: "#000" }}>{ticket.title}</strong>
                        <div style={{ color: "#444" }}>{ticket.description}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {columns[col].length === 0 && (
                  <div style={{ color: "#aaa", textAlign: "center", marginTop: "2rem" }}>
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
  );
}


