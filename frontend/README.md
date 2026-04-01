# DevTasker – Frontend

This package contains the **React frontend** of the DevTasker project. It is intentionally designed as a **domain-first, offline-capable learning codebase**, with an emphasis on clarity, explicit data flow, and well-documented architectural decisions.

> This README describes only the frontend. See the repository root README for a system-level overview, and the backend README for API details.

## Purpose

- Demonstrate a maintainable React architecture
- Separate **domain logic**, **persistence**, and **UI concerns**
- Support **offline-first** behavior with explicit synchronization
- Serve as a readable learning reference, not just a demo app

## Features

- Add tasks (non-empty title; duplicate titles blocked case-insensitively)
- Toggle completion, delete tasks
- Inline architecture supporting future task title editing
- Optimistic UI updates
- **Offline-first support** via:
  - `localStorage`
  - explicit mutation queue
  - backend replay on reconnect
- Domain-first transitions (`tryAddTask`, `tryToggleTask`, `tryDeleteTask`)
- Accessibility-minded markup (`<ul>` / `<li>`, labeled inputs, live regions)

## Tech stack

| Layer       | Choice                         |
| ----------- | ------------------------------ |
| UI          | React 19, CSS Modules          |
| Tooling     | Vite 7, TypeScript 5, ESLint 9 |
| IDs         | nanoid                         |
| Persistence | Browser localStorage (JSON)    |

## Project layout

```text
src/
  main.tsx                 # Entry: StrictMode + root mount
  App.tsx                  # Page shell (layout)
  AppContent.tsx           # App-level composition
  index.css                # Global styles

  pages/
    TasksPage.tsx          # Route-sized wrapper

  features/tasks/
    TasksController.tsx    # Container: connects hooks to UI
    TasksSection.tsx       # Presentational section
    TaskInput.tsx          # Controlled input + validation
    TaskList.tsx           # List + empty state
    TaskItem.tsx           # Single task row

  hooks/
    useStorage.ts          # Generic localStorage binding
    useTaskStorage.ts      # Storage + backend hydration + replay
    useTasks.ts            # Domain transitions + side effects

  domain/
    task.ts                # Core domain types
    taskTransitions.ts     # Pure domain logic
    taskExists.ts
    taskTitleExists.ts
    ensureValidId.ts

  sync/
    taskMutations.ts       # Mutation vocabulary
    taskMutationQueue.ts   # Offline queue persistence
    taskSync.ts            # Replay engine

  constants/
    storage.ts             # Storage keys
    taskReasons.ts         # Machine-readable failure reasons
    taskErrors.ts          # User-visible messages

  utils/
    id.ts                  # ID generation wrapper
    taskNormalization.ts   # Trim / fold helpers
```

## Mental model

1. UI invokes an action (add / toggle / delete).
2. `useTasks` executes **pure domain transitions**.
3. UI updates synchronously (optimistic).
4. Persistence and backend effects run as side effects.
5. Offline actions enqueue intent and replay later.

The UI never blocks on network activity.

## Scripts

```bash
npm install
npm run dev       # http://localhost:5173/
npm run build     # tsc --noEmit && vite build
npm run typecheck # Type-only checks
npm run lint      # ESLint
npm run format    # Prettier
```

## Learning intent

This codebase prefers **explicitness over cleverness**. Inline comments explain *why* a pattern exists, not just *what* it does. The frontend is meant to be read end-to-end.

## License

Private learning project.
