import TaskInput from './TaskInput';
import TaskList from './TaskList';
import type { Task } from '../../domain/task';
import type { TaskReason } from '../../constants/taskReasons';
import './TasksSection.css';

// This matches the domain return type from useTasks
type TaskActionResult = { ok: true; task: Task } | { ok: false; reason: TaskReason };

type TasksSectionProps = {
  tasks: Task[];
  onAddTask: (title: string) => TaskActionResult;
  onToggleTask: (id: string) => TaskActionResult;
  onDeleteTask: (id: string) => TaskActionResult;
};

const TasksSection = ({ tasks, onAddTask, onToggleTask, onDeleteTask }: TasksSectionProps) => {
  return (
    <>
      <h1 className="tasks-section-title">DevTasker</h1>
      <TaskInput onAdd={onAddTask} />
      <TaskList tasks={tasks} onToggle={onToggleTask} onDelete={onDeleteTask} />
    </>
  );
};

export default TasksSection;
