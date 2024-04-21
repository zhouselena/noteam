import React, { useState } from 'react';
import { produce } from 'immer';
import Note from './note';

function App() {
  const [notes, setNotes] = useState({
    id1: {
      title: 'Note 1',
      text: 'Body of note 1',
      x: 0,
      y: 0,
      size: 300,
      zIndex: 0,
    },
    id2: {
      title: 'Note 2',
      text: 'Body of note 2',
      x: 50,
      y: 50,
      size: 300,
      zIndex: 0,
    },
  });
  const updateNote = (id, updatedFields) => {
    setNotes(produce((draft) => {
      draft[id] = { ...draft[id], ...updatedFields };
    }));
  };

  return (
    <div>
      {Object.entries(notes).map(([id, note]) => {
        return <Note id={id} note={note} updateNote={updateNote} />;
      })}
    </div>
  );
}

export default App;
