import React from 'react';
import TaskInput from './components/TaskInput.jsx'
import TaskList from './components/TaskList.jsx'
import './App.css'
import { useTasks } from './hooks/useTasks.js';

const App = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  return (
    <main className="app">
      <h1 className="title">DevTasker</h1>
      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  )
}

export default React.memo(App);