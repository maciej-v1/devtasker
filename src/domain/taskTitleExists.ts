import { normalizeForComparison } from '../utils/taskNormalization';
import type { Task } from './task';

export const taskTitleExists = (tasks: Task[], rawTitle: string): boolean => {
  const target = normalizeForComparison(rawTitle);
  return tasks.some(task => normalizeForComparison(task.title) === target);
};
