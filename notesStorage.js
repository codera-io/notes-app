const NotesStorage = {
  NOTES_KEY: 'noteskeeper_notes',
  TAGS_KEY: 'noteskeeper_tags',

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  getCurrentTimestamp() {
    return new Date().toISOString();
  },

  getAllNotes() {
    try {
      const notes = localStorage.getItem(this.NOTES_KEY);
      return notes ? JSON.parse(notes) : [];
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  },

  getAllTags() {
    try {
      const tags = localStorage.getItem(this.TAGS_KEY);
      return tags ? JSON.parse(tags) : [];
    } catch (error) {
      console.error('Error loading tags:', error);
      return [];
    }
  },

  saveNotes(notes) {
    try {
      localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  },

  saveTags(tags) {
    try {
      localStorage.setItem(this.TAGS_KEY, JSON.stringify(tags));
    } catch (error) {
      console.error('Error saving tags:', error);
    }
  },

  createNote({ title, content, tags = [] }) {
    const notes = this.getAllNotes();
    const allTags = this.getAllTags();
    
    const newNote = {
      id: this.generateId(),
      title: title || 'Untitled Note',
      content: content || '',
      tags: tags,
      createdAt: this.getCurrentTimestamp(),
      updatedAt: this.getCurrentTimestamp(),
      pinned: false,
      archived: false
    };

    // Add new tags if they don't exist
    tags.forEach(tagName => {
      if (!allTags.find(t => t.name === tagName)) {
        allTags.push({
          id: this.generateId(),
          name: tagName,
          color: TagColors.getRandomColor()
        });
      }
    });

    notes.unshift(newNote);
    this.saveNotes(notes);
    this.saveTags(allTags);
    
    return newNote;
  },

  updateNote(id, updates) {
    const notes = this.getAllNotes();
    const noteIndex = notes.findIndex(note => note.id === id);
    
    if (noteIndex !== -1) {
      const updatedNote = {
        ...notes[noteIndex],
        ...updates,
        updatedAt: this.getCurrentTimestamp()
      };
      
      notes[noteIndex] = updatedNote;
      this.saveNotes(notes);
      
      // Update tags if new ones were added
      if (updates.tags) {
        const allTags = this.getAllTags();
        updates.tags.forEach(tagName => {
          if (!allTags.find(t => t.name === tagName)) {
            allTags.push({
              id: this.generateId(),
              name: tagName,
              color: TagColors.getRandomColor()
            });
          }
        });
        this.saveTags(allTags);
      }
      
      return updatedNote;
    }
    
    return null;
  },

  deleteNote(id) {
    const notes = this.getAllNotes();
    const filteredNotes = notes.filter(note => note.id !== id);
    this.saveNotes(filteredNotes);
  }
};