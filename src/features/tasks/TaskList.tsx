import React from 'react';
import styles from './TaskList.module.css';
import TaskItem from './TaskItem';
import type { Task } from '../../domain/task';

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => unknown;
  onDelete: (id: string) => unknown;
};

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
