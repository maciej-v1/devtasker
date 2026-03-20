# 📘 DevTasker  
*A real-world React application built through deliberate practice.*

DevTasker is a task‑management app built with **React + Vite**.  
Its purpose is educational — to master React by building a real, evolving application through **iteration, refactoring, and architectural improvement**.

This is not a tutorial project.  
It’s a real codebase built the way professional React engineers work every day.

---

# 🎯 Goals of the Project

DevTasker exists to help you:

- Learn React by building a real system, not copying snippets  
- Understand React concepts in their natural context  
- Practice component-driven UI architecture  
- Build maintainable, scalable front‑end code  
- Learn state, effects, reactivity, and rendering deeply  
- Gain confidence using custom hooks and clean domain patterns  

This project grows over time — just like real software.

---

# 🚀 Current Feature Set

### ✔ Tasks
- Add a task  
- Toggle completion  
- Delete a task  
- Prevent duplicate titles (case‑insensitive)  
- Guard against empty titles  

### ✔ Persistence
- Full persistence through `localStorage`  
- Storage is abstracted via a clean `useStorage` hook  
- Domain-specific `useTaskStorage` hook  

### ✔ Architecture
- `useTasks` domain hook for business logic  
- UI components are pure and presentation-focused  
- Clean separation between:
  - **UI layer**
  - **domain layer**
  - **storage layer**
  - **utils layer**
- Stable handlers (via `useCallback`)  
- Optimized rendering with React.memo  
- Centralized domain rules
- Normalized IDs and titles

### ✔ Accessibility & UX
- Semantic `<ul>` / `<li>` structure  
- Accessible ARIA labels  
- Safe quote‑escaping for screen readers  
- Form and button behavior aligned with standards  

---

# 🧱 Project Architecture

```
src/
  components/
    TaskInput.jsx
    TaskInput.css
    TaskItem.jsx
    TaskList.jsx
    TaskList.css

  hooks/
    useStorage.js
    useTaskStorage.js
    useTasks.js

  domain/
    taskExists.js
    ensureValidId.js
    taskTitleExists.js

  constants/
    storage.js
    taskReasons.js

  utils/
    id.js
    normalizeId.js
    taskNormalization.js

  storage/
    storage.js

  App.jsx
  App.css
  index.css
```

---

# 🧠 Conventions

### 1. Pragmatic Hooks Policy
- Static imports are stable.
- `useCallback(fn, [])` allowed.
- Only reactive deps required.
- ESLint hook-deps rules intentionally ignored.

### 2. Clean Architecture
Small files, single responsibility, domain logic kept out of UI.

### 3. Arrow Functions Preferred
Used unless there is a strong reason not to.

### 4. One Issue at a Time
Development proceeds through deliberate incremental improvements.

---

# 📚 What Has Been Learned So Far
- JSX, components, props  
- Controlled inputs  
- Lists, keys, reconciliation  
- Memoization and render optimization  
- Custom hooks (generic + domain-specific)  
- Avoiding stale closures  
- Layered architecture (UI → Domain → Storage)  
- Domain rules for normalization & validation
- Accessibility best practices  

---

# 🛠 Tech Stack
- React 18+  
- Vite  
- JavaScript (ES202x)  
- CSS  
- localStorage (abstracted via hooks)  

---

# 🏗 Future Roadmap

### Phase 3 — Async Logic
- Replace localStorage with backend
- Loading & error handling
- Optimistic updates

### Phase 4 — Routing
- Multi-page layout
- Task detail pages
- Settings page

### Phase 5 — Global State
- Context API
- Optional Zustand

### Phase 6 — UI/UX
- Filters, sorting, inline editing, animations

### Phase 7 — Deployment
- Production build
- Deploy to Vercel/Netlify

---

# ▶ Running the Project

```
npm install
npm run dev
```

Open at: http://localhost:5173/

---

# 🌟 Philosophy
**Build something real. Break it. Fix it. Refactor it. Understand it deeply.**
