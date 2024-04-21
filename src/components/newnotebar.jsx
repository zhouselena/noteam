import React, { useState, useEffect } from 'react';

function Typewriter({ words, delay }) {
  const [typetext, setTypetext] = useState('');
  const [typeindex, setTypeindex] = useState(0);
  const [wordindex, setWordIndex] = useState(0);
  useEffect(() => {
    const word = words[wordindex];
    if (typeindex < word.length) {
      const timeout = setTimeout(() => {
        setTypetext((prevText) => prevText + word[typeindex]);
        setTypeindex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setTypeindex(0);
        setTypetext('');
      }, delay * 5);
    }
    return () => {};
  }, [typeindex, delay, words]);
  return <span className="typewriter">{typetext}</span>;
}

function NoteBar(props) {
  const handleAdd = () => {
    props.updateNote(props.id, 'addNote', {});
  };
  const words = ['Teammates...', 'Friends...', 'Classmates...', 'Family...'];
  return (
    <div className="new-note-bar">
      <div className="text-stack">
        <h2>Welcome to <span className="typewriter">Noteam</span>: A Place For <Typewriter className="typewriter" words={words} delay={150} /></h2>
        <p>Click the + button to create a new note!</p>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="add-button"
        aria-label="Add"
      >
        <i className="fa-solid fa-3x fa-plus" />
      </button>
    </div>
  );
}
export default NoteBar;
