import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Save, X, Plus, Cloud } from 'lucide-react';
import type { Note } from '../types';
import { api } from '../services/api';

interface NotesGridProps {
  token: string;
  setAlertInfo: (info: { title: string, message: string } | null) => void;
  setConfirmInfo: (info: { title: string, message: string, onConfirm: () => void } | null) => void;
}

export const NotesGrid: React.FC<NotesGridProps> = ({ token, setAlertInfo, setConfirmInfo }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showNewNote, setShowNewNote] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await api.getNotes(token);
      setNotes(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setAlertInfo({ title: 'Error', message: 'Failed to fetch notes.' });
    } finally {
      setLoading(false);
    }
  };

  const createNote = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      setAlertInfo({ title: 'Oops!', message: 'Please fill in both title and content.' });
      return;
    }
    setLoading(true);
    try {
      await api.createNote(token, { title: newTitle, content: newContent });
      setNewTitle('');
      setNewContent('');
      setShowNewNote(false);
      fetchNotes(); 
    } catch (err) {
      setAlertInfo({ title: 'Error', message: 'Failed to create note.' });
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id: string) => {
    setLoading(true);
    try {
      await api.updateNote(token, id, { title: editTitle, content: editContent });
      setEditingId(null);
      fetchNotes(); 
    } catch (err) {
      setAlertInfo({ title: 'Error', message: 'Failed to update note.' });
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    setConfirmInfo({
      title: 'Delete Note?',
      message: 'Are you sure you want to delete this note? This cannot be undone.',
      onConfirm: async () => {
        setLoading(true);
        try {
          await api.deleteNote(token, id);
          fetchNotes(); 
        } catch (err) {
          setAlertInfo({ title: 'Error', message: 'Failed to delete note.' });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        {!showNewNote ? (
          <button
            onClick={() => setShowNewNote(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#84AAEC] text-white rounded-lg hover:bg-[#628FCB] transition shadow-lg shadow-[#84AAEC]/30"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>
        ) : (
          <div className="bg-[#F0F3FA] rounded-xl shadow-lg p-6 border border-[#B1C9EF]">
            <h3 className="text-xl font-semibold mb-4 text-[#395886]">Create New Note</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-[#B1C9EF] rounded-lg focus:ring-2 focus:ring-[#84AAEC] focus:border-transparent outline-none text-[#395886]"
              />
              <textarea
                placeholder="Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-white border border-[#B1C9EF] rounded-lg focus:ring-2 focus:ring-[#84AAEC] focus:border-transparent resize-y outline-none text-[#395886] custom-scrollbar"
              />
              <div className="flex gap-2">
                <button
                  onClick={createNote}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-[#84AAEC] text-white rounded-lg hover:bg-[#628FCB] transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save Note
                </button>
                <button
                  onClick={() => {
                    setShowNewNote(false);
                    setNewTitle('');
                    setNewContent('');
                  }}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-[#B1C9EF] text-[#395886] rounded-lg hover:bg-[#D5DEEF] transition disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading && notes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#395886] text-lg">Loading notes...</p>
        </div>
      ) : !loading && notes.length === 0 ? (
        <div className="text-center py-16">
          <Cloud className="w-16 h-16 text-[#B1C9EF] mx-auto mb-4" />
          <p className="text-[#395886] text-lg">No notes yet. Create your first note!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-[#F0F3FA] rounded-xl shadow-md hover:shadow-lg hover:shadow-[#84AAEC]/20 transition-shadow p-6 border border-[#B1C9EF] flex flex-col"
            >
              {editingId === note.id ? (
                <div className="space-y-3 flex flex-col flex-grow">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#B1C9EF] rounded-lg focus:ring-2 focus:ring-[#84AAEC] focus:border-transparent outline-none text-[#395886]"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-white border border-[#B1C9EF] rounded-lg focus:ring-2 focus:ring-[#84AAEC] focus:border-transparent resize-y outline-none text-[#395886] custom-scrollbar flex-grow"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateNote(note.id)}
                      disabled={loading}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      disabled={loading}
                      className="flex items-center gap-1 px-3 py-1 bg-[#B1C9EF] text-[#395886] rounded-lg hover:bg-[#D5DEEF] transition text-sm disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-[#628FCB]">{note.title}</h3>
                    <p className="text-[#395886] mb-4 whitespace-pre-wrap">{note.content}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#D5DEEF]">
                    <span className="text-xs text-[#628FCB]">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(note)}
                        className="p-2 text-[#628FCB] hover:text-[#84AAEC] hover:bg-[#D5DEEF] rounded-lg transition"
                        aria-label="Edit note"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-2 text-[#628FCB] hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        aria-label="Delete note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

