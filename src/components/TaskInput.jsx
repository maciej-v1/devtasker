import { useState } from 'react'
import './TaskInput.css'

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className="task-input" onSubmit={submit}>
      <input
        className="task-input-field"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task…"
      />
      <button className="task-input-add" type="submit">
        Add
      </button>
    </form>
  )
}
