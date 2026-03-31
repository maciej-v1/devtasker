import { TASK_REASONS } from '../constants/taskReasons';
import { createId } from '../utils/id';
import { isEmptyTitle, normalizeTitle } from '../utils/taskNormalization';
import { ensureValidId } from './ensureValidId';
import type { Task, TaskActionResult } from './task';
import { taskExists } from './taskExists';
import { taskTitleExists } from './taskTitleExists';

/**
 * Pure “transition” helpers: given the current task list and a user intent, compute the
 * next list plus a structured result the UI can show (errors, success payload).
 *
 * Why keep this in the domain layer?
 * - `useTasks` stays a thin adapter over React state.
 * - You can unit-test rules without rendering components.
 * - All branching for “empty / duplicate / not found” lives in one readable place.
 */

export type TaskTransition<T = TaskActionResult> = {
  /** The task array to persist (may be referentially identical to `prev` when nothing changed). */
  next: Task[];
  /** Outcome of the operation (validation failure, toggle result, etc.). */
  result: T;
};

/**
 * Attempts to append a task. Duplicate titles are detected case-insensitively (see `taskTitleExists`).
 */
export function tryAddTask(prev: Task[], rawTitle: string): TaskTransition {
  const trimmed = normalizeTitle(rawTitle);
  if (isEmptyTitle(trimmed)) {
    return {
      next: prev,
      result: { ok: false, reason: TASK_REASONS.EMPTY },
    };
  }
  if (taskTitleExists(prev, trimmed)) {
    return {
      next: prev,
      result: { ok: false, reason: TASK_REASONS.DUPLICATE },
    };
  }

  const task: Task = { id: createId(), title: trimmed, done: false };
  return {
    next: [...prev, task],
    result: { ok: true, task },
  };
}

/**
 * Toggles `done` for the task with the given id. Ids are normalized for comparison (see `ensureValidId`).
 */
export function tryToggleTask(prev: Task[], id: string): TaskTransition {
  const targetId = ensureValidId(id);
  if (!taskExists(prev, targetId)) {
    return {
      next: prev,
      result: { ok: false, reason: TASK_REASONS.NOT_FOUND },
    };
  }

  let updated: Task | undefined;
  const next = prev.map(task => {
    if (task.id === targetId) {
      updated = { ...task, done: !task.done };
      return updated;
    }
    return task;
  });

  return {
    next,
    result: { ok: true, task: updated! },
  };
}

/**
 * Removes the task with the given id, if present.
 */
export function tryDeleteTask(prev: Task[], id: string): TaskTransition {
  const targetId = ensureValidId(id);
  if (!taskExists(prev, targetId)) {
    return {
      next: prev,
      result: { ok: false, reason: TASK_REASONS.NOT_FOUND },
    };
  }

  let removed: Task | undefined;
  const next = prev.filter(task => {
    const match = task.id === targetId;
    if (match) removed = task;
    return !match;
  });

  return {
    next,
    result: { ok: true, task: removed! },
  };
}
