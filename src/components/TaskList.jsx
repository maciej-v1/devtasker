import './TaskList.css'

export default function TaskList({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return <p className="empty-state">No tasks yet.</p>
  }

  return (
    <ul className="task-list">
      {items.map((t) => (
        <li key={t.id} className="task-item">
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => onToggle(t.id)}
            aria-label={`Mark "${t.title}" as ${t.done ? 'todo' : 'done'}`}
          />
          <span className={`task-title${t.done ? ' done' : ''}`}>{t.title}</span>
          <button className="task-delete" onClick={() => onDelete(t.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}