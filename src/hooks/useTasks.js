import { useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useTaskStorage } from './useTaskStorage';
import {
  normalizeTitle,
  normalizeForComparison,
  isEmptyTitle
} from '../utils/taskNormalization.js';

/**
 * Domain hook for all task operations.
 * Keeps App.jsx focused on rendering.
 */
export const useTasks = () => {
  const [tasks, setTasks] = useTaskStorage();

  const addTask = useCallback(title => {
    const trimmed = normalizeTitle(title);
    if (isEmptyTitle(trimmed)) {
      return { ok: false, reason: 'empty' };
    }

    const normalized = normalizeForComparison(trimmed);

    let duplicate = false;

    setTasks(tasks => {
      const exists = tasks.some(task => task.title.toLowerCase() === normalized);
      if (exists) {
        duplicate = true;
        return tasks;
      }

      return [
        ...tasks,
        { id: nanoid(), title: trimmed, done: false }
      ];
    });

    if (duplicate) {
      return { ok: false, reason: 'duplicate' };
    }

    return { ok: true };
  }, []);

  const toggleTask = useCallback(id => {
    setTasks(tasks => {
      const exists = tasks.some(task => task.id === id);
      if (!exists) return tasks;

      return tasks.map(task =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      );
    });
  }, []);

  const deleteTask = useCallback(id => {
    setTasks(tasks => {
      const exists = tasks.some(task => task.id === id);
      if (!exists) return tasks;

      return tasks.filter(task => task.id !== id);
    });
  }, []);

  const actions = useMemo(() => ({
    addTask,
    toggleTask,
    deleteTask
  }), [addTask, toggleTask, deleteTask]);

  const taskStore = useMemo(() => ({
    tasks,
    actions
  }), [tasks, actions]);

  return taskStore;
}