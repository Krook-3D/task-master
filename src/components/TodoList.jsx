import React from 'react';

export function TodoList({ todos, onEdit, onDelete, onToggleComplete }) {
  if (todos.length === 0) return null;
  return (
    <div className="task-list-container" role="list">
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} onEdit={() => onEdit(todo)} onDelete={() => onDelete(todo.id)} onToggleComplete={() => onToggleComplete(todo.id)} />)}
    </div>
  );
}

function TodoItem({ todo, onEdit, onDelete, onToggleComplete }) {
  const priorityColors = todo.priority === 'high' ? '#ef4444' : todo.priority === 'medium' ? '#f59e0b' : '#22c55e';
  return (
    <div className="todo-item" role="listitem">
      <input type="checkbox" className="task-checkbox" checked={todo.completed} onChange={onToggleComplete} aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`} />
      <div className="task-content">
        <h3 className="task-title">{todo.title}</h3>
        {todo.description && <p className="task-description">{todo.description}</p>}
        <div className="task-meta">
          <span className={`priority-badge ${todo.priority}`} style={{ backgroundColor: `${priorityColors}20`, color: priorityColors }}>{todo.priority}</span>
          {todo.dueDate && <span className={`due-date ${isOverdue(todo.dueDate) ? 'due-overdue' : ''}`}>{getDueDateDisplay(todo.dueDate)}</span>}
          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{formatCreatedDate(todo.createdAt)}</span>
        </div>
      </div>
      <div className="task-actions">
        <button type="button" className="edit-btn" onClick={onEdit} aria-label={`Edit "${todo.title}"`}>✎</button>
        <button type="button" className="delete-btn" onClick={onDelete} aria-label={`Delete "${todo.title}"`}>🗑️</button>
      </div>
    </div>
  );
}

function isOverdue(dateString) {
  const date = new Date(`${dateString}T23:59:59`);
  return !Number.isNaN(date.getTime()) && date < new Date();
}

function getDueDateDisplay(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const due = new Date(date); due.setHours(0, 0, 0, 0);
  const diffDays = Math.round((due - today) / 86400000);
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatCreatedDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
