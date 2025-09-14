function NotesGrid({ notes, sortBy, onEditNote, onDeleteNote, onTogglePin }) {
  try {
    const sortedNotes = React.useMemo(() => {
      const pinnedNotes = notes.filter(note => note.pinned);
      const unpinnedNotes = notes.filter(note => !note.pinned);

      const sortFunction = (a, b) => {
        switch (sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'createdAt':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'updatedAt':
          default:
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
      };

      pinnedNotes.sort(sortFunction);
      unpinnedNotes.sort(sortFunction);

      return [...pinnedNotes, ...unpinnedNotes];
    }, [notes, sortBy]);

    const pinnedCount = notes.filter(note => note.pinned).length;

    if (notes.length === 0) {
      return (
        <div className="p-12 text-center" data-name="empty-state" data-file="components/NotesGrid.js">
          <div className="icon-file-text text-6xl text-gray-300 mb-4 mx-auto"></div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No notes yet</h3>
          <p className="text-gray-500">Create your first note to get started!</p>
        </div>
      );
    }

    return (
      <div className="p-6" data-name="notes-grid" data-file="components/NotesGrid.js">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </h2>
            {pinnedCount > 0 && (
              <span className="text-sm text-gray-500">
                ({pinnedCount} pinned)
              </span>
            )}
          </div>
        </div>

        {pinnedCount > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4 flex items-center gap-2">
              <div className="icon-pin text-yellow-500"></div>
              Pinned Notes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedNotes.filter(note => note.pinned).map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  tags={[]}
                  onEdit={onEditNote}
                  onDelete={onDeleteNote}
                  onTogglePin={onTogglePin}
                />
              ))}
            </div>
          </div>
        )}

        {sortedNotes.filter(note => !note.pinned).length > 0 && (
          <div>
            {pinnedCount > 0 && (
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
                All Notes
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedNotes.filter(note => !note.pinned).map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  tags={[]}
                  onEdit={onEditNote}
                  onDelete={onDeleteNote}
                  onTogglePin={onTogglePin}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('NotesGrid component error:', error);
    return null;
  }
}