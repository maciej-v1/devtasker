import { useCallback, useMemo } from 'react';
import { tryAddTask, tryDeleteTask, tryToggleTask } from '../domain/taskTransitions';
import type { TaskActionResult } from '../domain/task';
import { useTaskStorage } from './useTaskStorage';
import {
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from '../api/tasksApi';
import { enqueueTaskMutation } from '../sync/taskMutationQueue';
import { TASK_MUTATION_KIND } from '../sync/taskMutations';

/**
 * Application hook for task workflows: validation, persistence, and stable action callbacks.
 *
 * Important design note (updated):
 * - Once async sources (e.g. backend hydration) can update the same state,
 *   React no longer guarantees that state updaters flush immediately during an event.
 *
 * Therefore:
 * - Domain transitions must be computed *before* calling `setTasks`
 * - The returned `TaskActionResult` must not depend on updater execution timing
 *
 * This preserves the synchronous UI contract even in concurrent / async scenarios.
 */
export const useTasks = () => {
  const [tasks, setTasks] = useTaskStorage();

  const addTask = useCallback(
    (title: string): TaskActionResult => {
      const { next, result } = tryAddTask(tasks, title);

      if (!result.ok) {
        return result;
      }

      // Commit domain state immediately
      setTasks(next);

      const createdTask = next[next.length - 1];

      if (navigator.onLine) {
        createTaskApi(createdTask).catch(() => {
          // Backend failure while "online" is treated like offline for now
          enqueueTaskMutation({
            kind: TASK_MUTATION_KIND.Add,
            task: createdTask,
          });
        });
      } else {
        enqueueTaskMutation({
          kind: TASK_MUTATION_KIND.Add,
          task: createdTask,
        });
      }

      return result;
    },
    [tasks, setTasks],
  );

  const toggleTask = useCallback(
    (id: string): TaskActionResult => {
      const { next, result } = tryToggleTask(tasks, id);

      if (!result.ok) {
        return result;
      }

      setTasks(next);

      const updatedTask = next.find(t => t.id === id)!;

      if (navigator.onLine) {
        updateTaskApi(updatedTask).catch(() => {
          enqueueTaskMutation({
            kind: TASK_MUTATION_KIND.Update,
            task: updatedTask,
          });
        });
      } else {
        enqueueTaskMutation({
          kind: TASK_MUTATION_KIND.Update,
          task: updatedTask,
        });
      }

      return result;
    },
    [tasks, setTasks],
  );

  const deleteTask = useCallback(
    (id: string): TaskActionResult => {
      const { next, result } = tryDeleteTask(tasks, id);

      if (!result.ok) {
        return result;
      }

      setTasks(next);

      if (navigator.onLine) {
        deleteTaskApi(id).catch(() => {
          enqueueTaskMutation({
            kind: TASK_MUTATION_KIND.Delete,
            taskId: id,
          });
        });
      } else {
        enqueueTaskMutation({
          kind: TASK_MUTATION_KIND.Delete,
          taskId: id,
        });
      }

      return result;
    },
    [tasks, setTasks],
  );

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
