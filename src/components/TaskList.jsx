import React from 'react'
import './TaskList.css'
import TaskItem from './TaskItem'
import { compareTaskListProps } from '../utils/taskComparators'

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet.</p>
  }

  return (
    <ul className="task-list">
      {tasks.map(task => {

        return (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  )
}

export default React.memo(TaskList, compareTaskListProps)