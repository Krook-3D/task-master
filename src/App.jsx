import React, { useState } from 'react';
import { TodoProvider, useTodoContext } from './context/TodoContext';
import { ThemeToggle } from './components/ThemeToggle';
import { FilterBar } from './components/FilterBar';
import { SortBar } from './components/SortBar';
import { SearchBar } from './components/SearchBar';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { EmptyState } from './components/EmptyState';
import { Toast } from './components/Toast';

function AppContent() {
  const { todos, isLoading, addTodo, updateTodo, deleteTodo, toggleComplete, clearCompleted, undoDelete, getFilteredTodos, getSortedTodos, getActiveCount, hasCompletedTodos, undoStack } = useTodoContext();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const visibleTodos = getSortedTodos(getFilteredTodos(filter, searchTerm), sortBy);

  const handleDelete = (id) => deleteTodo(id);

  return (
    <div className="app-container">
      <header className="header"><h1 className="app-title">📋 Task Master</h1><ThemeToggle /></header>
      <main className="main-content">
        <section aria-labelledby="form-heading" className="form-section">
          <div id="form-heading" className="form-header"><span className="form-title">{editingTodo ? 'Edit Task' : 'Add New Task'}</span></div>
          <TodoForm key={editingTodo?.id || 'new'} todo={editingTodo} onSubmit={(data) => {
            if (editingTodo) { updateTodo(editingTodo.id, data); setEditingTodo(null); }
            else addTodo(data.title, data.description, data.priority, data.dueDate);
          }} onCancel={editingTodo ? () => setEditingTodo(null) : undefined} />
        </section>
        <section className="filter-sort-bar">
          <FilterBar filter={filter} onFilterChange={setFilter} />
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} /><SortBar sortBy={sortBy} onSortChange={setSortBy} /></div>
          {hasCompletedTodos() && <button type="button" className="clear-completed-btn" onClick={clearCompleted}>Clear Completed</button>}
        </section>
        <section aria-labelledby="tasks-heading">
          <h2 id="tasks-heading" style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Tasks</h2>
          {isLoading ? null : visibleTodos.length ? <TodoList todos={visibleTodos} filter={filter} sortBy={sortBy} searchTerm={searchTerm} onEdit={setEditingTodo} onDelete={handleDelete} onToggleComplete={toggleComplete} onUpdate={updateTodo} /> : <EmptyState message={todos.length === 0 ? 'No tasks yet. Add one above!' : searchTerm ? 'No tasks match your search.' : filter === 'active' ? 'No active tasks.' : filter === 'completed' ? 'No completed tasks.' : 'No tasks match the current view.'} showAddHint={todos.length === 0} />}
        </section>
        <footer style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
          <span>{getActiveCount()} active {getActiveCount() === 1 ? 'task' : 'tasks'} · Showing {visibleTodos.length}</span>
          {undoStack.length > 0 && <button type="button" className="undo-btn" onClick={undoDelete}>Undo delete</button>}
        </footer>
      </main>
      <Toast message="" />
    </div>
  );
}

export default function App() {
  return <TodoProvider><AppContent /></TodoProvider>;
}
