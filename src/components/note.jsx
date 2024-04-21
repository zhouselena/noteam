import React, { useState } from 'react';
import Draggable from 'react-draggable';

function Note(props) {
  const [edit, setEdit] = useState(false);
  const handleDrag = (e, data) => {
    props.updateNote(props.id, 'moveNote', { x: data.x, y: data.y });
  };
  return (
    <Draggable
      // handle=".drag"
      grid={[25, 25]} // snapping to grid pixels
      defaultPosition={{ x: 20, y: 20 }} // if no position given
      position={{
        x: props.note.x, y: props.note.y, width: 200, height: 200,
      }}
      onDrag={handleDrag}
    >
      <div style={{ backgroundColor: 'orange', width: props.note.size, height: props.note.size }}>
        {edit ? (
          <div className="note-div">
            <button type="button" onClick={() => setEdit(!edit)}>Save</button>
            <textarea>{props.note.title}</textarea>
            <textarea>{props.note.text}</textarea>
          </div>
        ) : (
          <div className="note-div">
            <button type="button" onClick={() => setEdit(!edit)}>Edit</button>
            <h1>{props.note.title}</h1>
            <p>{props.note.text}</p>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default Note;
