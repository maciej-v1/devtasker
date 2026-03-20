import { normalizeForComparison } from '../utils/taskNormalization';

/**
 * Domain rule:
 * Check if a task with the given (raw) title already exists.
 * Title normalization logic lives here so the domain hook stays clean.
 */
export const taskTitleExists = (tasks, rawTitle) => {
  const target = normalizeForComparison(rawTitle);

  return tasks.some(task =>
    normalizeForComparison(task.title) === target
  );
};