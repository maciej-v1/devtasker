/**
 * Coerce an id to a primitive string. (Room to grow: trim, reject blanks, etc.)
 */
export const normalizeId = (id: string): string => {
  return String(id);
};
