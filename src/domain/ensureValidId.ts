import { normalizeId } from '../utils/normalizeId';

export const ensureValidId = (id: string): string => {
  return normalizeId(id);
};
