import { useState } from 'react'
import TaskInput from './components/TaskInput.jsx'
import TaskList from './components/TaskList.jsx'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([])

  const addTask = (title) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, done: false }
    ])
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <main className="app">
      <h1 className="title">DevTasker</h1>
      <TaskInput onAdd={addTask} />
      <TaskList items={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  )
}
