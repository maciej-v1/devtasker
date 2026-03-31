import React, { useCallback } from 'react';
import type { Task } from '../../domain/task';
import styles from './TaskItem.module.css';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

/**
 * One row in the list: checkbox (controlled), title, delete.
 *
 * Why `useCallback` deps include `task.id` and handlers?
 * - This component is memoized (`React.memo`). If callbacks closed over stale `task.id` or handlers,
 *   you’d toggle/delete the wrong row after updates. Exhaustive deps prevent that class of bug.
 *
 * Why not hand-build a “safe” title string for `aria-label`?
 * - React escapes text in JSX; embedding `task.title` in the label string is fine for screen readers.
 */
const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [onToggle, task.id]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [onDelete, task.id]);

  const toggleLabel = `Mark "${task.title}" as ${task.done ? 'todo' : 'done'}`;

  return (
    <li role="listitem" className={styles.taskItem} data-task-id={task.id}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggle}
        aria-label={toggleLabel}
      />

      <span className={`${styles.taskItemTitle} ${task.done ? styles.done : ''}`}>
        {task.title}
      </span>

      <button type="button" className={styles.taskItemDelete} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default React.memo(TaskItem);
