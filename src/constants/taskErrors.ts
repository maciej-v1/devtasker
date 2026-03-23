export const ERROR_MESSAGES = {
  empty: "Task title cannot be empty.",
  duplicate: "That task already exists.",
  not_found: "Task not found.",
  unknown: "Unknown error"
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
