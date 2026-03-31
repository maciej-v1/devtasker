import { TASKS_KEY_NAME } from '../constants/storage';
import type { Task } from '../domain/task';
import { useStorage } from './useStorage';

/** Stable empty default — inline `[]` would be a new array every render and retrigger `useStorage`. */
const EMPTY_TASKS: Task[] = [];

/** Typed façade around `useStorage` so call sites don’t repeat the key name or `Task[]` default. */
export const useTaskStorage = () => {
  return useStorage<Task[]>(TASKS_KEY_NAME, EMPTY_TASKS);
};
