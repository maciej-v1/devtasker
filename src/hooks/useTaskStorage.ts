import { useStorage } from "./useStorage";
import { TASKS_KEY_NAME } from "../constants/storage";
import type { Task } from "../domain/task";

export const useTaskStorage = () => {
  return useStorage<Task[]>(TASKS_KEY_NAME, []);
};
