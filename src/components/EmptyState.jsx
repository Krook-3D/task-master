/**
 * Empty state component displayed when no tasks match the filter/search
 */
import React from 'react';

export function EmptyState({ message = "No tasks found", showAddHint = true }) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-icon" aria-hidden="true">
        📝
      </div>
      <p className="empty-message">{message}</p>
      {showAddHint && (
        <p style={{ fontSize: '0.813rem', marginTop: '0.5rem', color: '#94a3b8' }}>
          Add a task above to get started!
        </p>
      )}
    </div>
  );
}