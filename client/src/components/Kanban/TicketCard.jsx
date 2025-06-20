// TicketCard.jsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useAuth } from '../../context/AuthContext';

const TicketCard = ({ ticket, index, onEdit, onDelete }) => {
  const auth = useAuth();
  const user = auth?.user || {};
  
  const canEdit = user?.role === 'admin' || user?._id === ticket?.createdBy;
  const canDelete = user?.role === 'admin';

  return (
    <Draggable draggableId={ticket?._id?.toString() || ''} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            margin: "0 0 8px 0",
            padding: "16px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            position: 'relative',
            borderLeft: `4px solid ${
              ticket?.priority === 'High' ? '#f44336' : 
              ticket?.priority === 'Medium' ? '#ff9800' : '#4caf50'
            }`,
            ...provided.draggableProps.style,
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              <strong style={{ color: "#333", fontSize: '16px' }}>{ticket?.title}</strong>
              <div style={{ color: "#666", fontSize: '14px', marginTop: '4px' }}>
                {ticket?.description}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '16px',
              marginLeft: '12px',
              alignItems: 'center'
            }}>
              {canEdit && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(ticket);
                  }}
                  style={{ 
                    cursor: 'pointer',
                    fontSize: '20px',
                    display: 'inline-block',
                    transition: 'all 0.2s',
                    ':hover': {
                      transform: 'scale(1.2)'
                    }
                  }}
                  title="Edit"
                >
                  ✏️
                </span>
              )}
              {canDelete && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(ticket);
                  }}
                  style={{ 
                    cursor: 'pointer',
                    fontSize: '20px',
                    display: 'inline-block',
                    transition: 'all 0.2s',
                    ':hover': {
                      transform: 'scale(1.2)',
                      color: '#f44336'
                    }
                  }}
                  title="Delete"
                >
                  ❌
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TicketCard;
