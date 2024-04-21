import React, { useState } from 'react';
import { produce } from 'immer';
import Note from './note';

function App() {
  const [notes, setNotes] = useState({
    id: {
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
  const updateNote = (id, cmd, updatedFields) => {
    setNotes((prevState) => {
      return produce(prevState, (draft) => {
        if (cmd === 'deleteNote') {
          delete draft[id];
        } else if (cmd === 'moveNote') {
          draft[id].x = updatedFields.x;
          draft[id].y = updatedFields.y;
        } else if (cmd === 'editInfo') {
          draft[id].title = updatedFields.title;
          draft[id].text = updatedFields.text;
        }
      });
    });
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
