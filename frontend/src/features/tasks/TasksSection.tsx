import TaskInput from './TaskInput';
import TaskList from './TaskList';
import type { Task, TaskActionResult } from '../../domain/task';
import styles from './TasksSection.module.css';

type TasksSectionProps = {
  tasks: Task[];
  onAddTask: (title: string) => TaskActionResult;
  onToggleTask: (id: string) => TaskActionResult;
  onDeleteTask: (id: string) => TaskActionResult;
};

/**
 * Presentational slice: title, create form, and list. No storage or domain hooks here so you can
 * reuse it in tests/stories with fake props.
 */
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
