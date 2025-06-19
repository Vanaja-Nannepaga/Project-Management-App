import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "../../axios";
import TicketDetail from "./TicketDetails"; // ✅ correct import

const statusTypes = {
  todo: "Open",
  inprogress: "In Progress",
  done: "Done",
};

const KanbanBoard = ({ projectId }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`/tickets/project/${projectId}`);
      setTickets(res.data || []); // fallback to empty array
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setTickets([]); // safe fallback
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [projectId]);

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const updatedStatus = destination.droppableId;
    try {
      await axios.put(`/tickets/${draggableId}`, { status: updatedStatus });
      fetchTickets();
    } catch (err) {
      console.error("Failed to update ticket status:", err);
    }
  };

  const getTicketsByStatusKey = (key) => {
    const statusValue = statusTypes[key];
    return tickets.filter((ticket) => ticket.status === statusValue);
  };

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      <h2 className="text-center text-xl font-semibold mb-4">
        Kanban Board - Bug Tracker
      </h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-around gap-4">
          {Object.keys(statusTypes).map((key) => (
            <Droppable key={key} droppableId={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-yellow-200 w-1/3 min-h-[400px] p-3 rounded-md shadow-md"
                >
                  <h3 className="text-center font-bold mb-2">
                    {statusTypes[key]}
                  </h3>
                  {getTicketsByStatusKey(key).map((ticket, index) => (
                    <Draggable
                      key={ticket._id}
                      draggableId={ticket._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-blue-200 p-2 rounded mb-2 shadow"
                        >
                          <strong>{ticket.title}</strong>
                          <p className="text-sm">{ticket.description}</p>
                          <button
                            onClick={() => setSelectedTicket(ticket)}
                            className="mt-2 text-sm text-white bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
                          >
                            💬 View Comments
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {getTicketsByStatusKey(key).length === 0 && (
                    <p className="text-center text-gray-500">
                      No tickets available
                    </p>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {selectedTicket && (
        <TicketDetail
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;

