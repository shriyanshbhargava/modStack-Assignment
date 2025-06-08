import React, { useState } from "react";
import { Edit3, Trash2, Eye, X, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const NotesCard = ({ note, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    content: note.content,
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setIsDeleteConfirmOpen(false);
    setEditedNote({
      title: note.title,
      content: note.content,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editedNote.title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    if (!editedNote.content.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    const updatedNote = {
      ...note,
      title: editedNote.title,
      content: editedNote.content,
      updatedAt: new Date().toISOString(),
    };

    console.log("Attempting to save note:", updatedNote);

    try {
      const result = onEdit(updatedNote);
      console.log("Save result:", result);

      if (result === null || result === undefined) {
        throw new Error("Failed to update note");
      }

      toast.success("Note updated successfully");
      setIsEditing(false);
      closeModal();
    } catch (error) {
      console.error("Save error details:", error);
      toast.error(`Failed to update note: ${error.message}`);
    }
  };

  const handleDeleteConfirm = () => {
    setIsDeleteConfirmOpen(true);
    toast.success("Note Deleted successfully");

  };

  const confirmDelete = () => {
    try {
      onDelete(note.id);
      toast.success("Note deleted successfully");
      closeModal();
    } catch (error) {
      toast.error("Failed to delete note");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border border-gray-200 group">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-800 text-base sm:text-lg line-clamp-1 flex-1 mr-2">
            {note.title}
          </h3>
          <div className="flex space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={openModal}
              className="text-gray-400 hover:text-green-500 transition-colors p-1 rounded"
              title="View note"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                openModal();
                handleEdit();
              }}
              className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded"
              title="Edit note"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
              title="Delete note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-3">
          {note.content}
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
          <div className="text-xs text-gray-400">
            Created: {formatDate(note.createdAt)}
          </div>
          {note.updatedAt !== note.createdAt && (
            <div className="text-xs text-gray-500">
              Updated: {formatDate(note.updatedAt)}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-sm sm:max-w-md lg:max-w-2xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                {isEditing ? (
                  <input
                    name="title"
                    value={editedNote.title}
                    onChange={handleInputChange}
                    className=" font-semibold text-gray-800 flex-1 mr-2 sm:mr-4 border rounded px-2 py-1 text-sm sm:text-base"
                  />
                ) : (
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex-1 mr-2 sm:mr-4 line-clamp-2">
                    {note.title}
                  </h2>
                )}
                <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="text-gray-400 hover:text-green-500 transition-colors p-1 sm:p-2 rounded-lg hover:bg-gray-100"
                      title="Save note"
                    >
                      <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500 transition-colors p-1 sm:p-2 rounded-lg hover:bg-gray-100"
                      title="Edit note"
                    >
                      <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 sm:p-2 rounded-lg hover:bg-gray-100"
                    title="Close"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                {isEditing ? (
                  <textarea
                    name="content"
                    value={editedNote.content}
                    onChange={handleInputChange}
                    className="w-full text-gray-700 text-sm sm:text-base leading-relaxed border rounded p-2 sm:p-3 min-h-[150px] sm:min-h-[200px] resize-none"
                    placeholder="Enter your note content..."
                  />
                ) : (
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                    {note.content}
                  </p>
                )}
              </div>

              <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 text-xs sm:text-sm text-gray-500">
                  <div>Created: {formatDate(note.createdAt)}</div>
                  {note.updatedAt !== note.createdAt && (
                    <div>Updated: {formatDate(note.updatedAt)}</div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isDeleteConfirmOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-6 text-center"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base order-2 sm:order-1"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base order-1 sm:order-2"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#4CAF50",
              color: "white",
              fontSize: "14px",
            },
          },
          error: {
            style: {
              background: "#F44336",
              color: "white",
              fontSize: "14px",
            },
          },
        }}
      />
    </>
  );
};

export default NotesCard;