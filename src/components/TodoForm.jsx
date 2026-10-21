/**
 * Form component for adding new todos or editing existing ones
 */
import React, { useState, useEffect } from 'react';

export function TodoForm({ todo = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  // Initialize form with existing todo data if editing
  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setDescription(todo.description || '');
      setPriority(todo.priority || 'medium');
      setDueDate(todo.dueDate || '');
    } else {
      // Reset form for new todo
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setError('');
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!title.trim()) {
      setError('Title is required. Please enter a task name.');
      return;
    }

    if (title.length > 150) {
      setError('Title must be 150 characters or less.');
      return;
    }

    // Trim whitespace and submit
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    onSubmit({
      title: trimmedTitle,
      description: trimmedDescription || null,
      priority,
      dueDate: dueDate ? dueDate.trim() : null
    });

    // Reset form after successful submission
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel?.();
    }
  };

  return (
    <form className="form-section" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <span className="form-title">{todo ? 'Edit Task' : 'Add New Task'}</span>
      </div>

      {error && (
        <div style={{ color: '#ef4444', fontSize: '0.813rem', marginBottom: '0.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError('');
        }}
        onKeyDown={handleKeyDown}
        autoFocus
        aria-required="true"
      />

      <textarea
        className="todo-input"
        placeholder="Add a description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        style={{ marginTop: '0.5rem', resize: 'vertical' }}
      />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
        {/* Priority Selector */}
        <select
          className="sort-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Select priority"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        {/* Due Date Input */}
        <input
          type="date"
          className="sort-select"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-label="Select due date"
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {onCancel && (
          <button
            type="button"
            className="edit-btn-small"
            onClick={onCancel}
            style={{ flexShrink: 0 }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="edit-btn-small"
          style={{ 
            background: 'var(--accent-color)', 
            color: 'white',
            fontWeight: '600',
            flexShrink: 0,
            marginLeft: 'auto'
          }}
        >
          {todo ? 'Save Changes' : 'Add Task'}
        </button>
      </div>

      <style>{`
        .sort-select {
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          font-size: 0.813rem;
          cursor: pointer;
        }

        .sort-select:focus {
          outline: none;
          border-color: var(--accent-color);
        }
      `}</style>
    </form>
  );
}