import React from 'react';

function NoteBar(props) {
  const handleAdd = () => {
    props.updateNote(props.id, 'addNote', {});
  };
  return (
    <div className="new-note">
      <button type="button" onClick={handleAdd} className="add-button" aria-label="Add">
        <i className="fa-solid fa-3x fa-plus" />
      </button>

    </div>
  );
}
export default NoteBar;
