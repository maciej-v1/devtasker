import TaskInput from './TaskInput';
import TaskList from './TaskList';
import type { Task } from '../../domain/task';
import type { TaskActionResult } from '../../domain/task';
import styles from './TasksSection.module.css';

type TasksSectionProps = {
  tasks: Task[];
  onAddTask: (title: string) => TaskActionResult;
  onToggleTask: (id: string) => TaskActionResult;
  onDeleteTask: (id: string) => TaskActionResult;
};

const TasksSection = ({ tasks, onAddTask, onToggleTask, onDeleteTask }: TasksSectionProps) => {
  return (
    <>
      <h1 className={styles.tasksSectionTitle}>DevTasker</h1>
      <TaskInput onAdd={onAddTask} />
      <TaskList tasks={tasks} onToggle={onToggleTask} onDelete={onDeleteTask} />
    </>
  );
};

export default TasksSection;
