import './TaskList.css'

export default function TaskList({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return <p className="empty-state">No tasks yet.</p>
  }

  const handleToggle = id => {
    onToggle(id);
  }

  const handleDelete = id => {
    onDelete(id);
  }

  return (
    <ul className="task-list">
      {items.map(task => (
        <li key={task.id} className="task-item">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => handleToggle(task.id)}
            aria-label={`Mark "${task.title}" as ${task.done ? 'todo' : 'done'}`}
          />
          <span className={`task-title${task.done ? ' done' : ''}`}>{task.title}</span>
          <button className="task-delete" onClick={() => handleDelete(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}