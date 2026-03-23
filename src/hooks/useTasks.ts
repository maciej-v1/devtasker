import { useCallback } from 'react';
import { useTaskStorage } from './useTaskStorage';
import { normalizeTitle, isEmptyTitle } from '../utils/taskNormalization';
import { createId } from '../utils/id';
import { TASK_REASONS } from '../constants/taskReasons';
import { taskExists } from '../domain/taskExists';
import { ensureValidId } from '../domain/ensureValidId';
import { taskTitleExists } from '../domain/taskTitleExists';

import type { Task } from '../domain/task';
import type { TaskReason } from '../constants/taskReasons';

type TaskActionResult = { ok: true; task: Task } | { ok: false; reason: TaskReason };

export const useTasks = () => {
  const [tasks, setTasks] = useTaskStorage();

  const addTask = useCallback(
    (title: string): TaskActionResult => {
      const trimmed = normalizeTitle(title);
      if (isEmptyTitle(trimmed)) return { ok: false, reason: TASK_REASONS.EMPTY };

      if (taskTitleExists(tasks, trimmed)) {
        return { ok: false, reason: TASK_REASONS.DUPLICATE };
      }

      const newTask: Task = { id: createId(), title: trimmed, done: false };

      setTasks(tasks => [...tasks, newTask]);

      return { ok: true, task: newTask };
    },
    [tasks],
  );

  const toggleTask = useCallback(
    (id: string): TaskActionResult => {
      const targetId = ensureValidId(id);

      if (!taskExists(tasks, targetId)) {
        return { ok: false, reason: TASK_REASONS.NOT_FOUND };
      }

      let updatedTask: Task | undefined;

      setTasks(tasks =>
        tasks.map(task => {
          if (task.id === targetId) {
            updatedTask = { ...task, done: !task.done };
            return updatedTask;
          }
          return task;
        }),
      );

      return { ok: true, task: updatedTask! };
    },
    [tasks],
  );

  const deleteTask = useCallback(
    (id: string): TaskActionResult => {
      const targetId = ensureValidId(id);

      if (!taskExists(tasks, targetId)) {
        return { ok: false, reason: TASK_REASONS.NOT_FOUND };
      }

      let removedTask: Task | undefined;

      setTasks(tasks => {
        return tasks.filter(task => {
          const match = task.id === targetId;
          if (match) removedTask = task;
          return !match;
        });
      });

      return { ok: true, task: removedTask! };
    },
    [tasks],
  );

  const actions = { addTask, toggleTask, deleteTask };

  return { tasks, actions };
};
