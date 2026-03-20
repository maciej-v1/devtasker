import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { load, save } from "../storage/storage";

export const useStorage = (storageKey, defaultValue) => {
  const initialValue = useMemo(() => load(storageKey, defaultValue), [storageKey]);

  const [value, setValue] = useState(initialValue);

  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      save(storageKey, value);
      prevValueRef.current = value;
    }
  }, [value, storageKey]);

  return [value, setValue];
};