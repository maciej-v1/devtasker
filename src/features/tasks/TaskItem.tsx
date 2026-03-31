import React, { useCallback } from 'react';
import type { Task } from '../../domain/task';
import styles from './TaskItem.module.css';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => unknown;
  onDelete: (id: string) => unknown;
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, []);

  const safeTitle = task.title.replace(/"/g, '\\"');

  return (
    <li role="listitem" className={styles.taskItem} data-task-id={task.id}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggle}
        aria-label={`Mark "${safeTitle}" as ${task.done ? 'todo' : 'done'}`}
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
