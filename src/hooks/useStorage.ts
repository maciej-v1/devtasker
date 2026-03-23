import { useState, useEffect, useRef, useMemo } from 'react';
import { load, save } from '../storage/storage';

export const useStorage = <T>(storageKey: string, defaultValue: T) => {
  const initialValue = useMemo(() => load<T>(storageKey, defaultValue), [storageKey]);

  const [value, setValue] = useState<T>(initialValue);

  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      save(storageKey, value);
      prevValueRef.current = value;
    }
  }, [value, storageKey]);

  return [value, setValue] as const;
};
