import { useEffect, useState } from 'react';

const STORAGE_KEY = 'todo-app-todos';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setTodos(parsed);
        else console.warn('Stored todos are not an array; starting with an empty list.');
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); }
    catch (error) { console.error('Error saving todos:', error); }
  }, [todos, isLoading]);

  const addTodo = (title, description = '', priority = 'medium', dueDate = '') => {
    if (typeof title !== 'string' || !title.trim()) return;
    const newTodo = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, title: title.trim(), description: (description || '').trim(), priority, dueDate: dueDate || '', completed: false, createdAt: new Date().toISOString() };
    setTodos(prev => [newTodo, ...prev]);
  };

  const updateTodo = (id, updates) => setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, ...updates, title: typeof updates.title === 'string' ? updates.title.trim() : todo.title } : todo));

  const deleteTodo = (id) => {
    setTodos(prev => {
      const index = prev.findIndex(todo => todo.id === id);
      if (index < 0) return prev;
      setUndoStack(stack => [...stack, [{ todo: prev[index], index }]]);
      return prev.filter(todo => todo.id !== id);
    });
  };

  const toggleComplete = (id) => setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));

  const clearCompleted = () => setTodos(prev => {
    const removed = prev.flatMap((todo, index) => todo.completed ? [{ todo, index }] : []);
    if (removed.length) setUndoStack(stack => [...stack, removed]);
    return prev.filter(todo => !todo.completed);
  });

  const undoDelete = () => {
    setUndoStack(stack => {
      if (!stack.length) return stack;
      const entry = stack[stack.length - 1];
      setTodos(current => {
        const restored = [...current];
        entry.forEach(({ todo, index }) => {
          if (!restored.some(item => item.id === todo.id)) restored.splice(Math.min(index, restored.length), 0, todo);
        });
        return restored;
      });
      return stack.slice(0, -1);
    });
  };

  const getFilteredTodos = (filter = 'all', searchTerm = '') => {
    const term = searchTerm.trim().toLocaleLowerCase();
    return todos.filter(todo => (filter === 'active' ? !todo.completed : filter === 'completed' ? todo.completed : true) && (!term || `${todo.title} ${todo.description || ''}`.toLocaleLowerCase().includes(term)));
  };

  const getSortedTodos = (items, sortBy = 'createdAt') => [...items].sort((a, b) => {
    if (sortBy === 'dueDate') return !a.dueDate ? (!b.dueDate ? 0 : 1) : !b.dueDate ? -1 : a.dueDate.localeCompare(b.dueDate);
    if (sortBy === 'priority') return ({ high: 0, medium: 1, low: 2 }[a.priority] ?? 3) - ({ high: 0, medium: 1, low: 2 }[b.priority] ?? 3);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return { todos, undoStack, isLoading, addTodo, updateTodo, deleteTodo, toggleComplete, clearCompleted, undoDelete, getFilteredTodos, getSortedTodos, getActiveCount: () => todos.filter(todo => !todo.completed).length, hasCompletedTodos: () => todos.some(todo => todo.completed) };
}
