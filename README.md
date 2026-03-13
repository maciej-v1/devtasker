# 📘 DevTasker  
*A real‑world React learning application built through deliberate practice.*

DevTasker is an evolving task‑management app built with **React + Vite**.  
Its purpose is educational: to learn React by building a real application step‑by‑step, refactoring it and improving the architecture as it grows.

Unlike tutorials that rely on isolated snippets, DevTasker is built through **iteration, exploration, and real engineering reasoning.**

---

# 🎯 Purpose of the Project

DevTasker exists to:

- Learn React by building a real system, not by copying snippets  
- Understand React concepts in their natural context  
- Develop component-driven architecture skills  
- Practice designing maintainable, scalable front‑end code  
- Build clean logic using custom hooks and domain patterns  
- Learn how state, effects, and reactivity truly work  

---

# ✅ Current Features

### ✔ Core task functionality
- Add tasks  
- Mark tasks as done / not done  
- Delete tasks  
- Prevent duplicate tasks (case‑insensitive)  
- Persistent storage via localStorage  
- Clean separation between UI, storage, and domain logic  

### ✔ Architecture & performance
- `useStorage` — generic persistent state hook  
- `useTaskStorage` — domain‑specific storage wrapper  
- `useTasks` — complete domain API (add, toggle, delete)  
- Early‑exit state updates to prevent unnecessary renders  
- Stable callbacks with `useCallback`  
- React.memo at list and item level  
- Stable item-level handlers  
- Clean and predictable component tree  

### ✔ Accessibility & UX
- Proper list semantics (`<ul>`, `<li>`, roles)  
- Safe ARIA labels (quote‑safe)  
- `type="button"` for non-submit buttons  
- Keyboard‑friendly input  
- Consistent empty-state inside the `<ul>` structure  

---

# 🧠 What Has Been Learned So Far

### **Core React**
- Components, props, JSX  
- Controlled inputs  
- Rendering lists with keys  
- Event handlers done right  
- Avoiding unnecessary re-renders  

### **Hooks**
- `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`  
- Patterns for stable callbacks  
- Custom hooks for domain logic and storage  
- Handling localStorage safely  
- Memoization at list and item level  

### **Architecture**
- Domain-driven UI design  
- Clean separation:
  - storage layer  
  - domain logic layer  
  - UI layer  
- Avoiding tight coupling  
- Structuring components for scale  

### **Accessibility**
- ARIA labels  
- Proper list semantics  
- Safe escaping in labels  
- Buttons that behave predictably in forms  

---

# 🛠 Tech Stack

- **React** — component logic & rendering  
- **Vite** — dev environment & bundler  
- **JavaScript (ES202x)**  
- **CSS** — component-scoped styling  
- **localStorage** — client‑side persistence (via `useStorage`)  

---

# 📁 Project Structure (Accurate to Current Code)

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

  constants/
    storage.js

  storage/
    storage.js

  App.jsx
  App.css
  index.css
```

---

# 🚀 Upcoming Learning Steps

Following the project‑based training plan:

### **Phase 3 — API & async logic**
- Switch from localStorage → backend persistence  
- Loading & error states  
- Optimistic updates  

### **Phase 4 — Routing**
- Multi-page layout  
- Task detail pages  
- Settings screens  

### **Phase 5 — Global state**
- Context API  
- Zustand store (optional)  

### **Phase 6 — UI & UX**
- Animations  
- Filters (completed / active / all)  
- Sorting (alphabetical, creation date)  
- Editing tasks inline  

### **Phase 7 — Deployment**
- Production build  
- Deploy to Netlify / Vercel  
- Environment configs  

---

# 🏗 Project Philosophy  
Most tutorials teach React through oversimplified examples.

DevTasker does the opposite:

> **Build something real.  
Break it.  
Fix it.  
Refactor it.  
Understand it deeply.**

This is how actual engineers master React.

---

# ▶ Running the Project

Install dependencies:

```sh
npm install
```

Start development server:

```sh
npm run dev
```

App runs at:

```
http://localhost:5173/
```
