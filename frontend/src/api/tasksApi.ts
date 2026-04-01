import type { Task } from '../domain/task';
import { API_BASE_URL } from '../constants/api';

/**
 * Shape returned by the backend API.
 *
 * Important:
 * - This is intentionally *not* the same as the frontend domain type.
 * - Keeping them separate makes boundary mismatches explicit and safe.
 */
type ApiTask = {
  id: string;
  title: string;
  completed: boolean;
};

/**
 * Shape expected by the backend when creating a task.
 *
 * This is intentionally separate from the frontend domain `Task`:
 * - The backend owns persistence concerns
 * - The frontend owns interaction semantics
 */
type CreateTaskPayload = {
  title: string;
  completed: boolean;
};

/**
 * Shape expected by the backend when updating a task.
 *
 * Kept separate from the frontend domain model to prevent accidental coupling.
 */
type UpdateTaskPayload = {
  title: string;
  completed: boolean;
};

/**
 * Convert an API task into a frontend domain task.
 *
 * Why this exists:
 * - Backend and frontend are allowed to evolve independently.
 * - Domain code should not know or care about transport naming.
 * - Centralizing the mapping avoids subtle UI bugs (like uncontrolled inputs).
 */
const mapApiTaskToDomain = (apiTask: ApiTask): Task => {
  return {
    id: apiTask.id,
    title: apiTask.title,
    done: apiTask.completed,
  };
};

/**
 * Convert a frontend domain task into a backend create payload.
 *
 * Keeping this mapping explicit:
 * - avoids leaking transport details into domain logic
 * - lets backend and frontend evolve independently
 */
const mapDomainTaskToCreatePayload = (task: Task): CreateTaskPayload => {
  return {
    title: task.title,
    completed: task.done,
  };
};

/**
 * Convert a frontend domain task into a backend update payload.
 */
const mapDomainTaskToUpdatePayload = (task: Task): UpdateTaskPayload => {
  return {
    title: task.title,
    completed: task.done,
  };
};

/**
 * Fetch all tasks from the backend.
 *
 * This function is intentionally:
 * - side-effect free (no storage, no retries)
 * - opinionated about failure (non-2xx = error)
 *
 * Higher layers (hooks) decide:
 * - whether to fall back to localStorage
 * - whether to retry
 * - how to surface errors to the UI
 *
 * This keeps the API layer focused on I/O only.
 */

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks (status ${response.status})`);
  }

  const data: ApiTask[] = await response.json();
  return data.map(mapApiTaskToDomain);
};

/**
 * Persist a newly created task to the backend.
 *
 * Notes:
 * - This function has NO effect on local state
 * - Callers decide when / whether to invoke this (online only)
 * - Failures are intentionally surfaced to the caller
 */
export const createTask = async (task: Task): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapDomainTaskToCreatePayload(task)),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task (status ${response.status})`);
  }
};

/**
 * Persist an updated task to the backend.
 *
 * The frontend remains optimistic:
 * - state updates immediately
 * - backend failure does not revert UI yet
 */
export const updateTask = async (task: Task): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapDomainTaskToUpdatePayload(task)),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task (status ${response.status})`);
  }
};

/**
 * Delete a task from the backend.
 *
 * Notes:
 * - No payload mapping required for DELETE
 * - Frontend remains optimistic
 * - Failures are handled later by sync logic
 */
export const deleteTask = async (taskId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task (status ${response.status})`);
  }
};
