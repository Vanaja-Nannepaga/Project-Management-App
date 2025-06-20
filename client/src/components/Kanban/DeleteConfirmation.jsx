// DeleteConfirmation.jsx
import React from 'react';

const DeleteConfirmation = ({ onClose, onConfirm }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        width: '400px',
        maxWidth: '90%',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid #eee',
          paddingBottom: '10px'
        }}>
          <h2 style={{ 
            margin: 0,
            color: '#333',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Confirm Deletion
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#666',
              '&:hover': {
                color: '#333'
              }
            }}
          >
            ×
          </button>
        </div>
        
        <p style={{ 
          marginBottom: '24px',
          color: '#666',
          lineHeight: '1.5'
        }}>
          Are you sure you want to delete this ticket? This action cannot be undone.
        </p>
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          borderTop: '1px solid #eee',
          paddingTop: '20px'
        }}>
          <button
            onClick={onClose}
            style={{ 
              padding: '10px 20px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: '#e0e0e0'
              }
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{ 
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: '#d32f2f'
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
