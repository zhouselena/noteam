import React, { useEffect, useState } from 'react';
import Note from './Note';
import NoteBar from './Newnotebar';
import {
  deleteNote, addNote, updateNoteDB, onNotesValueChange,
} from '../services/datastore';

function App() {
  const [notes, setNotes] = useState({
  });
  useEffect(() => {
    onNotesValueChange(setNotes);
  }, []);
  const bumpAllZIndex = (lastChanged) => {
    Object.entries(notes).forEach(([id, note]) => {
      if (note.zIndex >= lastChanged) {
        updateNoteDB(id, { zIndex: note.zIndex - 1 });
      }
    });
  };
  const updateNote = (id, cmd, updatedFields) => {
    const numberOfNotes = notes ? Object.keys(notes).length : 0;
    if (cmd === 'deleteNote') {
      deleteNote(id);
    } else if (cmd === 'moveNote') {
      updateNoteDB(id, { x: updatedFields.x, y: updatedFields.y });
    } else if (cmd === 'endMoveNote') {
      bumpAllZIndex(updatedFields.zIndex);
      updateNoteDB(id, { zIndex: numberOfNotes + 1 });
    } else if (cmd === 'editInfo') {
      updateNoteDB(id, { title: updatedFields.title, text: updatedFields.text });
    } else if (cmd === 'addNote') {
      addNote(numberOfNotes + 1);
    } else if (cmd === 'changeColor') {
      updateNoteDB(id, { color: updatedFields.color });
    } else if (cmd === 'updateSize') {
      updateNoteDB(id, { size: updatedFields.size });
    }
  };

  return (
    <div className="noteboard">
      <NoteBar updateNote={updateNote} />
      {notes && Object.entries(notes).map(([id, note]) => {
        return <Note id={id} note={note} updateNote={updateNote} />;
      })}
    </div>
  );
}

export default App;
