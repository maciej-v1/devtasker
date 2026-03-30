import { useTasks } from '../../hooks/useTasks';
import TasksSection from './TasksSection';

const TasksController = () => {
  const { tasks, actions } = useTasks();
  const props = {
    tasks,
    onAddTask: actions.addTask,
    onToggleTask: actions.toggleTask,
    onDeleteTask: actions.deleteTask,
  };

  return <TasksSection {...props} />;
};

export default TasksController;
