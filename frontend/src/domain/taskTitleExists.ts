import { normalizeForComparison } from '../utils/taskNormalization';
import type { Task } from './task';

/**
 * Duplicate titles are blocked case-insensitively so "Buy milk" and "buy milk" can’t coexist.
 */
export const taskTitleExists = (tasks: Task[], rawTitle: string): boolean => {
  const target = normalizeForComparison(rawTitle);
  return tasks.some(task => normalizeForComparison(task.title) === target);
};
