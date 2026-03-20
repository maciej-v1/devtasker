import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import './App.css'
import { useTasks } from './hooks/useTasks';

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