import React, { useCallback, useState } from 'react';
import { ERROR_MESSAGES } from '../../constants/taskErrors';
import type { TaskActionResult } from '../../domain/task';
import styles from './TaskInput.module.css';

type TaskInputProps = {
  onAdd: (title: string) => TaskActionResult;
};

/**
 * Controlled input: React owns the value, so validation and clearing the field after success are easy.
 *
 * Why `useCallback` on `submit`?
 * - Keeps a stable function identity when dependencies don’t change, which plays nicely with
 *   memoized children and makes hook dependency arrays easier to reason about.
 */
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

      if (result.ok) {
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
    <form className={styles.taskInput} onSubmit={submit}>
      <div className={styles.taskInputRow}>
        <input
          className={styles.taskInputField}
          value={title}
          onChange={handleChange}
          placeholder="Add a task…"
          aria-label="Task title"
        />
        <button className={styles.taskInputAdd} type="submit">
          Add
        </button>
      </div>
      {error && <p className={styles.taskInputError}>{error.message}</p>}
    </form>
  );
};

export default React.memo(TaskInput);
