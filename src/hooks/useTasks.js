import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useTaskStorage } from './useTaskStorage';
import { TASKS_KEY_NAME } from '../constants/storage';

/**
 * Domain hook for all task operations.
 * Keeps App.jsx focused on rendering.
 */
export const useTasks = () => {
  const [tasks, setTasks] = useTaskStorage(TASKS_KEY_NAME, []);

  const addTask = useCallback(title => {
    // Avoid adding empty/whitespace-only tasks
    const trimmed = title.trim();
    if (!trimmed) return;

    setTasks(prev => [
      ...prev,
      { id: nanoid(), title: trimmed, done: false },
    ]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback(id => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  return { tasks, addTask, toggleTask, deleteTask };
}