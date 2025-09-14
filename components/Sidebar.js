function Sidebar({ tags, selectedTags, onTagSelect, onCreateNote }) {
  try {
    const handleTagClick = (tagName) => {
      if (selectedTags.includes(tagName)) {
        onTagSelect(selectedTags.filter(t => t !== tagName));
      } else {
        onTagSelect([...selectedTags, tagName]);
      }
    };

    const clearFilters = () => {
      onTagSelect([]);
    };

    return (
      <div className="sidebar" data-name="sidebar" data-file="components/Sidebar.js">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-[var(--text-color)]">NotesKeeper</h1>
            <div className="icon-book-open text-xl text-[var(--primary-color)]"></div>
          </div>

          <button 
            onClick={onCreateNote}
            className="w-full btn-primary mb-6 flex items-center justify-center gap-2"
          >
            <div className="icon-plus text-lg"></div>
            New Note
          </button>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Filter by Tags
              </h2>
              {selectedTags.length > 0 && (
                <button 
                  onClick={clearFilters}
                  className="text-xs text-[var(--primary-color)] hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-2">
              {tags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.name)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-200 ${
                    selectedTags.includes(tag.name) 
                      ? 'bg-[var(--primary-color)] text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    ></div>
                    <span className="text-sm">{tag.name}</span>
                  </div>
                  {selectedTags.includes(tag.name) && (
                    <div className="icon-check text-sm"></div>
                  )}
                </button>
              ))}
              
              {tags.length === 0 && (
                <p className="text-sm text-gray-500 italic">No tags yet</p>
              )}
            </div>
          </div>

          <div className="border-t border-[var(--border-color)] pt-6">
            <div className="text-xs text-gray-500 space-y-1">
              <p>© 2025 NotesKeeper</p>
              <p>Smart notes management</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}