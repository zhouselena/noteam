import React, { useState } from 'react';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';
import TextAreaAutosize from 'react-textarea-autosize';

function Note(props) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.note.title);
  const [text, setText] = useState(props.note.text);
  const handleDrag = (e, data) => {
    props.updateNote(props.id, 'moveNote', { x: data.x, y: data.y });
  };
  const handleSave = () => {
    // fix this for autoresize
    const textlength = text.length * 225;
    const newSize = Math.max(300, Math.sqrt(textlength));
    props.updateNote(props.id, 'editInfo', { title, text, size: newSize });
    setEdit(!edit);
  };
  const handleDelete = () => {
    props.updateNote(props.id, 'deleteNote', {});
  };
  const handleColorpink = () => {
    props.updateNote(props.id, 'changeColor', { color: 'lightpink' });
  };
  const handleColorblue = () => {
    props.updateNote(props.id, 'changeColor', { color: 'lightblue' });
  };
  const handleColorgreen = () => {
    props.updateNote(props.id, 'changeColor', { color: '#c5ffc5' });
  };
  const renderToolBar = () => {
    return (
      <div className="navbar">
        <button type="button" onClick={handleColorpink} className="color-button" aria-label="Color" id="pink">
          <span className="dot" />
        </button>
        <button type="button" onClick={handleColorblue} className="color-button" aria-label="Color" id="blue">
          <span className="dot" />
        </button>
        <button type="button" onClick={handleColorgreen} className="color-button" aria-label="Color" id="green">
          <span className="dot" />
        </button>
        {edit ? (
          <button type="button" onClick={handleSave} className="icon-button" aria-label="Save">
            <i className="fa-solid fa-xl fa-check" />
          </button>
        ) : (
          <button type="button" onClick={() => setEdit(!edit)} className="icon-button" aria-label="Edit">
            <i className="fa-solid fa-xl fa-pen-to-square" />
          </button>
        )}
        <i className="fa-solid fa-lg fa-up-down-left-right icon-button" />
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
    >
      <div className="note" style={{ '--note-size': `${props.note.size}px`, '--note-color': props.note.color }}>
        {renderToolBar()}
        {edit ? (
          <div className="edit-div">
            <TextAreaAutosize className="editTitle" value={title} onChange={(e) => setTitle(e.target.value)} minRows={1}>{props.note.title}</TextAreaAutosize>
            <TextAreaAutosize className="editText" value={text} onChange={(e) => setText(e.target.value)} minRows={3}>{props.note.text}</TextAreaAutosize>
          </div>
        ) : (
          <div className="display-div">
            <h1>{props.note.title}</h1>
            <ReactMarkdown class="note-text">{props.note.text || ''}</ReactMarkdown>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default Note;
