import React, { useState, useCallback } from 'react'
import './TaskInput.css'
import { ERROR_MESSAGES } from '../constants/taskErrors';

const TaskInput = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const handleChange = useCallback((e) => {
    setTitle(e.target.value);
    setError(null);
  }, []);

  const submit = useCallback((e) => {
    e.preventDefault();

    const form = e.target;
    const inputValue = form.elements[0].value;
    const result = onAdd(inputValue);

    if (result?.ok) {
      setTitle('');
      setError(null);
    } else {
      setError({
        message: ERROR_MESSAGES[result.reason] || ERROR_MESSAGES['unknown']
      });
    }
  }, [onAdd]);

  return (
    <form className="task-input" onSubmit={submit}>
      <div className='task-input-row'>
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
      </div>
      {error && <p className='task-input-error'>{error.message}</p>}
    </form>
  );
};

export default React.memo(TaskInput);
