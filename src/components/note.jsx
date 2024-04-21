import React, { useState } from 'react';
import Draggable from 'react-draggable';

function Note(props) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.note.title);
  const [text, setText] = useState(props.note.text);
  const handleDrag = (e, data) => {
    props.updateNote(props.id, 'moveNote', { x: data.x, y: data.y });
  };
  const handleSave = () => {
    props.updateNote(props.id, 'editInfo', { title, text });
    setEdit(!edit);
  };
  const handleDelete = () => {
    props.updateNote(props.id, 'deleteNote', {});
  };
  const renderToolBar = () => {
    return (
      <div className="navbar">
        <i className="fa-solid fa-up-down-left-right" />
        {edit ? (
          <button type="button" onClick={handleSave} className="icon-button" aria-label="Save">
            <i className="fa-solid fa-check" />
          </button>
        ) : (
          <button type="button" onClick={() => setEdit(!edit)} className="icon-button" aria-label="Edit">
            <i className="fa-solid fa-pen-to-square" />
          </button>
        )}
        <button type="button" onClick={handleDelete} className="icon-button" aria-label="Delete">
          <i className="fa fa-trash-o" />
        </button>
      </div>

    );
  };
  return (
    <Draggable
      handle=".fa-up-down-left-right"
      grid={[5, 5]} // snapping to grid pixels
      defaultPosition={{ x: 20, y: 20 }} // if no position given
      position={{
        x: props.note.x, y: props.note.y, width: 200, height: 200,
      }}
      onDrag={handleDrag}
    >
      <div className="note" style={{ '--note-size': `${props.note.size}px` }}>
        {renderToolBar()}
        {edit ? (
          <div className="note-div">
            <textarea value={title} onChange={(e) => setTitle(e.target.value)}>{props.note.title}</textarea>
            <textarea value={text} onChange={(e) => setText(e.target.value)}>{props.note.text}</textarea>
          </div>
        ) : (
          <div className="note-div">
            <h1>{props.note.title}</h1>
            <p>{props.note.text}</p>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default Note;
