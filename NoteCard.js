function NoteCard({ note, tags, onEdit, onDelete, onTogglePin }) {
  try {
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      });
    };

    const getTagColor = (tagName) => {
      const tag = tags.find(t => t.name === tagName);
      return tag ? tag.color : TagColors.getColorForTag(tagName);
    };

    const truncateContent = (content, maxLength = 150) => {
      if (content.length <= maxLength) return content;
      return content.substring(0, maxLength) + '...';
    };

    return (
      <div className="note-card group relative" data-name="note-card" data-file="components/NoteCard.js">
        {note.pinned && (
          <div className="absolute top-2 right-2 text-yellow-500">
            <div className="icon-pin text-sm"></div>
          </div>
        )}

        <div 
          className="cursor-pointer"
          onClick={() => onEdit(note)}
        >
          <h3 className="font-semibold text-gray-900 mb-2 pr-6">
            {note.title || 'Untitled Note'}
          </h3>
          
          {note.content && (
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              {truncateContent(note.content)}
            </p>
          )}

          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {note.tags.map(tagName => (
                <span
                  key={tagName}
                  className="tag-chip text-xs"
                  style={{ backgroundColor: getTagColor(tagName) }}
                >
                  {tagName}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Updated {formatDate(note.updatedAt)}</span>
            {note.createdAt !== note.updatedAt && (
              <span>Created {formatDate(note.createdAt)}</span>
            )}
          </div>
        </div>

        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
            className={`p-1 rounded hover:bg-gray-100 ${note.pinned ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            <div className="icon-pin text-sm"></div>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Are you sure you want to delete this note?')) {
                onDelete(note.id);
              }
            }}
            className="p-1 rounded hover:bg-gray-100 text-red-500"
          >
            <div className="icon-trash-2 text-sm"></div>
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('NoteCard component error:', error);
    return null;
  }
}