import React from 'react'
import './TaskList.css'
import TaskItem from './TaskItem'

const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <li className="empty-state" role="status">
          No tasks yet.
        </li>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </ul>
  )
}

export default React.memo(TaskList)