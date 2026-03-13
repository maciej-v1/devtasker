import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useTaskStorage } from './useTaskStorage';

/**
 * Domain hook for all task operations.
 * Keeps App.jsx focused on rendering.
 */
export const useTasks = () => {
  const [tasks, setTasks] = useTaskStorage();

  const addTask = useCallback(title => {
    // Avoid adding empty/whitespace-only tasks
    const trimmed = title.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();

    setTasks(tasks => {
      // Early exit if a duplicate already exists (case-insensitive)
      const exists = tasks.some(task => task.title.toLowerCase() === normalized);
      if (exists) return tasks;

      const updatedTasks = [
        ...tasks,
        { id: nanoid(), title: trimmed, done: false },
      ];
      return updatedTasks;
    });
  }, []);

  const toggleTask = useCallback(id => {
    setTasks(tasks => {
      let changed = false;
      const updatedTasks = tasks.map(task => {
        if (task.id !== id) return task;
        changed = true;
        return { ...task, done: !task.done };
      });
      return changed ? updatedTasks : tasks; // return the same reference to skip re-render/storage write
    });
  }, []);

  const deleteTask = useCallback(id => {
    setTasks(tasks => {
      const updatedTasks = tasks.filter(task => task.id !== id);

      return updatedTasks.length === tasks.length
        ? tasks // no deletion → skip changes
        : updatedTasks;
    });
  }, []);

  return {
    tasks,
    actions: {
      addTask,
      toggleTask,
      deleteTask
    }
  };
}