class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [notes, setNotes] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [sortBy, setSortBy] = React.useState('updatedAt');
    const [isEditorOpen, setIsEditorOpen] = React.useState(false);
    const [editingNote, setEditingNote] = React.useState(null);

    React.useEffect(() => {
      const storedNotes = NotesStorage.getAllNotes();
      const storedTags = NotesStorage.getAllTags();
      setNotes(storedNotes);
      setTags(storedTags);
    }, []);

    const handleCreateNote = () => {
      setEditingNote(null);
      setIsEditorOpen(true);
    };

    const handleEditNote = (note) => {
      setEditingNote(note);
      setIsEditorOpen(true);
    };

    const handleSaveNote = (noteData) => {
      let savedNote;
      if (editingNote) {
        savedNote = NotesStorage.updateNote(editingNote.id, noteData);
      } else {
        savedNote = NotesStorage.createNote(noteData);
      }
      
      const updatedNotes = NotesStorage.getAllNotes();
      const updatedTags = NotesStorage.getAllTags();
      setNotes(updatedNotes);
      setTags(updatedTags);
      setIsEditorOpen(false);
    };

    const handleDeleteNote = (noteId) => {
      NotesStorage.deleteNote(noteId);
      const updatedNotes = NotesStorage.getAllNotes();
      setNotes(updatedNotes);
    };

    const handleTogglePin = (noteId) => {
      const note = notes.find(n => n.id === noteId);
      NotesStorage.updateNote(noteId, { pinned: !note.pinned });
      const updatedNotes = NotesStorage.getAllNotes();
      setNotes(updatedNotes);
    };

    const filteredNotes = notes.filter(note => {
      const matchesSearch = searchQuery === '' || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => note.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    return (
      <div className="min-h-screen bg-[var(--background-color)]" data-name="app" data-file="app.js">
        <Sidebar 
          tags={tags}
          selectedTags={selectedTags}
          onTagSelect={setSelectedTags}
          onCreateNote={handleCreateNote}
        />
        
        <div className="main-content">
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          
          <NotesGrid 
            notes={filteredNotes}
            sortBy={sortBy}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            onTogglePin={handleTogglePin}
          />
        </div>

        {isEditorOpen && (
          <NoteEditor 
            note={editingNote}
            tags={tags}
            onSave={handleSaveNote}
            onClose={() => setIsEditorOpen(false)}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);