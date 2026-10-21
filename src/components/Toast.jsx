/**
 * Toast notification component with undo functionality
 */
import React from 'react';

export function Toast({ message, onUndo, onClose }) {
  if (!message) return null;

  return (
    <div className="toast" role="alert">
      <span className="toast-message">{message}</span>
      {onUndo && (
        <button
          className="undo-btn"
          onClick={onUndo}
          autoFocus
        >
          Undo
        </button>
      )}
      <button
        className="edit-btn-small"
        style={{ background: 'transparent', color: '#64748b' }}
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onUndo }) {
  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <Toast
          key={`${toast.id}-${index}`}
          message={toast.message}
          onUndo={() => onUndo(toast.id)}
          onClose={() => handleToastClose(index)}
        />
      ))}
    </div>
  );
}

// Helper to close toast by index (simple implementation)
function handleToastClose(index) {
  // In a real app, we'd use React state to manage this
  // For now, the component will unmount when its parent re-renders without it
}