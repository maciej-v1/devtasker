import { useEffect, useState } from 'react'
import TaskInput from './components/TaskInput.jsx'
import TaskList from './components/TaskList.jsx'
import { getTasks, saveTasks, TASKS_KEY_NAME } from './components/TaskPersistence.js';
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState(() => getTasks());

  const addTask = title => {
    setTasks(prev => [...prev, { id: crypto.randomUUID(), title, done: false }]);
  }

  const toggleTask = id => {
    setTasks(prev => prev.map(task => (task.id === id ? { ...task, done: !task.done } : task)));
  }

  const deleteTask = id => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  useEffect(() => {
    // Read once and compare to avoid redundant writes
    const snapshot = localStorage.getItem(TASKS_KEY_NAME);
    const serialised = JSON.stringify(tasks);
    if (snapshot !== serialised) saveTasks(tasks);
  }, [tasks]);

  return (
    <main className="app">
      <h1 className="title">DevTasker</h1>
      <TaskInput onAdd={addTask} />
      <TaskList items={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  )
}