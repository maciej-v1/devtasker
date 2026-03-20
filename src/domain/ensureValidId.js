import { normalizeId } from '../utils/normalizeId';

export const ensureValidId = id => {
  // In the future we can put richer validation here.
  return normalizeId(id);
};