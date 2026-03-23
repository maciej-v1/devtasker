import { normalizeId } from "../utils/normalizeId";
import type { Task } from "./task";

export const taskExists = (tasks: Task[], normalizedId: string): boolean => {
  return tasks.some(task => normalizeId(task.id) === normalizedId);
};