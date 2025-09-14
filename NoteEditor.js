function NoteEditor({ note, tags, onSave, onClose }) {
  try {
    const [title, setTitle] = React.useState(note?.title || '');
    const [content, setContent] = React.useState(note?.content || '');
    const [selectedTags, setSelectedTags] = React.useState(note?.tags || []);
    const [isSaving, setIsSaving] = React.useState(false);

    // Auto-save functionality
    const autoSaveTimeoutRef = React.useRef(null);

    React.useEffect(() => {
      if (note) {
        // Clear any existing auto-save when editing existing note
        if (autoSaveTimeoutRef.current) {
          clearTimeout(autoSaveTimeoutRef.current);
        }

        // Set up auto-save for existing notes
        autoSaveTimeoutRef.current = setTimeout(() => {
          if (title.trim() || content.trim()) {
            handleAutoSave();
          }
        }, 2000);

        return () => {
          if (autoSaveTimeoutRef.current) {
            clearTimeout(autoSaveTimeoutRef.current);
          }
        };
      }
    }, [title, content, selectedTags]);

    const handleAutoSave = async () => {
      if (note && (title.trim() || content.trim())) {
        setIsSaving(true);
        try {
          onSave({
            title: title.trim() || 'Untitled Note',
            content: content.trim(),
            tags: selectedTags
          });
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsSaving(false);
        }
      }
    };

    const handleSave = () => {
      if (title.trim() || content.trim()) {
        onSave({
          title: title.trim() || 'Untitled Note',
          content: content.trim(),
          tags: selectedTags
        });
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
        onClose();
      }
    };

    React.useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [title, content, selectedTags]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="note-editor" data-file="components/NoteEditor.js">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">
                {note ? 'Edit Note' : 'New Note'}
              </h2>
              {isSaving && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <div className="w-3 h-3 border border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="btn-primary text-sm"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <div className="icon-x text-lg"></div>
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div>
              <input
                type="text"
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl font-semibold placeholder-gray-400 border-none outline-none resize-none"
                autoFocus
              />
            </div>

            <div>
              <textarea
                placeholder="Start writing your note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-64 text-gray-700 placeholder-gray-400 border border-[var(--border-color)] rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent resize-none"
              />
            </div>

            <TagSelector
              existingTags={tags}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />

            <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
              <p>💡 Tip: Use Ctrl/Cmd + S to save, or Esc to close</p>
              <p>🔄 Changes are auto-saved every 2 seconds</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('NoteEditor component error:', error);
    return null;
  }
}