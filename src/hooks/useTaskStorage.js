import { useState, useEffect } from "react";
import { load, save } from "../storage/storage";

export const useTaskStorage = (key, defaultValue = []) => {
  const [value, setValue] = useState(() => load(key, defaultValue));

  useEffect(() => {
    save(key, value);
  }, [key, value]);

  return [value, setValue];
};
