# NotesKeeper - Smart Notes Management App

## Overview
NotesKeeper is a modern, feature-rich notes application built with React and TailwindCSS. It provides an intuitive interface for creating, organizing, and managing notes with powerful tagging and search capabilities.

## Features

### Core Functionality
- **Note Management**: Create, edit, delete, and organize notes
- **Smart Tagging**: Add multiple colored tags to categorize notes
- **Advanced Search**: Search by title, content, or filter by tags
- **Pin Important Notes**: Keep important notes at the top
- **Auto-save**: Automatic saving while typing (every 2 seconds)
- **Responsive Design**: Works seamlessly on desktop and mobile

### User Experience
- Clean, modern interface inspired by Notion and Google Keep
- Keyboard shortcuts (Ctrl/Cmd + S to save, Esc to close)
- Smooth animations and hover effects
- Color-coded tags for easy visual organization
- Date tracking (created and last updated timestamps)

## Tech Stack
- **Frontend**: React 18, TailwindCSS
- **Icons**: Lucide Icons
- **Storage**: localStorage (upgradeable to Firebase/Supabase)
- **Build**: No build step required - runs directly in browser

## Project Structure
```
├── index.html              # Main HTML file
├── app.js                  # Main React application
├── components/             # React components
│   ├── Sidebar.js         # Navigation and tag filtering
│   ├── SearchBar.js       # Search and sort functionality  
│   ├── NoteCard.js        # Individual note display
│   ├── NotesGrid.js       # Notes layout and organization
│   ├── NoteEditor.js      # Note creation/editing modal
│   └── TagSelector.js     # Tag management component
├── utils/                 # Utility functions
│   ├── notesStorage.js    # localStorage operations
│   └── tagColors.js       # Tag color management
└── trickle/              # Project assets and documentation
    ├── assets/           # Media resources
    ├── notes/            # Project documentation
    └── rules/            # Development rules and guidelines
```

## Data Models

### Note Object
```javascript
{
  id: "unique-id",
  title: "Note Title", 
  content: "Note content...",
  tags: ["Work", "Ideas"],
  createdAt: "2025-01-09T15:18:19Z",
  updatedAt: "2025-01-09T15:18:19Z", 
  pinned: false,
  archived: false
}
```

### Tag Object  
```javascript
{
  id: "unique-id",
  name: "Work",
  color: "#3b82f6"
}
```

## Getting Started
1. Open `index.html` in a modern web browser
2. Click "New Note" to create your first note
3. Use tags to organize and filter your notes
4. Use the search bar to find specific notes

## Browser Compatibility
- Chrome/Edge 88+
- Firefox 85+ 
- Safari 14+

## Future Enhancements
- Rich text editing with markdown support
- Export/import functionality
- Cloud storage integration
- Collaborative editing
- Advanced search with filters
- Note templates