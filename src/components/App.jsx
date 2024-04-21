import React, { useState } from 'react';
import { produce } from 'immer';
import Note from './note';
import NoteBar from './newnotebar';

function App() {
  const [idcount, setIDcount] = useState(3);
  const [notes, setNotes] = useState({
    id1: {
      title: 'Note 1',
      text: 'Body of note 1',
      x: 100,
      y: 100,
      size: 300,
      zIndex: 0,
      color: 'lightblue',
    },
    id2: {
      title: 'Note 2',
      text: 'Body of note 2',
      x: 230,
      y: 150,
      size: 300,
      zIndex: 0,
      color: 'lightpink',
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
          draft[id].size = updatedFields.size;
        } else if (cmd === 'addNote') {
          draft[`id${idcount}`] = {
            title: 'New note!',
            text: 'Edit me',
            x: 0,
            y: 0, // figure out why this won't start there
            size: 300,
            zIndex: 0,
            color: 'lightblue',
          };
          setIDcount(idcount + 1);
        } else if (cmd === 'changeColor') {
          draft[id].color = updatedFields.color;
        }
      });
    });
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
