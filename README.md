# Task Master - React Todo App

A production-quality, fully-featured todo application built with React 18 and Vite. Features drag-and-drop reordering, dark mode, filtering, sorting, search, and more.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- **CRUD Operations**: Add, edit (inline), delete, and mark tasks complete
- **Task Metadata**: Title, description, priority (low/medium/high), due date, created timestamp
- **Filtering**: All / Active / Completed views
- **Sorting**: By due date, priority, or creation date
- **Search**: Real-time filtering by task title or description
- **Drag & Drop**: Reorder tasks with @dnd-kit (desktop)
- **Undo Delete**: Toast notification with undo button after deletion
- **Dark/Light Mode**: System-aware theme toggle saved to localStorage
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Overdue Highlighting**: Visual indicators for overdue and due-soon tasks

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoForm.jsx      # Add/Edit task form
│   ├── TodoList.jsx      # Main list with drag-and-drop
│   ├── TodoItem.jsx      # Individual task item
│   ├── FilterBar.jsx     # Status filter buttons
│   ├── SortBar.jsx       # Sorting dropdown
│   ├── SearchBar.jsx     # Text search input
│   ├── EmptyState.jsx    # Empty state display
│   ├── Toast.jsx         # Notification component
│   └── ThemeToggle.jsx   # Dark/light mode toggle
├── context/
│   └── TodoContext.jsx   # Context provider wrapper
├── hooks/
│   ├── useLocalStorage.js# Custom localStorage hook
│   └── useTodos.js       # Main todo state management
├── utils/
│   ├── priorityColors.js # Priority color mappings
│   └── formatDate.js     # Date formatting utilities
├── App.jsx               # Main application component
├── main.jsx              # Entry point
└── index.css             # Global styles & theming
```

## 🎨 Design Decisions

### 1. State Management with Context + useReducer Pattern
While I used a custom hook (`useTodos`) for simplicity, the architecture is ready to swap in `useReducer` if needed. The context provides global access without prop drilling.

### 2. Drag-and-Drop with @dnd-kit
Chosen over native HTML5 drag API because:
- Better accessibility support (keyboard navigation)
- Touch device compatibility
- Built-in collision detection and sorting strategies
- Cleaner separation of concerns

### 3. CSS Variables for Theming
Allows easy dark mode switching by only changing variable values, no component rewrites needed.

### 4. Memoization Strategy
- `useMemo` in TodoList to prevent unnecessary re-renders when filters/sort change
- React.memo can be added to individual components if performance profiling shows issues

### 5. LocalStorage Safety
All localStorage operations are wrapped in try-catch blocks with graceful fallbacks for privacy-focused browsers that block storage access.

## ♿ Accessibility Features

- Semantic HTML elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on interactive elements
- Keyboard navigation support (Enter to submit, Escape to cancel editing)
- Focus visible states for all interactive elements
- Proper role attributes for list and listitem semantics

## 📱 Responsive Design Breakpoints

- **Desktop**: Full layout with sidebar controls
- **Tablet (< 768px)**: Stacked filter/sort/search controls
- **Mobile (< 480px)**: Compact layout, always-visible actions

## 🔮 Future Improvements

1. **Persistence Layer**: Replace localStorage with IndexedDB for larger datasets
2. **Categories/Tags**: Organize tasks into groups or add tags
3. **Subtasks**: Break down complex tasks into smaller pieces
4. **Recurrence Rules**: Set tasks to repeat daily/weekly/monthly
5. **Notifications**: Browser push notifications for due dates
6. **Collaboration**: Share task lists with team members
7. **Export/Import**: JSON export of all tasks
8. **Keyboard Shortcuts**: Global shortcuts (Ctrl+N for new, Ctrl+K for search)

## 📄 License

MIT - Feel free to use this in your projects!