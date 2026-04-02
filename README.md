# DevTasker

DevTasker is a **full-stack, offline-first task management application** designed as a **learning project**. The goal is not just to build a working app, but to explore and document architectural decisions around domain logic, persistence, configuration, and synchronization.

## Repository structure

```text
frontend/   # React + TypeScript frontend
backend/    # Spring Boot backend API
scripts/    # Local-only run scripts (gitignored)
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

| Layer     | Technology                                      |
| --------- | ----------------------------------------------- |
| Frontend  | React 19, TypeScript, Vite                      |
| Backend   | Java 17, Spring Boot                            |
| Database  | PostgreSQL                                     |
| Storage   | localStorage + REST + JPA                      |
| Sync      | Intent-based replay                             |

## Configuration model

This repository intentionally avoids committing secrets or machine-specific configuration.

- **Secrets** (such as database passwords) are provided via **environment variables**
- **Local run scripts** (not committed to Git) are used to set up the environment
- Spring Boot configuration files reference environment variables via placeholders

This approach keeps the repository safe, explicit, and production-aligned.

## Getting started (development)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

The backend expects certain environment variables to be set (see `backend/README.md`).

For local development, a local run script is typically used (for example, on Windows):

```text
scripts/run-backend.cmd
```

This script is intentionally **gitignored** and contains local-only configuration such as database credentials.

The backend runs on:

```text
http://localhost:8080
```

## Learning focus

This project intentionally trades breadth for depth. It explores:

- separation of concerns
- optimistic UI updates
- offline-first synchronization models
- explicit persistence and configuration boundaries

The codebase is meant to be read slowly and thoughtfully.

## License

Private learning project.
