# DevTasker

DevTasker is a **full-stack, offline-first task management application** designed as a **learning project**. The goal is not just to build a working app, but to explore and document architectural decisions around domain logic, persistence, and synchronization.

## Repository structure

```text
frontend/   # React + TypeScript frontend
backend/    # Spring Boot backend API
```

Each subproject has its own README with detailed documentation.

## High-level goals

- Demonstrate **domain-first design**
- Support **offline usage** without blocking UI
- Make data synchronization explicit and deterministic
- Keep the codebase readable and educational

## How it works (big picture)

- The **frontend** owns domain logic and user intent
- The **backend** acts as a persistence mirror
- The UI updates optimistically
- Offline mutations are queued and replayed on reconnect
- Deletions and updates are never inferred — only explicit actions cause changes

## Technology overview

| Layer     | Technology                      |
| --------- | ------------------------------- |
| Frontend | React 19, TypeScript, Vite      |
| Backend  | Java, Spring Boot               |
| Storage  | localStorage + REST + JPA       |
| Sync     | Intent-based replay             |

## Getting started (dev)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

## Learning focus

This project intentionally trades breadth for depth. It explores:

- separation of concerns
- optimistic UI updates
- offline-first sync models
- explicit error handling and data mapping

It is meant to be read slowly and thoughtfully.

## License

Private learning project.
