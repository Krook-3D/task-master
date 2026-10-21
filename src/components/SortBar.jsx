/**
 * Sort bar component for sorting tasks by different criteria
 */
import React from 'react';

export function SortBar({ sortBy, onSortChange }) {
  const options = [
    { value: 'createdAt', label: 'Newest first' },
    { value: 'dueDate', label: 'Due date' },
    { value: 'priority', label: 'Priority (high → low)' }
  ];

  return (
    <div className="sort-group">
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort tasks by"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}