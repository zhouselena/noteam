import React from 'react';

function NoteBar(props) {
  const handleAdd = () => {
    props.updateNote(props.id, 'addNote', {});
  };
  return (
    <div>
      <button type="button" onClick={handleAdd} className="icon-button" aria-label="Add">
        <i className="fa-solid fa-plus" />
      </button>

    </div>
  );
}
export default NoteBar;
