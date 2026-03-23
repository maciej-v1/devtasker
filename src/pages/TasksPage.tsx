
import { useTasks } from '../hooks/useTasks';
import TasksSection from '../components/TasksSection';

const TasksPage = () => {
  const { tasks, actions } = useTasks();

  return (
    <TasksSection
      tasks={tasks}
      onAddTask={actions.addTask}
      onToggleTask={actions.toggleTask}
      onDeleteTask={actions.deleteTask}
    />
  )
}

export default TasksPage;