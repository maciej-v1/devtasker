/**
 * Thin `localStorage` adapter. All JSON parse/stringify lives here so hooks don’t repeat try/catch.
 */

export function load<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : fallback;
  } catch (err) {
    console.error('Failed to load:', err);
    return fallback;
  }
}

export function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save:', err);
  }
}
