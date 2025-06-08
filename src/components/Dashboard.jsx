import React, { useState, useEffect, useRef } from "react";
import {
  PlusCircle,
  Search,
  BookOpen,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { notesStorage } from "../utils/localStorage";
import NotesCard from "./NotesCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load notes on component mount
  useEffect(() => {
    if (user?.sub) {
      const loadedNotes = notesStorage.getNotes(user.sub);
      setNotes(loadedNotes);
      setFilteredNotes(loadedNotes);
    }
  }, [user?.sub]);

  // Filter notes based on search query
  useEffect(() => {
    if (user?.sub) {
      if (searchQuery.trim()) {
        const filtered = notesStorage.searchNotes(user.sub, searchQuery);
        setFilteredNotes(filtered);
      } else {
        setFilteredNotes(notes);
      }
    }
  }, [searchQuery, notes, user?.sub]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
      onLogout: () => {
        navigate("/");
      },
    });
  };

  const handleCreateNote = () => {
    if (user?.sub && newNote.title.trim() && newNote.content.trim()) {
      const createdNote = notesStorage.addNote(user.sub, newNote);
      const updatedNotes = [createdNote, ...notes];
      setNotes(updatedNotes);
      setNewNote({ title: "", content: "" });
      setIsCreating(false);
    }
  };

  const deleteNote = (id) => {
    if (user?.sub) {
      const updatedNotes = notesStorage.deleteNote(user.sub, id);
      setNotes(updatedNotes);
    }
  };

  const resetForm = () => {
    setIsCreating(false);
    setNewNote({ title: "", content: "" });
  };

  const updateNote = (updatedNote) => {
    if (!user?.sub) {
      console.error("No user ID available");
      return null;
    }

    try {
      const result = notesStorage.updateNote(user.sub, updatedNote.id, {
        title: updatedNote.title,
        content: updatedNote.content,
      });

      if (result) {
        // Update the notes state
        const updatedNotes = notes.map((note) =>
          note.id === updatedNote.id ? result : note
        );
        setNotes(updatedNotes);
        setFilteredNotes(updatedNotes);
      }

      return result;
    } catch (error) {
      console.error("Error updating note:", error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://i.ibb.co/Hf3X7ZkY/df-removebg-preview.png"
              alt="ModStack Notes"
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ModStack Notes
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>New Note</span>
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name || user.email}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 max-w-24 ">
                    {user?.given_name || user?.email || "User"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info Section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      {user?.picture ? (
                        <img
                          src={user.picture}
                          alt={user.name || user.email}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                        {user?.email_verified !== undefined && (
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">
                              Email verified:{" "}
                            </span>
                            <span
                              className={`text-xs ml-1 ${
                                user.email_verified
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {user.email_verified ? "Yes" : "No"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Logout Option */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {isCreating && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Create New Note</h3>
            <input
              type="text"
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              placeholder="Write your note here..."
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleCreateNote}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Note
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NotesCard
              key={note.id}
              note={note}
              onEdit={updateNote}
              onDelete={deleteNote}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && !isCreating && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchQuery ? "No notes found" : "No notes yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? `No notes match "${searchQuery}". Try a different search term.`
                : "Create your first note to get started!"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsCreating(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create First Note
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
