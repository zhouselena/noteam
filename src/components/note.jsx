import React, { useState } from 'react';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';

function Note(props) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.note.title);
  const [text, setText] = useState(props.note.text);
  const [drag, setDrag] = useState(false);
  const handleDrag = (e, data) => {
    setDrag(true);
    props.updateNote(props.id, 'moveNote', { x: data.x, y: data.y });
  };
  const handleStopDrag = () => {
    setDrag(false);
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
        {edit ? (
          <button type="button" onClick={handleSave} className="icon-button" aria-label="Save">
            <i className="fa-solid fa-xl fa-check" />
          </button>
        ) : (
          <button type="button" onClick={() => setEdit(!edit)} className="icon-button" aria-label="Edit">
            <i className="fa-solid fa-xl fa-pen-to-square" />
          </button>
        )}
        {drag ? (
          <i className="fa-solid fa-lg fa-up-down-left-right" style={{ color: 'white' }} />
        ) : (
          <i className="fa-solid fa-lg fa-up-down-left-right" />
        )}
        <button type="button" onClick={handleDelete} className="icon-button" aria-label="Delete">
          <i className="fa fa-xl fa-trash-o" />
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
      onStop={handleStopDrag}
    >
      <div className="note" style={{ '--note-size': `${props.note.size}px`, '--note-color': props.note.color }}>
        {renderToolBar()}
        {edit ? (
          <div className="note-div">
            <textarea className="editTitle" value={title} onChange={(e) => setTitle(e.target.value)}>{props.note.title}</textarea>
            <textarea className="editText" value={text} onChange={(e) => setText(e.target.value)}>{props.note.text}</textarea>
          </div>
        ) : (
          <div className="note-div">
            <h1>{props.note.title}</h1>
            <ReactMarkdown>{props.note.text || ''}</ReactMarkdown>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default Note;
