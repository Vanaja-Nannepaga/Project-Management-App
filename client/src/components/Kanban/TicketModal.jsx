import React, { useState } from 'react';

const TicketModal = ({ ticket, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: ticket?.title || '',
    description: ticket?.description || '',
    status: ticket?.status || 'Open',
    priority: ticket?.priority || 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(ticket._id, formData);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#f8f5ff',
        padding: '24px',
        borderRadius: '12px',
        width: '500px',
        maxWidth: '90%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        border: '1px solid #e1d6ff'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ 
            margin: 0,
            color: '#6a35ff',
            fontSize: '22px',
            fontWeight: '600'
          }}>
            Edit Ticket
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6a35ff',
              padding: '4px',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#f0eaff'
              }
            }}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div style={{ 
            marginBottom: '20px',
            backgroundColor: '#f0eaff',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #6a35ff'
          }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500',
              color: '#6a35ff',
              fontSize: '14px'
            }}>
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #d9c7ff',
                fontSize: '14px',
                backgroundColor: 'white',
                outline: 'none',
                '&:focus': {
                  borderColor: '#6a35ff'
                }
              }}
              required
            />
          </div>
          
          {/* Description Field */}
          <div style={{ 
            marginBottom: '20px',
            backgroundColor: '#f0eaff',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #6a35ff'
          }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500',
              color: '#6a35ff',
              fontSize: '14px'
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #d9c7ff',
                fontSize: '14px',
                minHeight: '100px',
                resize: 'vertical',
                backgroundColor: 'white',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {/* Status Field */}
            <div style={{
              backgroundColor: '#f0eaff',
              padding: '16px',
              borderRadius: '8px',
              borderLeft: '4px solid #6a35ff'
            }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '500',
                color: '#6a35ff',
                fontSize: '14px'
              }}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #d9c7ff',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Open">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Done</option>
              </select>
            </div>
            
            {/* Priority Field */}
            <div style={{
              backgroundColor: '#f0eaff',
              padding: '16px',
              borderRadius: '8px',
              borderLeft: '4px solid #6a35ff'
            }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '500',
                color: '#6a35ff',
                fontSize: '14px'
              }}>
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #d9c7ff',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{ 
                padding: '12px 24px',
                backgroundColor: 'white',
                color: '#6a35ff',
                border: '1px solid #d9c7ff',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#f0eaff'
                }
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ 
                padding: '12px 24px',
                backgroundColor: '#6a35ff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#5a2de0'
                }
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
