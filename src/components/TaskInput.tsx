import React, { useState, useCallback } from 'react';
import './TaskInput.css';
import { ERROR_MESSAGES } from '../constants/taskErrors';
import type { Task } from '../domain/task';
import type { TaskReason } from '../constants/taskReasons';

type AddResult = { ok: true; task: Task } | { ok: false; reason: TaskReason };

type TaskInputProps = {
  onAdd: (title: string) => AddResult;
};

const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<{ message: string } | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setError(null);
  }, []);

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const result = onAdd(title);

      if (result?.ok) {
        setTitle('');
        setError(null);
      } else {
        setError({
          message: ERROR_MESSAGES[result.reason] ?? ERROR_MESSAGES.unknown,
        });
      }
    },
    [onAdd, title],
  );

  return (
    <form className="task-input" onSubmit={submit}>
      <div className="task-input-row">
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
      {error && <p className="task-input-error">{error.message}</p>}
    </form>
  );
};

export default React.memo(TaskInput);
