import { dequeueTaskMutation, loadTaskMutationQueue } from './taskMutationQueue';
import { TASK_MUTATION_KIND } from './taskMutations';
import { createTask, updateTask, deleteTask } from '../api/tasksApi';
import type { TaskMutation } from './taskMutations';

/**
 * Replay queued offline task mutations against the backend.
 *
 * Behavior:
 * - Mutations are processed strictly in FIFO order
 * - Each mutation is removed from the queue only after success
 * - On first failure, replay stops (remaining mutations stay queued)
 *
 * This function is intentionally side-effecting and imperative.
 * It represents a synchronization boundary, not domain logic.
 */
export const replayTaskMutations = async (): Promise<void> => {
  // We re-check length dynamically so dequeue/shift stays authoritative
  while (loadTaskMutationQueue().length > 0) {
    const mutation = dequeueTaskMutation();

    if (!mutation) return;

    try {
      await applyMutation(mutation);
    } catch {
      // Put mutation back at the front by reloading the rest and re-saving
      // Simpler approach: break and leave remaining mutations queued
      // (mutation was already removed, so reinsert it)
      requeueFront(mutation);
      return;
    }
  }
};

/**
 * Apply a single mutation to the backend.
 *
 * Each branch delegates to the existing, well-tested API functions.
 */
const applyMutation = async (mutation: TaskMutation): Promise<void> => {
  switch (mutation.kind) {
    case TASK_MUTATION_KIND.Add:
      await createTask(mutation.task);
      return;

    case TASK_MUTATION_KIND.Update:
      await updateTask(mutation.task);
      return;

    case TASK_MUTATION_KIND.Delete:
      await deleteTask(mutation.taskId);
      return;

    /* Exhaustiveness guard */
    default: {
      const _exhaustive: never = mutation;
      return _exhaustive;
    }
  }
};

/**
 * Reinsert a mutation at the front of the queue.
 *
 * Needed when replay fails mid-stream to avoid losing intent.
 */
const requeueFront = (mutation: TaskMutation): void => {
  const queue = loadTaskMutationQueue();
  queue.unshift(mutation);
  localStorage.setItem('taskMutationQueue', JSON.stringify(queue));
};
