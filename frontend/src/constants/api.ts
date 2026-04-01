/**
 * Backend API base URL.
 *
 * Centralizing this avoids scattering environment-specific strings across the codebase
 * and makes it trivial to:
 * - switch between local / staging / production backends
 * - move to Vite env variables later without touching call sites
 * - introduce a proxy or relative paths if the frontend is served by the backend
 *
 * NOTE:
 * For now this is a plain constant instead of `import.meta.env` to keep the
 * learning setup simple and explicit. Converting this to an env-based config
 * is a mechanical change once the API stabilizes.
 */
export const API_BASE_URL = 'http://localhost:8080';
