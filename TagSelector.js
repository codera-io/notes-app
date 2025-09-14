function TagSelector({ existingTags, selectedTags, onTagsChange }) {
  try {
    const [inputValue, setInputValue] = React.useState('');
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const filteredTags = existingTags.filter(tag => 
      !selectedTags.includes(tag.name) &&
      tag.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    const addTag = (tagName) => {
      if (tagName.trim() && !selectedTags.includes(tagName.trim())) {
        onTagsChange([...selectedTags, tagName.trim()]);
      }
      setInputValue('');
      setIsDropdownOpen(false);
    };

    const removeTag = (tagName) => {
      onTagsChange(selectedTags.filter(t => t !== tagName));
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
        removeTag(selectedTags[selectedTags.length - 1]);
      }
    };

    const getTagColor = (tagName) => {
      const tag = existingTags.find(t => t.name === tagName);
      return tag ? tag.color : TagColors.getColorForTag(tagName);
    };

    return (
      <div className="relative" data-name="tag-selector" data-file="components/TagSelector.js">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        
        <div className="border border-[var(--border-color)] rounded-lg p-2 min-h-[44px] flex flex-wrap gap-2 items-center">
          {selectedTags.map(tagName => (
            <span
              key={tagName}
              className="tag-chip flex items-center gap-1"
              style={{ backgroundColor: getTagColor(tagName) }}
            >
              {tagName}
              <button
                type="button"
                onClick={() => removeTag(tagName)}
                className="hover:bg-black hover:bg-opacity-20 rounded-full p-0.5"
              >
                <div className="icon-x text-xs"></div>
              </button>
            </span>
          ))}
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsDropdownOpen(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsDropdownOpen(inputValue.length > 0)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            placeholder="Type to add tags..."
            className="flex-1 min-w-0 outline-none"
          />
        </div>

        {isDropdownOpen && (inputValue.length > 0 || filteredTags.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--border-color)] rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {inputValue.trim() && !existingTags.find(t => t.name.toLowerCase() === inputValue.toLowerCase()) && (
              <button
                type="button"
                onClick={() => addTag(inputValue)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
              >
                <div className="icon-plus text-sm text-[var(--primary-color)]"></div>
                <span className="text-sm">Create "{inputValue}"</span>
              </button>
            )}
            
            {filteredTags.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => addTag(tag.name)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tag.color }}
                ></div>
                <span className="text-sm">{tag.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('TagSelector component error:', error);
    return null;
  }
}
