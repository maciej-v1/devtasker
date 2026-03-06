# DevTasker
A project‑based React learning application

DevTasker is a small but steadily evolving task‑management app built with React + Vite.
Its purpose is not to be a production product, but a learning environment — a place to understand React deeply by building a real application from scratch, feature by feature.

Unlike tutorial snippets or demo apps, DevTasker grows iteratively, through exploration, refactoring, and deliberate practice.

## Purpose of the Project
This project exists to:
- Learn React by building, not by copying.
- Understand core React concepts in context.
- Practice component-driven development.
- Explore state, effects, props, and data flow.
- Build maintainable architecture step-by-step.
- Gain real-world experience with:
  - localStorage persistence
  - custom hooks
  - component composition
  - clean CSS separation
  - state lifting and propagation

## Current Features
- Add tasks
- Mark tasks as completed
- Delete tasks
- Persistent storage using localStorage
- Clean component structure
- CSS‑based styling (no inline styles)

## What Has Been Learned So Far
- React components & props
- State management via useState
- Controlled inputs
- Rendering lists with keys
- Proper handling of event callbacks
- Avoiding common anti‑patterns
- Using useEffect correctly for side effects
- Separating concerns into modules
- Implementing persistence cleanly

## Tech Stack
- React – UI rendering and component logic
- Vite – modern dev environment and bundler
- JavaScript (ES202x) – modern syntax & practices
- CSS – scoped styling via per‑component stylesheet files
- localStorage – client‑side task persistence

## Upcoming Learning Steps
- Custom hooks (useTasks)
- Derived state & memoization
- Context API for global state
- React Router (multi‑page app structure)
- Data fetching & loading states
- Cleaner component architecture
- UI refinements and reusable patterns

## Project Structure (Simplified)
```
src/
  components/
    TaskInput.jsx
    TaskInput.css
    TaskList.jsx
    TaskList.css
    TaskPersistence.js
  hooks/
    (future custom hooks here)
  App.jsx
  App.css
  index.css
```

## Project Philosophy
Most online courses teach React using isolated code snippets or artificial examples.
DevTasker takes the opposite approach:

Build something real. Break things. Fix them.
Learn React the way working developers do.

## Running the Project
Install dependencies:
    npm install

Start the development server:
    npm run dev

The app will be available at: http://localhost:5173/
