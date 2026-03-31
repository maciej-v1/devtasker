import { normalizeId } from '../utils/normalizeId';
import type { Task } from './task';

/**
 * Returns whether any task’s id matches `normalizedId` after normalization.
 *
 * Why normalize both sides?
 * - Defensive consistency: ids are strings that might arrive from DOM attributes or future APIs;
 *   comparing a single normalized form avoids subtle mismatches.
 */
export const taskExists = (tasks: Task[], normalizedId: string): boolean => {
  return tasks.some(task => normalizeId(task.id) === normalizedId);
};
