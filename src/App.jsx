import TaskInput from './components/TaskInput.jsx'
import TaskList from './components/TaskList.jsx'
import './App.css'
import { useTaskStorage } from './hooks/useTaskStorage.js';
import { TASKS_KEY_NAME } from './constants/storage.js';

export default function App() {
  const [tasks, setTasks] = useTaskStorage(TASKS_KEY_NAME, [])

  const addTask = title => {
    setTasks(prev => [...prev, { id: crypto.randomUUID(), title, done: false }]);
  }

  const toggleTask = id => {
    setTasks(prev => prev.map(task => (task.id === id ? { ...task, done: !task.done } : task)));
  }

  const deleteTask = id => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  return (
    <main className="app">
      <h1 className="title">DevTasker</h1>
      <TaskInput onAdd={addTask} />
      <TaskList items={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  )
}