import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const handleToggle = () => onToggle(task.id);
  const handleDelete = () => onDelete(task.id);

  return (
    <li className="task-item" data-task-id={task.id}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggle}
        aria-label={`Mark "${task.title}" as ${task.done ? 'todo' : 'done'}`}
      />

      <span className={`task-title${task.done ? ' done' : ''}`}>
        {task.title}
      </span>

      <button className="task-delete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default React.memo(TaskItem);