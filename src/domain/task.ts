import type { TaskReason } from '../constants/taskReasons';

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export type TaskActionResult =
  | { ok: true; task: Task }
  | { ok: false; reason: TaskReason };