/**
 * Machine-readable failure/success signals from domain actions.
 * UI maps these to human copy in `taskErrors.ts` so wording can evolve independently.
 */
export const TASK_REASONS = {
  EMPTY: 'empty',
  DUPLICATE: 'duplicate',
  NOT_FOUND: 'not_found',
} as const;

export type TaskReason = (typeof TASK_REASONS)[keyof typeof TASK_REASONS];
