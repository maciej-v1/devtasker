import TaskInput from './components/TaskInput.jsx'
import TaskList from './components/TaskList.jsx'
import './App.css'
import { useTasks } from './hooks/useTasks.js';

const App = () => {
  const { tasks, actions } = useTasks();

  return (
    <main className="app">
      <h1 className="title">DevTasker</h1>
      <TaskInput onAdd={actions.addTask} />
      <TaskList
        tasks={tasks}
        onToggle={actions.toggleTask}
        onDelete={actions.deleteTask}
      />
    </main>
  )
}

export default App;