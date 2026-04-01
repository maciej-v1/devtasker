import { useEffect } from 'react';
import { TASKS_KEY_NAME } from '../constants/storage';
import type { Task } from '../domain/task';
import { useStorage } from './useStorage';
import { fetchTasks } from '../api/tasksApi';
import { replayTaskMutations } from '../sync/taskSync';

/**
 * Stable empty default.
 *
 * Why this exists:
 * - Using an inline `[]` would create a new array on every render
 * - `useStorage` compares references to decide whether to persist
 * - A stable reference avoids noisy, unnecessary writes
 */
const EMPTY_TASKS: Task[] = [];

/**
 * Task storage hook with backend hydration and offline sync replay.
 *
 * Responsibilities:
 * - Provide a stable `[tasks, setTasks]` API for the rest of the app
 * - Persist changes to localStorage (via `useStorage`)
 * - Hydrate tasks from the backend when online
 * - Replay any queued offline mutations once connectivity is available
 *
 * What this hook deliberately does NOT do:
 * - It does not contain domain logic
 * - It does not know about UI concerns
 * - It does not decide *what* mutations mean
 *
 * Those responsibilities live in `useTasks` and the domain layer.
 */
export const useTaskStorage = () => {
  const [tasks, setTasks] = useStorage<Task[]>(TASKS_KEY_NAME, EMPTY_TASKS);

  /**
   * Initial online hydration.
   *
   * On mount:
   * - If offline → behave exactly like before (localStorage only)
   * - If online  → load tasks from backend, then replay offline mutations
   *
   * Any failure silently degrades to localStorage-only mode.
   */
  useEffect(() => {
    if (!navigator.onLine) return;

    let cancelled = false;

    fetchTasks()
      .then(remoteTasks => {
        if (!cancelled) {
          setTasks(remoteTasks);
        }
      })
      .then(() => {
        // Once state is hydrated, try to flush any offline mutations
        return replayTaskMutations();
      })
      .catch(() => {
        // Intentionally ignored:
        // - backend down
        // - malformed response
        // - replay failure
        // The app continues to work in offline mode.
      });

    return () => {
      cancelled = true;
    };
  }, [setTasks]);

  /**
   * Live reconnect handling.
   *
   * If the app stays open while the user regains connectivity,
   * attempt to replay queued mutations immediately.
   */
  useEffect(() => {
    const handleOnline = () => {
      replayTaskMutations().catch(() => {
        // Ignore and retry on next reconnect or reload
      });
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return [tasks, setTasks] as const;
};
