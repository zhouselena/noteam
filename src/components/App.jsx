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
  const updateNote = (id, cmd, updatedFields) => {
    if (cmd === 'deleteNote') {
      deleteNote(id);
    } else if (cmd === 'moveNote') {
      updateNoteDB(id, { x: updatedFields.x, y: updatedFields.y });
    } else if (cmd === 'editInfo') {
      updateNoteDB(id, { title: updatedFields.title, text: updatedFields.text, size: updatedFields.size });
    } else if (cmd === 'addNote') {
      addNote();
    } else if (cmd === 'changeColor') {
      updateNoteDB(id, { color: updatedFields.color });
    }
  };

  return (
    <div>
      <NoteBar updateNote={updateNote} />
      {Object.entries(notes).map(([id, note]) => {
        return <Note id={id} note={note} updateNote={updateNote} />;
      })}
    </div>
  );
}

export default App;
