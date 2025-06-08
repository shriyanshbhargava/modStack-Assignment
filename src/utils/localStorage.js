const NOTES_STORAGE_PREFIX = "modstack_notes_";

export const notesStorage = {
  // Get notes for a specific user
  getNotes: (userId) => {
    if (!userId) return [];
    try {
      const notes = localStorage.getItem(`${NOTES_STORAGE_PREFIX}${userId}`);
      return notes ? JSON.parse(notes) : [];
    } catch (error) {
      console.error("Error getting notes from localStorage:", error);
      return [];
    }
  },

  // Save notes for a specific user
  saveNotes: (userId, notes) => {
    if (!userId) return false;
    try {
      localStorage.setItem(
        `${NOTES_STORAGE_PREFIX}${userId}`,
        JSON.stringify(notes)
      );
      return true;
    } catch (error) {
      console.error("Error saving notes to localStorage:", error);
      return false;
    }
  },

  // Add a new note for a specific user
  addNote: (userId, note) => {
    if (!userId) return null;
    const notes = notesStorage.getNotes(userId);
    const newNote = {
      id: Date.now(),
      ...note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.unshift(newNote);
    notesStorage.saveNotes(userId, notes);
    return newNote;
  },

  // Update a note for a specific user
  updateNote: (userId, id, updatedNote) => {
    if (!userId) return null;
    const notes = notesStorage.getNotes(userId);
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex !== -1) {
      notes[noteIndex] = {
        ...notes[noteIndex],
        ...updatedNote,
        updatedAt: new Date().toISOString(),
      };
      notesStorage.saveNotes(userId, notes);
      return notes[noteIndex];
    }
    return null;
  },

  // Delete a note for a specific user
  deleteNote: (userId, id) => {
    if (!userId) return [];
    const notes = notesStorage.getNotes(userId);
    const filteredNotes = notes.filter((note) => note.id !== id);
    notesStorage.saveNotes(userId, filteredNotes);
    return filteredNotes;
  },

  // Search notes for a specific user
  searchNotes: (userId, query) => {
    if (!userId) return [];
    const notes = notesStorage.getNotes(userId);
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
  },
};
