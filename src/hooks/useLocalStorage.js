/**
 * Custom hook for localStorage persistence with error handling
 */
import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
  TODOS: 'todo-app-todos',
  THEME: 'todo-app-theme'
};

export function useLocalStorage(key, initialValue) {
  // State initialization
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Effect to sync with localStorage on change
  useEffect(() => {
    try {
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Effect to persist changes to localStorage
  const setValue = (newValue) => {
    try {
      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`Error saving to localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, 'system');

  useEffect(() => {
    const root = document.documentElement;
    
    // Determine effective theme based on user preference and system preference
    const applyTheme = (effectiveTheme) => {
      if (effectiveTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    // Apply saved theme or default to system
    let effectiveTheme = theme;
    
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = prefersDark ? 'dark' : 'light';
    } else {
      effectiveTheme = theme;
    }

    applyTheme(effectiveTheme);
  }, [theme]);

  return [theme, setTheme];
}