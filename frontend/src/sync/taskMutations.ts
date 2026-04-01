import type { Task } from '../domain/task';

/**
 * Supported task mutation kinds.
 *
 * Defined as a const object instead of an enum so that:
 * - values stay JSON-friendly
 * - TypeScript infers narrow string literal types
 * - there is no runtime enum abstraction
 *
 * This becomes the single source of truth for mutation "verbs".
 */
export const TASK_MUTATION_KIND = {
  Add: 'add',
  Update: 'update',
  Delete: 'delete',
} as const;

export type TaskMutationKind = (typeof TASK_MUTATION_KIND)[keyof typeof TASK_MUTATION_KIND];

/**
 * Offline task mutations represent *user intent*,
 * not derived state.
 *
 * Naming the discriminator `kind` (instead of `type`)
 * avoids confusion with TypeScript's own `type` keyword
 * and reads more clearly in control flow.
 */
export type TaskMutation =
  | {
      kind: typeof TASK_MUTATION_KIND.Add;
      task: Task;
    }
  | {
      kind: typeof TASK_MUTATION_KIND.Update;
      task: Task;
    }
  | {
      kind: typeof TASK_MUTATION_KIND.Delete;
      taskId: string;
    };
