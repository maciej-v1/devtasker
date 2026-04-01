# DevTasker

A **React 19 + TypeScript + Vite** task list used as a **learning codebase**: small enough to read in one sitting, structured like a maintainable app, and heavily commented so you can treat the source as notes.

## Features

- Add tasks (non-empty title; duplicate titles blocked case-insensitively)
- Toggle completion and delete tasks
- Persistence via `localStorage`, behind a small storage adapter and hooks
- **Domain-first transitions** (`tryAddTask` / `tryToggleTask` / `tryDeleteTask`) so rules are testable without the UI
- Accessibility-minded list markup (`<ul>` / `<li>`, live region for empty state, labeled form controls)

## Tech stack

| Layer       | Choice                         |
| ----------- | ------------------------------ |
| UI          | React 19, CSS Modules          |
| Tooling     | Vite 7, TypeScript 5, ESLint 9 |
| IDs         | `nanoid`                       |
| Persistence | Browser `localStorage` (JSON)  |

## Project layout

```text
src/
  main.tsx                 # Entry: StrictMode + root mount
  App.tsx                  # Page shell (layout)
  AppContent.tsx           # App-level composition (future router lives here)
  index.css                # Global base styles

  pages/
    TasksPage.tsx          # “Route-sized” wrapper for the tasks feature

  features/tasks/          # Vertical slice for tasks UI
    TasksController.tsx    # Container: calls useTasks, passes props down
    TasksSection.tsx       # Presentational section
    TaskInput.tsx          # Controlled form + validation messages
    TaskList.tsx           # List + empty state
    TaskItem.tsx           # One row; memoized with correct hook deps
    *.module.css

  hooks/
    useStorage.ts          # Generic localStorage + React state
    useTaskStorage.ts      # Typed `Task[]` binding (stable empty default)
    useTasks.ts            # Wires domain transitions to state updates

  domain/                  # Business rules (no React imports)
    task.ts                # `Task`, `TaskActionResult`
    taskTransitions.ts     # Pure “given prev state + intent → next + result”
    taskExists.ts
    taskTitleExists.ts
    ensureValidId.ts

  constants/
    storage.ts             # Storage key
    taskReasons.ts         # Machine-readable reasons
    taskErrors.ts          # User-visible error copy

  storage/
    storage.ts             # load/save JSON + try/catch

  utils/
    id.ts                  # ID factory wrapper
    normalizeId.ts
    taskNormalization.ts   # Trim / empty / case-fold for comparison
```

## Data flow (mental model)

1. **UI** calls an action (e.g. submit title, toggle checkbox).
2. **`useTasks`** runs a functional state update `setTasks(prev => …)` so it always sees the latest list.
3. **`taskTransitions`** computes `{ next, result }` from `prev` in one place—no duplicated validation logic.
4. **`useStorage`** persists on real changes (avoids writing immediately on first mount).

## How to read this repo as a learner

- Start at `src/features/tasks/TasksController.tsx` and follow props into `TasksSection` → `TaskInput` / `TaskList`.
- Open `src/domain/taskTransitions.ts` next—this is where “what should happen?” is answered in plain TypeScript.
- Compare with `src/hooks/useTasks.ts` to see how React state wraps those pure functions.

Inline comments explain **why** a pattern exists (not just **what** the syntax does). JSDoc on exported helpers points at trade-offs (e.g. stable default arrays, functional `setState`).

## Scripts

```bash
npm install
npm run dev       # http://localhost:5173/
npm run build     # tsc --noEmit && vite build
npm run typecheck # TypeScript only
npm run lint      # ESLint (TS + react-hooks + Vite refresh rules)
npm run format    # Prettier
```

## ESLint & quality gates

- TypeScript sources are linted with `typescript-eslint` (flat config in `eslint.config.js`).
- Production build runs **`tsc --noEmit` first**, so type errors fail the build—not only Vite’s transform step.

## Roadmap ideas (not implemented yet)

- Real API / async loading & error UI
- Router (`react-router` or similar) once there is more than one page
- Filters, inline edit, tests (Vitest + React Testing Library)

## License / project intent

Private learning project; structure and comments are meant to stay approachable as the codebase grows.
