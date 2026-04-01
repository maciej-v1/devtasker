import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.css';

const root = document.getElementById('root');
if (!(root instanceof HTMLElement)) {
  throw new Error('Root element not found or is not an HTML element');
}

/**
 * `StrictMode` helps spot side effects early in development (e.g. non-idempotent state updaters).
 * It does not run in production builds.
 */
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
