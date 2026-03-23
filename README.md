# DevTasker

A real-world React + TypeScript application built through deliberate, incremental engineering.

## 📘 Overview

DevTasker is a task management app built using **React 19**, **TypeScript**, and **Vite**. It serves as a professional, evolving codebase focused on hands-on learning, architectural clarity, and production-quality engineering practices.

This is not a tutorial repo. It is a real system built the way senior React engineers structure and grow applications through:

- Iterative improvements
- Refactoring
- Clean architecture
- Domain-driven design patterns
- Practical TypeScript usage

---

## 🎯 Project Goals

DevTasker exists to help you:

- Learn modern React by building a real, growing application
- Understand concepts in context—not in isolation
- Write scalable, maintainable front-end architecture
- Master React hooks and custom domain hooks
- Gain confidence with TypeScript in real components and logic flows
- Practice separation of concerns across UI, domain, storage, and utils

---

## 🚀 Current Feature Set

### ✔ Tasks

- Add new tasks
- Toggle completion
- Delete tasks
- Prevent empty titles
- Prevent duplicates (case-insensitive)

### ✔ Persistence

- Persistent storage via `localStorage`
- Abstracted through a typed `useStorage<T>` hook
- `useTaskStorage()` provides a typed `Task[]` interface

### ✔ Architecture

- **UI Layer** — pure, dumb components (`TaskInput`, `TaskList`, `TaskItem`, `TasksSection`)
- **Domain Layer** — business logic via `useTasks()`
- **Storage Layer** — localStorage driver + hooks (`useStorage`, `useTaskStorage`)
- **Utils Layer** — normalization, ID handling, validation helpers
- **Constants Layer** — typed domain constants & error messaging
- Strong TypeScript typing across all layers
- Predictable state transitions & validation
- Clean split between container components and presentational components

### ✔ Accessibility & UX

- Semantic `<ul>` / `<li>` markup
- Appropriate ARIA labels
- Screen‑reader‑safe title escaping
- Buttons and forms follow standard behavior

---

## 🧱 Project Structure (Updated for TypeScript)

```
src/
  components/
    TaskInput.tsx
    TaskInput.css
    TaskItem.tsx
    TaskList.tsx
    TaskList.css
    TasksSection.tsx

  pages/
    TasksPage.tsx

  hooks/
    useStorage.ts
    useTaskStorage.ts
    useTasks.ts

  domain/
    task.ts
    taskExists.ts
    ensureValidId.ts
    taskTitleExists.ts

  constants/
    storage.ts
    taskReasons.ts
    taskErrors.ts

  utils/
    id.ts
    normalizeId.ts
    taskNormalization.ts

  storage/
    storage.ts

  App.tsx
  App.css
  index.css
  main.tsx
  vite-env.d.ts
```

---

## 🧠 Conventions

### 1. **Pragmatic Hooks Policy**

- Static imports treated as stable
- `useCallback(fn, [])` permitted where appropriate
- Only necessary reactive dependencies included
- ESLint exhaustive‑deps intentionally relaxed

### 2. **Clean Architecture Rules**

- UI components remain pure/dumb
- Business logic lives exclusively in domain hooks
- Storage abstracted behind adapter hooks
- Small, composable files
- Predictable data flow

### 3. **TypeScript Standards**

- Strong, minimal types
- Domain models defined once (`Task`)
- Union types for domain errors (`TaskReason`)
- Typed domain result objects
- Type-safe storage API

### 4. **Development Workflow**

- One issue at a time
- Incremental refinement
- Refactor when needed, not prematurely

---

## 📚 What Has Been Learned So Far

- Modern React component architecture
- Controlled forms
- Lists, keys, reconciliation
- Memoization and render optimization
- Custom hooks (generic + domain-specific)
- Avoiding stale closures
- Domain-driven UI design
- Full TypeScript migration of a React codebase
- Separation of concerns across layers
- Accessibility best practices

---

## 🛠 Tech Stack

- **React 19**
- **TypeScript**
- **Vite 7**
- **CSS**
- **localStorage persistence**
- **nanoid** for ID generation

---

## 🏗 Future Roadmap

### Phase 3 — Async Logic

- Migrate from localStorage to real backend
- Loading/error states
- Optimistic updates

### Phase 4 — Routing

- Multi-page architecture
- Settings page
- Task detail views

### Phase 5 — Global State

- Context API
- Optional Zustand integration

### Phase 6 — UI/UX Enhancements

- Filters & sorting
- Inline editing
- Animations

### Phase 7 — Deployment

- Production builds
- Deploy to Vercel/Netlify

---

## ▶ Running the Project

```
pm install
npm run dev
```

Visit: http://localhost:5173/

---

## 🌟 Philosophy

**Build something real. Break it. Fix it. Refactor it. Understand it deeply.**
