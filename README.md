# Task Master

A modern task management web application built with React and Vite.

Task Master allows users to create, organize, search, filter, sort, edit, complete, and delete tasks through a clean and responsive interface.

## Features

- Create tasks
- Add task descriptions
- Set task priority
  - High
  - Medium
  - Low
- Set due dates
- Edit tasks
- Mark tasks as completed
- Delete tasks
- Undo deleted tasks
- Clear completed tasks
- Search tasks
- Filter tasks
  - All
  - Active
  - Completed
- Sort tasks
  - Created date
  - Due date
  - Priority
- Task counter
- Dark / light / system theme
- Responsive design
- Local browser data persistence

## Tech Stack

- React
- Vite
- JavaScript
- JSX
- CSS
- React Context API
- React Hooks
- localStorage
- npm

## Project Structure

```text
Task-Master/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   │
│   ├── components/
│   │   ├── EmptyState.jsx
│   │   ├── FilterBar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SortBar.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── TodoForm.jsx
│   │   └── TodoList.jsx
│   │
│   ├── context/
│   │   └── TodoContext.jsx
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useTodos.js
│   │
│   └── utils/
│
└── node_modules/
```

## Requirements

- Node.js
- npm

Check your installed versions:

```bash
node -v
npm -v
```

## Installation

Clone the repository:

```bash
git clone <YOUR-REPOSITORY-URL>
```

Enter the project directory:

```bash
cd Task-Master
```

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173/
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Data Persistence

Task data is stored locally in the user's browser using `localStorage`.

The current storage key is:

```text
todo-app-todos
```

No external database is currently required for basic task persistence.

Clearing the browser's site data will also remove the locally stored tasks.

## Application Architecture

Task state is managed through a custom React hook and React Context.

```text
App
 │
 └── TodoProvider
      │
      └── useTodos
           │
           ├── todos
           ├── addTodo()
           ├── updateTodo()
           ├── deleteTodo()
           ├── toggleComplete()
           ├── clearCompleted()
           └── undoDelete()
```

The UI is divided into reusable React components:

```text
TodoForm
TodoList
FilterBar
SortBar
SearchBar
ThemeToggle
EmptyState
```

## Development Status

The project is currently under active development.

### Completed

- React/Vite project setup
- Application structure
- Task management hook
- Todo Context
- Task UI components
- Filtering
- Searching
- Sorting
- Theme support
- localStorage persistence structure
- Responsive styling

### In Progress

- Connecting application handlers to the Todo Context
- Task creation flow
- Task editing
- Task deletion
- Completion toggling
- Undo functionality
- Full persistence testing
- Final UI testing
- Production cleanup

## Planned Improvements

Future development may include:

- Cloud synchronization
- User accounts
- Multiple task lists
- Categories
- Tags
- Recurring tasks
- Notifications
- Drag-and-drop improvements
- Backend database
- Mobile support
- PWA support

## Development Principles

The project aims to maintain:

- Reusable React components
- Clear separation of concerns
- Simple state management
- Maintainable code
- Responsive UI
- Minimal dependencies
- Local-first functionality

## Git Workflow

Before making changes:

```bash
git pull
```

Review the current status:

```bash
git status
```

Review changes:

```bash
git diff
```

Stage changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Describe your changes"
```

Push:

```bash
git push
```

## Environment

The project is designed to run locally with Vite.

Do not commit sensitive environment variables or secrets.

Recommended files to exclude from Git:

```text
node_modules/
dist/
.env
.env.local
```

## License

This project is currently a private development project.

---

**Task Master**  
React + Vite task management application
