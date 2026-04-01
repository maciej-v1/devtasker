import React from 'react';
import type { Task } from '../../domain/task';
import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

type TaskListProps = {
  tasks: Task[];
  /** Toggle handlers return values are ignored today, but typing as `void` keeps call sites honest. */
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

/**
 * Renders the collection as a semantic list (`ul`/`li`) for accessibility and predictable focus order.
 */
const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => {
  return (
    <ul className={styles.taskList}>
      {tasks.length === 0 ? (
        <li className={styles.taskListEmptyState} role="status">
          No tasks yet.
        </li>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))
      )}
    </ul>
  );
};

export default React.memo(TaskList);
