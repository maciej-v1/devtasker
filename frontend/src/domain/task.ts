import type { TaskReason } from '../constants/taskReasons';

/**
 * Core record stored in memory and `localStorage`. Keep it small and JSON-serializable so
 * persistence stays boring and reliable.
 */
export type Task = {
  id: string;
  title: string;
  done: boolean;
};

/**
 * Discriminated union returned by task actions: either success with a `task` snapshot,
 * or failure with a machine-readable `reason` the UI maps to copy via `ERROR_MESSAGES`.
 */
export type TaskActionResult = { ok: true; task: Task } | { ok: false; reason: TaskReason };
