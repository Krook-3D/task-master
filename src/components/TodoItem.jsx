/**
 * Individual todo item component with inline editing and drag-and-drop support
 */
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function TodoItem({ 
  todo, 
  onEdit, 
  onDelete, 
  onToggleComplete,
  onUpdate
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  // Drag-and-drop hooks
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;

    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || null
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (isEditing && e.key === 'Enter') {
      handleSaveEdit();
    } else if (isEditing && e.key === 'Escape') {
      setEditTitle(todo.title);
      setEditDescription(todo.description || '');
      setIsEditing(false);
    }
  };

  const priorityColors = todo.priority === 'high' ? '#ef4444' : 
                         todo.priority === 'medium' ? '#f59e0b' : '#22c55e';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`todo-item ${isDragging ? 'dragging' : ''}`}
      role="listitem"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Drag Handle */}
      <div 
        className="drag-handle" 
        aria-hidden="true"
        title="Drag to reorder"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="5" r="2"></circle>
          <circle cx="15" cy="5" r="2"></circle>
          <circle cx="9" cy="19" r="2"></circle>
          <circle cx="15" cy="19" r="2"></circle>
        </svg>
      </div>

      {/* Completion Checkbox */}
      <input
        type="checkbox"
        className="task-checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />

      {/* Task Content */}
      <div className="task-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              className="edit-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              aria-label="Task title"
            />
            <textarea
              className="edit-description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={1}
              style={{ resize: 'none' }}
              aria-label="Task description"
            />
            <button 
              type="button"
              className="edit-btn-small"
              onClick={handleSaveEdit}
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <h3 className="task-title">{todo.title}</h3>
            {todo.description && (
              <p className="task-description">{todo.description}</p>
            )}

            {/* Task Meta Information */}
            <div className="task-meta">
              {/* Priority Badge */}
              <span 
                className={`priority-badge ${todo.priority}`}
                style={{ backgroundColor: `${priorityColors}20`, color: priorityColors }}
              >
                {todo.priority}
              </span>

              {/* Due Date with Overdue Indicator */}
              {todo.dueDate && (
                <span 
                  className={`due-date ${isOverdue(todo.dueDate) ? 'due-overdue' : ''}`}
                >
                  {getDueDateDisplay(todo.dueDate)}
                </span>
              )}

              {/* Created Date */}
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                {formatCreatedDate(todo.createdAt)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons (visible on hover/focus) */}
      <div className="task-actions">
        <button
          type="button"
          className={`edit-btn ${isEditing ? 'active' : ''}`}
          onClick={() => setIsEditing(true)}
          aria-label={isEditing ? 'Cancel editing' : 'Edit task'}
        >
          {isEditing ? '✕' : '✎'}
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete "${todo.title}"`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

// Helper functions for date display
function isOverdue(dateString) {
  const dueDate = new Date(dateString);
  if (isNaN(dueDate.getTime())) return false;
  
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  
  return dueDate < now;
}

function getDueDateDisplay(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  now.setHours(23, 59, 59, 999);
  
  const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;

  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatCreatedDate(isoString) {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    
    // Format as "Jan 15" for brevity
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  } catch {
    return '';
  }
}