# DevTasker – Backend

This package contains the **Java backend** of the DevTasker project. It provides a simple, explicit REST API backing the frontend task manager.

> This README describes only the backend. See the repository root README for an architectural overview, and the frontend README for UI details.

## Purpose

- Provide a minimal persistence layer for tasks
- Expose a clean REST API
- Serve as a backend counterpart to an offline-first frontend
- Stay intentionally simple and readable

## Tech stack

| Layer        | Choice                 |
| ------------ | ---------------------- |
| Language     | Java 17                |
| Framework    | Spring Boot            |
| Persistence | JPA (Hibernate)        |
| Database     | PostgreSQL (local dev) |

## Database configuration

The backend uses **PostgreSQL** for local development.

Database configuration is **fully environment-variable driven** so that no secrets or machine-specific values are committed to the repository.

The following environment variables are expected when running the backend locally:

| Variable        | Description                         | Example        |
| --------------- | ----------------------------------- | -------------- |
| `DB_HOST`       | Database host                        | `localhost`    |
| `DB_PORT`       | Database port                        | `5432`         |
| `DB_NAME`       | Database name                        | `devtasker`    |
| `DB_USER`       | Database user                        | `postgres`     |
| `DB_PASSWORD`   | Database password                   | *(local only)* |

These variables are referenced from `application-dev.yml` using Spring Boot placeholders.

## API overview

### Task representation

```json
{
  "id": "uuid",
  "title": "Task title",
  "completed": false
}
```

### Endpoints

| Method | Path            | Description        |
| ------ | --------------- | ------------------ |
| GET    | /api/tasks      | List all tasks     |
| POST   | /api/tasks      | Create task        |
| PUT    | /api/tasks/{id} | Update task        |
| DELETE | /api/tasks/{id} | Delete task        |

## Development notes

- Uses **PostgreSQL** for persistence
- Data **persists across backend restarts**
- Schema is managed automatically by JPA in development mode
- Designed so the frontend can safely replay mutations

## Local development

Local development is typically done using a **local run script** that:
- Sets required environment variables
- Starts the backend using Maven

Example (Windows, not committed to Git):

```cmd
scripts\run-backend.cmd
```

The backend will start on:

```
http://localhost:8080
```

## Design philosophy

- Backend is stateless aside from persistence
- No business logic duplication with frontend domain layer
- API accepts explicit intent, not derived state
- Configuration is explicit and environment-driven

## License

Private learning project.
