import { useEffect, useRef, useState } from 'react';
import { load, save } from '../storage/storage';

/**
 * Generic reactive `localStorage` binding.
 *
 * Why lazy `useState(() => load(...))`?
 * - Initial read runs once per mount without `useMemo`, which avoids dependency mismatches under the
 *   React Compiler / `react-hooks` static analysis.
 *
 * Why no `useEffect` to re-load when `storageKey` changes?
 * - This app uses fixed keys; reloading on key change is easy to get wrong with `JSON.parse` returning
 *   fresh array references (that would look like “data changed” and trigger extra saves). If you add
 *   multi-profile storage later, reintroduce a deliberate remount or keyed state boundary instead.
 *
 * Why skip the first save with `prevValueRef`?
 * - On mount we hydrate from disk; writing that same value back immediately is noisy. We only persist
 *   when the value reference changes after user-driven updates.
 */
export const useStorage = <T>(storageKey: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => load<T>(storageKey, defaultValue));

  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      save(storageKey, value);
      prevValueRef.current = value;
    }
  }, [value, storageKey]);

  return [value, setValue] as const;
};
