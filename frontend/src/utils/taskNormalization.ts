/**
 * Text helpers for task titles. Keep comparisons and “empty” definition in one module so every layer
 * agrees on the same rules.
 */
export const normalizeTitle = (rawTitle: string): string => {
  return rawTitle.trim();
};

export const isEmptyTitle = (title: string): boolean => {
  return title.length === 0;
};

/** Lowercase fold for duplicate detection only—don’t mutate what the user typed for display. */
export const normalizeForComparison = (title: string): string => {
  return title.toLowerCase();
};
