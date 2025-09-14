function SearchBar({ searchQuery, onSearchChange, sortBy, onSortChange }) {
  try {
    return (
      <div className="bg-white border-b border-[var(--border-color)] p-6" data-name="search-bar" data-file="components/SearchBar.js">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <div className="icon-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></div>
            <input
              type="text"
              placeholder="Search notes by title or content..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <div className="icon-x text-lg"></div>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 border border-[var(--border-color)] rounded-lg bg-white focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            >
              <option value="updatedAt">Last Updated</option>
              <option value="createdAt">Date Created</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SearchBar component error:', error);
    return null;
  }
}