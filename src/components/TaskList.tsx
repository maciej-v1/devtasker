import React from 'react';
import './TaskList.css';
import TaskItem from './TaskItem';
import type { Task } from '../domain/task';

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => unknown;
  onDelete: (id: string) => unknown;
};

const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <li className="empty-state" role="status">
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
