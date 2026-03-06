import './TaskList.css'

export default function TaskList({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return <p className="empty-state">No tasks yet.</p>
  }

  return (
    <ul className="task-list">
      {items.map(task => (
        <li key={task.id} className="task-item">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
            aria-label={`Mark "${task.title}" as ${task.done ? 'todo' : 'done'}`}
          />
          <span className={`task-title${task.done ? ' done' : ''}`}>{task.title}</span>
          <button className="task-delete" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}