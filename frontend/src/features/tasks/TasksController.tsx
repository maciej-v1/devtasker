import { useTasks } from '../../hooks/useTasks';
import TasksSection from './TasksSection';

/**
 * Container component: the only place in the feature that calls `useTasks`, then passes plain data
 * and callbacks into presentational components. This boundary is a common “slice” layout in React apps.
 */
const TasksController = () => {
  const { tasks, actions } = useTasks();

  return (
    <TasksSection
      tasks={tasks}
      onAddTask={actions.addTask}
      onToggleTask={actions.toggleTask}
      onDeleteTask={actions.deleteTask}
    />
  );
};

export default TasksController;
