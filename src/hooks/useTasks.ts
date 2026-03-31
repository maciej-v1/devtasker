import { useCallback, useMemo } from 'react';
import { tryAddTask, tryDeleteTask, tryToggleTask } from '../domain/taskTransitions';
import type { TaskActionResult } from '../domain/task';
import { useTaskStorage } from './useTaskStorage';

/**
 * Application hook for task workflows: validation, persistence, and stable action callbacks.
 *
 * Why functional `setTasks(prev => …)` inside each action?
 * - The updater always sees the latest tasks, even if several updates are batched together.
 * - You avoid “stale closure” bugs where an action closes over an old `tasks` snapshot.
 *
 * Why pair every `setTasks` with a domain `try*` function?
 * - The next state and the `TaskActionResult` are computed from the same `prev` array,
 *   so the UI message matches what actually happened to storage.
 *
 * Why assign `syncResult` inside the updater?
 * - React applies state updaters synchronously during event handling in typical apps, so the
 *   result is available for the caller (e.g. the form can clear only on success). Avoid duplicating
 *   domain logic outside the updater—that would risk disagreeing with what `prev` actually contained.
 */
export const useTasks = () => {
  const [tasks, setTasks] = useTaskStorage();

  const addTask = useCallback((title: string): TaskActionResult => {
    let syncResult: TaskActionResult | undefined;
    setTasks(prev => {
      const { next, result } = tryAddTask(prev, title);
      syncResult = result;
      return next;
    });
    return syncResult!;
  }, [setTasks]);

  const toggleTask = useCallback((id: string): TaskActionResult => {
    let syncResult: TaskActionResult | undefined;
    setTasks(prev => {
      const { next, result } = tryToggleTask(prev, id);
      syncResult = result;
      return next;
    });
    return syncResult!;
  }, [setTasks]);

  const deleteTask = useCallback((id: string): TaskActionResult => {
    let syncResult: TaskActionResult | undefined;
    setTasks(prev => {
      const { next, result } = tryDeleteTask(prev, id);
      syncResult = result;
      return next;
    });
    return syncResult!;
  }, [setTasks]);

  const actions = useMemo(
    () => ({
      addTask,
      toggleTask,
      deleteTask,
    }),
    [addTask, toggleTask, deleteTask],
  );

  return { tasks, actions };
};
