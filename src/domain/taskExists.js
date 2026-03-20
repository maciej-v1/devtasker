import { normalizeId } from '../utils/normalizeId';

export const taskExists = (tasks, normalizedId) => {
  return tasks.some(task => normalizeId(task.id) === normalizedId);
};