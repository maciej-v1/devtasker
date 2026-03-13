import { useStorage } from "./useStorage";
import { TASKS_KEY_NAME } from "../constants/storage";

export const useTaskStorage = () => {
  return useStorage(TASKS_KEY_NAME, []);
};