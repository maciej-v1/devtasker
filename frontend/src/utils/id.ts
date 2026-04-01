import { nanoid } from 'nanoid';

/** Small wrapper so swapping id strategies later doesn’t touch feature components. */
export const createId = (): string => nanoid();
