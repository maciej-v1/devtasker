import type { TaskMutation } from './taskMutations';

const STORAGE_KEY = 'taskMutationQueue';

/**
 * Load the offline mutation queue from storage.
 *
 * Defensive by design:
 * - malformed data → empty queue
 * - no exceptions leak upward
 */
export const loadTaskMutationQueue = (): TaskMutation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as TaskMutation[];
  } catch {
    return [];
  }
};

/**
 * Persist the entire mutation queue.
 *
 * Centralizing this avoids scattered JSON.parse/stringify
 * calls throughout the app.
 */
const saveTaskMutationQueue = (queue: TaskMutation[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
};

/**
 * Append a mutation to the offline queue.
 *
 * Ordering matters — mutations must replay
 * in the same sequence the user performed them.
 */
export const enqueueTaskMutation = (mutation: TaskMutation): void => {
  const queue = loadTaskMutationQueue();
  queue.push(mutation);
  saveTaskMutationQueue(queue);
};

/**
 * Remove the first mutation from the queue.
 *
 * Used during replay once a mutation is
 * successfully persisted to the backend.
 */
export const dequeueTaskMutation = (): TaskMutation | undefined => {
  const queue = loadTaskMutationQueue();
  const next = queue.shift();
  saveTaskMutationQueue(queue);
  return next;
};
