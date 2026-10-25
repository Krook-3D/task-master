/**
 * Filter bar component for filtering tasks by status
 */
import React from 'react';

export function FilterBar({ filter, onFilterChange }) {
  const options = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="filter-group">
      {options.map((option) => (
        <button
          key={option.value}
          className={`filter-btn ${filter === option.value ? 'active' : ''}`}
          onClick={() => onFilterChange(option.value)}
          aria-pressed={filter === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}