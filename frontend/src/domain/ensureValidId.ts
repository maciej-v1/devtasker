import { normalizeId } from '../utils/normalizeId';

/** Single entry point for coercing / normalizing ids before domain comparisons. */
export const ensureValidId = (id: string): string => {
  return normalizeId(id);
};
