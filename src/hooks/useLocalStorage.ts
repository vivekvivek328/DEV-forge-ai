import { useCallback, useEffect, useRef, useState } from "react";

import { readStorage, writeStorage } from "../utils/storage";

/**
 * SSR-safe localStorage state. Starts from `initialValue` on the server and
 * hydrates from storage after mount to avoid markup mismatches.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const keyRef = useRef(key);

  useEffect(() => {
    setValue(readStorage<T>(keyRef.current, initialValue));
    setHydrated(true);
    // Intentionally hydrate once per key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      writeStorage(keyRef.current, resolved);
      return resolved;
    });
  }, []);

  return [value, update, hydrated];
}
