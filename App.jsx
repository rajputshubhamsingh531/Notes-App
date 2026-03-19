import { useState, useRef, useEffect } from "react";
import "./App.css";
import "./main.jsx";
function App() {
  const [notes, setNotes] = useState([]);
  const inputRef = useRef();

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const value = inputRef.current.value.trim();
    if (value) {
      setNotes([...notes, value]);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    const newValue = prompt("Edit note:", notes[index]);
    if (newValue !== null && newValue.trim() !== "") {
      const updatedNotes = [...notes];
      updatedNotes[index] = newValue.trim();
      setNotes(updatedNotes);
    }
  };

  return (
    <div className="container">
      <h1>Notes App</h1>
      <div className="input-area">
        <input ref={inputRef} placeholder="Enter note..." />
        <button onClick={addNote}>Add</button>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button onClick={() => editNote(index)}>Edit</button>
            <button onClick={() => deleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
