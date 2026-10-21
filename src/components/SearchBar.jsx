/**
 * Search bar component for filtering tasks by text
 */
import React, { useState } from 'react';

export function SearchBar({ searchTerm, onSearchChange }) {
  const [localValue, setLocalValue] = useState(searchTerm);

  // Sync local state with prop when it changes externally
  React.useEffect(() => {
    if (searchTerm !== localValue) {
      setLocalValue(searchTerm);
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    onSearchChange(value);
  };

  return (
    <div className="search-input-container">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={localValue}
        onChange={handleChange}
        aria-label="Search tasks by title or description"
        role="searchbox"
      />
    </div>
  );
}