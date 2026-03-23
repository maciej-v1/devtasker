export const TASK_REASONS = {
  EMPTY: 'empty',
  DUPLICATE: 'duplicate',
  NOT_FOUND: 'not_found',
} as const;

export type TaskReason = (typeof TASK_REASONS)[keyof typeof TASK_REASONS];
