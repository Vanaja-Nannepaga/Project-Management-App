import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const columnsMeta = {
  todo: { title: "To Do", status: "Open" },
  inprogress: { title: "In Progress", status: "In Progress" },
  done: { title: "Done", status: "Closed" },
};

export default function KanbanBoard({ projectId, token }) {
  const [columns, setColumns] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

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
        const grouped = {
          todo: [],
          inprogress: [],
          done: [],
        };

        tickets.forEach((ticket) => {
          const key = Object.entries(columnsMeta).find(
            ([, meta]) => meta.status === ticket.status
          )?.[0] || "todo";
          if (ticket._id) {
            grouped[key].push(ticket);
          }
        });

        setColumns(grouped);
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, [projectId, token]);

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol && source.index === destination.index) return;

    const sourceList = Array.from(columns[sourceCol]);
    const [movedTicket] = sourceList.splice(source.index, 1);

    const destList = Array.from(columns[destCol]);
    destList.splice(destination.index, 0, movedTicket);

    const newStatus = columnsMeta[destCol].status;
    movedTicket.status = newStatus;

    const newColumns = {
      ...columns,
      [sourceCol]: sourceList,
      [destCol]: destList,
    };

    setColumns(newColumns);

    try {
      const response = await fetch(`/api/tickets/${draggableId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
        {Object.entries(columnsMeta).map(([key, { title }]) => (
          <Droppable droppableId={key} key={key}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: "#f0e68c",
                  padding: "12px",
                  width: "300px",
                  minHeight: "500px",
                  borderRadius: "8px",
                }}
              >
                <h2 style={{ textAlign: "center", color: "#333" }}>{title}</h2>
                {columns[key].map((ticket, index) => (
                  <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          margin: "0 0 8px 0",
                          padding: "16px",
                          backgroundColor: "#add8e6",
                          borderRadius: "4px",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <strong>{ticket.title}</strong>
                        <div>{ticket.description}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {columns[key].length === 0 && (
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

