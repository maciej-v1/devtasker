import React, { useCallback } from "react";
import type { Task } from "../domain/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => unknown;
  onDelete: (id: string) => unknown;
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [task.id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  const safeTitle = task.title.replace(/"/g, '\\"');

  return (
    <li
      role="listitem"
      className="task-item"
      data-task-id={task.id}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggle}
        aria-label={`Mark "${safeTitle}" as ${task.done ? 'todo' : 'done'}`}
      />

      <span className={`task-title${task.done ? ' done' : ''}`}>
        {task.title}
      </span>

      <button type="button" className="task-delete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default React.memo(TaskItem);