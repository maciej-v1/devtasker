import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { load, save } from "../storage/storage";

export const useStorage = (storageKey, defaultValue) => {
  // Compute initial value once per key
  const initialValue = useMemo(() => load(storageKey, defaultValue), [storageKey]);

  const [value, internalSetValue] = useState(initialValue);

  // Keep a stable setter to avoid callback churn
  const setValue = useCallback(internalSetValue, []);

  // Track previous value to avoid unnecessary writes
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      save(storageKey, value);
      prevValueRef.current = value;
    }
  }, [value, storageKey]);

  return [value, setValue];
};