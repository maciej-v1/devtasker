import React, { useState, useCallback } from 'react'
import './TaskInput.css'

const TaskInput = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const submit = useCallback((e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle('');
  }, [title, onAdd]);

  return (
    <form className="task-input" onSubmit={submit}>
      <input
        className="task-input-field"
        value={title}
        onChange={handleChange}
        placeholder="Add a task…"
        aria-label="Task title"
      />
      <button className="task-input-add" type="submit">
        Add
      </button>
    </form>
  );
};

export default React.memo(TaskInput);
